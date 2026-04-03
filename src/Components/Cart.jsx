import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

function Cart() {
    const [cartItems, setCartItems] = useState([])
    const isLoggedIn = useSelector(state => state.loggedIn)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login')
            return
        }
        
        const items = JSON.parse(localStorage.getItem('cartItems') || '[]')
        setCartItems(items)
    }, [isLoggedIn, navigate])

    const removeFromCart = (bookId) => {
        const updated = cartItems.filter(item => item.id !== bookId)
        setCartItems(updated)
        localStorage.setItem('cartItems', JSON.stringify(updated))
        window.dispatchEvent(new Event('cartUpdated'))
    }

    const updateQuantity = (bookId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(bookId)
            return
        }
        const updated = cartItems.map(item =>
            item.id === bookId ? { ...item, quantity } : item
        )
        setCartItems(updated)
        localStorage.setItem('cartItems', JSON.stringify(updated))
        window.dispatchEvent(new Event('cartUpdated'))
    }

    const clearCart = () => {
        setCartItems([])
        localStorage.setItem('cartItems', JSON.stringify([]))
        window.dispatchEvent(new Event('cartUpdated'))
    }

    const subtotal = cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0)
    const tax = subtotal * 0.1
    const total = subtotal + tax

    if (!isLoggedIn) return null

    return (
        <div className='min-h-screen bg-white pt-24 pb-12'>
            <div className='max-w-7xl mx-auto px-6'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className='bricolage-grotesque text-4xl font-bold text-black mb-8'>Shopping Cart</h1>

                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                        {/* Cart Items */}
                        <div className='lg:col-span-2'>
                            {cartItems.length > 0 ? (
                                <div className='space-y-4'>
                                    {cartItems.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            className='bg-neutral-50 border border-neutral-200 rounded-lg p-6 flex gap-6'
                                        >
                                            {/* Book Image */}
                                            <div
                                                className='w-24 h-36 rounded bg-neutral-200 flex-shrink-0'
                                                style={{
                                                    backgroundImage: item.coverPath ? `url(${item.coverPath})` : 'none',
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}
                                            ></div>

                                            {/* Item Details */}
                                            <div className='flex-1'>
                                                <h3 className='bricolage-grotesque text-lg font-bold text-black mb-2'>
                                                    {item.title || item.name}
                                                </h3>
                                                <p className='text-sm text-neutral-600 mb-4'>{item.author || 'Unknown Author'}</p>
                                                
                                                <div className='flex items-center gap-4 mb-4'>
                                                    <span className='text-2xl font-bold text-black'>${(parseFloat(item.price) || 0).toFixed(2)}</span>
                                                    <div className='flex items-center gap-2 bg-white border border-neutral-300 rounded'>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className='px-3 py-1 text-neutral-600 hover:bg-neutral-100'
                                                        >
                                                            −
                                                        </button>
                                                        <span className='px-4 py-1 text-neutral-800'>{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className='px-3 py-1 text-neutral-600 hover:bg-neutral-100'
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className='text-sm text-red-600 hover:text-red-800 font-medium'
                                                >
                                                    Remove from cart
                                                </button>
                                            </div>

                                            {/* Subtotal */}
                                            <div className='text-right'>
                                                <p className='text-xs text-neutral-600 mb-2'>Subtotal</p>
                                                <p className='text-xl font-bold text-black'>
                                                    ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className='flex items-center justify-center h-64 rounded-lg bg-neutral-50 border border-neutral-200'>
                                    <p className='bricolage-grotesque text-xl text-neutral-400'>Your cart is empty</p>
                                </div>
                            )}
                        </div>

                        {/* Order Summary */}
                        {cartItems.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className='bg-neutral-50 border border-neutral-200 rounded-lg p-6 h-fit sticky top-24'
                            >
                                <h2 className='bricolage-grotesque text-xl font-bold text-black mb-6'>Order Summary</h2>
                                
                                <div className='space-y-4 mb-6 pb-6 border-b border-neutral-200'>
                                    <div className='flex justify-between'>
                                        <span className='text-neutral-700'>Subtotal</span>
                                        <span className='font-medium text-black'>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-neutral-700'>Tax (10%)</span>
                                        <span className='font-medium text-black'>${tax.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className='flex justify-between mb-6'>
                                    <span className='bricolage-grotesque font-bold text-lg'>Total</span>
                                    <span className='bricolage-grotesque font-bold text-lg text-black'>${total.toFixed(2)}</span>
                                </div>

                                <button
                                    onClick={() => navigate('/checkout', { state: { items: cartItems, total } })}
                                    className='w-full px-5 py-3 bg-black text-white bricolage-grotesque font-medium rounded hover:bg-neutral-800 transition mb-3'
                                >
                                    Proceed to Checkout
                                </button>

                                <button
                                    onClick={clearCart}
                                    className='w-full px-5 py-3 border border-neutral-300 text-black bricolage-grotesque font-medium rounded hover:bg-neutral-100 transition'
                                >
                                    Clear Cart
                                </button>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Cart
