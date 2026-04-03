import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { getAllOrdersAsync, updateOrderStatusAsync } from '../Actions/libActions'

function ControlOrders() {
    const orders = useSelector(state => state.orders)
    const userRole = useSelector(state => state.userRole)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (userRole !== 'admin') {
            navigate('/')
            return
        }
        dispatch(getAllOrdersAsync())
    }, [userRole, dispatch, navigate])

    const handleStatusChange = (orderId, newStatus) => {
        dispatch(updateOrderStatusAsync(orderId, newStatus))
    }

    const getStatusColor = (status) => {
        switch(status) {
            case 'completed': return 'bg-green-100 text-green-800'
            case 'pending': return 'bg-yellow-100 text-yellow-800'
            case 'delivered': return 'bg-blue-100 text-blue-800'
            case 'rejected': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    if (userRole !== 'admin') return null

    return (
        <div className='min-h-screen bg-white pt-24 pb-12'>
            <div className='max-w-7xl mx-auto px-6'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className='bricolage-grotesque text-4xl font-bold text-black mb-2'>Manage Orders</h1>
                    <p className='text-neutral-600 mb-8'>Control and update order statuses</p>

                    {orders.length > 0 ? (
                        <div className='space-y-4'>
                            {orders.map((order, index) => (
                                <motion.div
                                    key={order.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className='bg-neutral-50 border border-neutral-200 rounded-lg p-6'
                                >
                                    <div className='grid grid-cols-1 md:grid-cols-5 gap-6 items-center mb-6'>
                                        <div>
                                            <p className='text-xs text-neutral-600 font-medium uppercase tracking-widest mb-2'>Order ID</p>
                                            <p className='text-sm font-mono font-medium'>{order.id.slice(0, 12)}...</p>
                                        </div>
                                        <div>
                                            <p className='text-xs text-neutral-600 font-medium uppercase tracking-widest mb-2'>Customer</p>
                                            <p className='text-sm text-neutral-800'>ID: {order.userId.slice(0, 12)}...</p>
                                        </div>
                                        <div>
                                            <p className='text-xs text-neutral-600 font-medium uppercase tracking-widest mb-2'>Total</p>
                                            <p className='text-lg font-bold text-black'>${order.total?.toFixed(2) || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className='text-xs text-neutral-600 font-medium uppercase tracking-widest mb-2'>Items</p>
                                            <p className='text-sm text-neutral-800'>{order.items?.length || 0} items</p>
                                        </div>
                                        <div>
                                            <p className='text-xs text-neutral-600 font-medium uppercase tracking-widest mb-2'>Date</p>
                                            <p className='text-sm text-neutral-800'>
                                                {order.createdAt?.toDate?.().toLocaleDateString?.() || new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className='border-t border-neutral-200 pt-6'>
                                        <div className='flex items-center justify-between flex-wrap gap-4'>
                                            <div>
                                                <p className='text-xs text-neutral-600 font-medium uppercase tracking-widest mb-2'>Current Status</p>
                                                <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(order.status)}`}>
                                                    {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                                                </span>
                                            </div>

                                            <div className='flex gap-2'>
                                                {['pending', 'completed', 'delivered', 'rejected'].map(status => (
                                                    <button
                                                        key={status}
                                                        onClick={() => handleStatusChange(order.id, status)}
                                                        disabled={order.status === status}
                                                        className={`px-4 py-2 rounded font-medium text-sm transition ${
                                                            order.status === status
                                                                ? 'bg-black text-white'
                                                                : 'bg-white border border-neutral-300 text-neutral-700 hover:border-neutral-400'
                                                        }`}
                                                    >
                                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Order Items */}
                                        <div className='mt-6'>
                                            <p className='text-sm font-medium text-neutral-700 mb-3'>Items Ordered:</p>
                                            <div className='space-y-2'>
                                                {order.items?.map((item, i) => (
                                                    <div key={i} className='flex justify-between text-sm text-neutral-700 bg-white p-3 rounded border border-neutral-200'>
                                                        <span>{item.title} x {item.quantity}</span>
                                                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Customer Address */}
                                        {order.billingInfo && (
                                            <div className='mt-6'>
                                                <p className='text-sm font-medium text-neutral-700 mb-3'>Delivery Address:</p>
                                                <div className='bg-white p-3 rounded border border-neutral-200 text-sm text-neutral-700'>
                                                    <p>{order.billingInfo.fullName}</p>
                                                    <p>{order.billingInfo.address}</p>
                                                    <p>{order.billingInfo.city}, {order.billingInfo.zipCode}</p>
                                                    <p>{order.billingInfo.country}</p>
                                                    <p className='text-neutral-600 mt-2'>{order.billingInfo.phone}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className='flex items-center justify-center h-64 rounded-lg bg-neutral-50 border border-neutral-200'>
                            <p className='bricolage-grotesque text-xl text-neutral-400'>No orders yet</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    )
}

export default ControlOrders
