import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { createOrderAsync } from '../Actions/libActions'

function Checkout() {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [loading, setLoading] = useState(false)
    const [orderStep, setOrderStep] = useState('billing') // billing, payment, success

    const { items = [], total = 0 } = location.state || {}

    const [billingInfo, setBillingInfo] = useState({
        fullName: '',
        email: user?.email || '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        country: ''
    })

    const [paymentInfo, setPaymentInfo] = useState({
        cardName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    })

    useEffect(() => {
        if (!user) {
            navigate('/login')
            return
        }
        if (items.length === 0) {
            navigate('/cart')
        }
    }, [user, items, navigate])

    const handleBillingChange = (e) => {
        const { name, value } = e.target
        setBillingInfo(prev => ({ ...prev, [name]: value }))
    }

    const handlePaymentChange = (e) => {
        let { name, value } = e.target
        
        // Format card number
        if (name === 'cardNumber') {
            value = value.replace(/\s/g, '').slice(0, 16)
            value = value.replace(/(\d{4})/g, '$1 ').trim()
        }
        
        // Format expiry date
        if (name === 'expiryDate') {
            value = value.replace(/\D/g, '').slice(0, 4)
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2)
            }
        }
        
        // Format CVV
        if (name === 'cvv') {
            value = value.replace(/\D/g, '').slice(0, 3)
        }
        
        setPaymentInfo(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmitBilling = (e) => {
        e.preventDefault()
        if (billingInfo.fullName && billingInfo.address && billingInfo.city && billingInfo.zipCode) {
            setOrderStep('payment')
        }
    }

    const handleSubmitPayment = async (e) => {
        e.preventDefault()
        if (!paymentInfo.cardName || !paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv) {
            alert('Please fill in all payment details')
            return
        }

        setLoading(true)

        // Simulate payment processing
        setTimeout(async () => {
            try {
                const orderData = {
                    items,
                    total,
                    billingInfo,
                    paymentInfo: {
                        cardName: paymentInfo.cardName,
                        cardLast4: paymentInfo.cardNumber.replace(/\s/g, '').slice(-4)
                    }
                }

                await dispatch(createOrderAsync(user.uid, orderData))
                
                // Clear cart
                localStorage.setItem('cartItems', JSON.stringify([]))
                
                setOrderStep('success')
            } catch (error) {
                console.error(error)
                alert('Order failed. Please try again.')
            } finally {
                setLoading(false)
            }
        }, 1500) // Simulate payment processing delay
    }

    if (!user) return null

    return (
        <div className='min-h-screen bg-white pt-24 pb-12'>
            <div className='max-w-4xl mx-auto px-6'>
                {orderStep === 'billing' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className='bricolage-grotesque text-4xl font-bold text-black mb-8'>Billing Information</h1>
                        
                        <form onSubmit={handleSubmitBilling} className='space-y-6 mb-8'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div>
                                    <label className='block text-sm font-medium text-neutral-700 mb-2'>Full Name *</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={billingInfo.fullName}
                                        onChange={handleBillingChange}
                                        required
                                        className='w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-black'
                                        placeholder='John Doe'
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-neutral-700 mb-2'>Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={billingInfo.email}
                                        onChange={handleBillingChange}
                                        required
                                        disabled
                                        className='w-full px-4 py-2 border border-neutral-300 rounded-lg bg-neutral-50'
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-neutral-700 mb-2'>Phone *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={billingInfo.phone}
                                        onChange={handleBillingChange}
                                        required
                                        className='w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-black'
                                        placeholder='+1 (555) 000-0000'
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-neutral-700 mb-2'>Country *</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={billingInfo.country}
                                        onChange={handleBillingChange}
                                        required
                                        className='w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-black'
                                        placeholder='United States'
                                    />
                                </div>
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-neutral-700 mb-2'>Address *</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={billingInfo.address}
                                    onChange={handleBillingChange}
                                    required
                                    className='w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-black'
                                    placeholder='123 Main Street'
                                />
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                                <div>
                                    <label className='block text-sm font-medium text-neutral-700 mb-2'>City *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={billingInfo.city}
                                        onChange={handleBillingChange}
                                        required
                                        className='w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-black'
                                        placeholder='New York'
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-neutral-700 mb-2'>Zip Code *</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={billingInfo.zipCode}
                                        onChange={handleBillingChange}
                                        required
                                        className='w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-black'
                                        placeholder='10001'
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className='w-full px-5 py-3 bg-black text-white bricolage-grotesque font-medium rounded hover:bg-neutral-800 transition'
                            >
                                Continue to Payment
                            </button>
                        </form>

                        {/* Order Summary */}
                        <div className='bg-neutral-50 border border-neutral-200 rounded-lg p-6'>
                            <h2 className='bricolage-grotesque text-lg font-bold text-black mb-4'>Order Summary</h2>
                            <div className='space-y-2 mb-4'>
                                {items.map(item => (
                                    <div key={item.id} className='flex justify-between text-sm'>
                                        <span className='text-neutral-700'>{item.title} x {item.quantity}</span>
                                        <span className='font-medium text-black'>${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className='border-t border-neutral-200 pt-4'>
                                <div className='flex justify-between font-bold text-lg'>
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {orderStep === 'payment' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className='bricolage-grotesque text-4xl font-bold text-black mb-8'>Payment Information</h1>
                        
                        <form onSubmit={handleSubmitPayment} className='space-y-6 mb-8'>
                            <div>
                                <label className='block text-sm font-medium text-neutral-700 mb-2'>Cardholder Name *</label>
                                <input
                                    type="text"
                                    name="cardName"
                                    value={paymentInfo.cardName}
                                    onChange={handlePaymentChange}
                                    required
                                    className='w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-black'
                                    placeholder='John Doe'
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-neutral-700 mb-2'>Card Number *</label>
                                <input
                                    type="text"
                                    name="cardNumber"
                                    value={paymentInfo.cardNumber}
                                    onChange={handlePaymentChange}
                                    required
                                    className='w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-black font-mono text-lg'
                                    placeholder='1234 5678 9012 3456'
                                />
                            </div>

                            <div className='grid grid-cols-2 gap-6'>
                                <div>
                                    <label className='block text-sm font-medium text-neutral-700 mb-2'>Expiry Date *</label>
                                    <input
                                        type="text"
                                        name="expiryDate"
                                        value={paymentInfo.expiryDate}
                                        onChange={handlePaymentChange}
                                        required
                                        className='w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-black font-mono'
                                        placeholder='MM/YY'
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-neutral-700 mb-2'>CVV *</label>
                                    <input
                                        type="text"
                                        name="cvv"
                                        value={paymentInfo.cvv}
                                        onChange={handlePaymentChange}
                                        required
                                        className='w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-black font-mono'
                                        placeholder='123'
                                    />
                                </div>
                            </div>

                            <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
                                <p className='text-sm text-blue-800'>
                                    <strong>Test Card:</strong> 4111 1111 1111 1111 | 12/25 | 123
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className='w-full px-5 py-3 bg-black text-white bricolage-grotesque font-medium rounded hover:bg-neutral-800 transition disabled:opacity-50'
                            >
                                {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                            </button>

                            <button
                                type="button"
                                onClick={() => setOrderStep('billing')}
                                className='w-full px-5 py-3 border border-neutral-300 text-black bricolage-grotesque font-medium rounded hover:bg-neutral-100 transition'
                            >
                                Back to Billing
                            </button>
                        </form>
                    </motion.div>
                )}

                {orderStep === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className='text-center py-16'
                    >
                        <div className='inline-block mb-8'>
                            <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center'>
                                <span className='text-4xl'>✓</span>
                            </div>
                        </div>

                        <h1 className='bricolage-grotesque text-4xl font-bold text-black mb-4'>Order Complete!</h1>
                        <p className='text-lg text-neutral-700 mb-8'>Thank you for your purchase. Your order has been confirmed.</p>

                        <div className='bg-neutral-50 border border-neutral-200 rounded-lg p-8 mb-8 inline-block text-left'>
                            <p className='text-sm text-neutral-600 mb-2'>Order Total</p>
                            <p className='bricolage-grotesque text-4xl font-bold text-black mb-6'>${total.toFixed(2)}</p>
                            <p className='text-sm text-neutral-700 mb-4'>A confirmation email has been sent to <strong>{user.email}</strong></p>
                        </div>

                        <div className='space-y-3'>
                            <button
                                onClick={() => navigate('/my-shelf')}
                                className='block w-full px-5 py-3 bg-black text-white bricolage-grotesque font-medium rounded hover:bg-neutral-800 transition'
                            >
                                View Your Orders
                            </button>
                            <button
                                onClick={() => {
                                    navigate('/')
                                }}
                                className='block w-full px-5 py-3 border border-neutral-300 text-black bricolage-grotesque font-medium rounded hover:bg-neutral-100 transition'
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

export default Checkout
