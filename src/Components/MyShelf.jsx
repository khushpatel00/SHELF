import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { getUserOrdersAsync, setUserAsAdminAsync } from '../Actions/libActions'

function MyShelf() {
    const user = useSelector(state => state.user)
    const userRole = useSelector(state => state.userRole)
    const orders = useSelector(state => state.orders)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/login')
            return
        }
        dispatch(getUserOrdersAsync(user.uid))
    }, [user, dispatch, navigate])

    const handleMakeAdmin = () => {
        window.alert('cant add more admins, There are already enough Admins')
    }

    if (!user) return null

    const getStatusColor = (status) => {
        switch(status) {
            case 'completed': return 'bg-green-100 text-green-800'
            case 'pending': return 'bg-yellow-100 text-yellow-800'
            case 'delivered': return 'bg-blue-100 text-blue-800'
            case 'rejected': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className='min-h-screen bg-white pt-24 pb-12'>
            <div className='max-w-7xl mx-auto px-6'>
                {/* User Profile Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='mb-16'
                >
                    <div className='bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-lg p-8 border border-neutral-200'>
                        <h1 className='bricolage-grotesque text-4xl font-bold text-black mb-6'>My Profile</h1>
                        
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                            {/* Profile Info */}
                            <div>
                                <div className='mb-6'>
                                    <p className='text-sm text-neutral-600 font-medium uppercase tracking-widest mb-2'>Email</p>
                                    <p className='text-lg text-black'>{user.email}</p>
                                </div>
                                <div className='mb-6'>
                                    <p className='text-sm text-neutral-600 font-medium uppercase tracking-widest mb-2'>Name</p>
                                    <p className='text-lg text-black'>{user.displayName || 'Not set'}</p>
                                </div>
                                <div className='mb-6'>
                                    <p className='text-sm text-neutral-600 font-medium uppercase tracking-widest mb-2'>Role</p>
                                    <p className='text-lg text-black capitalize'>{userRole}</p>
                                </div>
                                <div>
                                    <p className='text-sm text-neutral-600 font-medium uppercase tracking-widest mb-2'>User ID</p>
                                    <p className='text-sm text-neutral-500 font-mono break-all'>{user.uid}</p>
                                </div>
                            </div>

                            {/* Account Stats */}
                            <div className='flex flex-col gap-4'>
                                <div className='bg-white p-4 rounded border border-neutral-200'>
                                    <p className='text-sm text-neutral-600 font-medium uppercase tracking-widest mb-2'>Total Orders</p>
                                    <p className='text-3xl font-bold text-black'>{orders.length}</p>
                                </div>
                                <button
                                    onClick={() => navigate('/cart')}
                                    className='px-5 py-3 bg-black text-white bricolage-grotesque font-medium rounded hover:bg-neutral-800 transition'
                                >
                                    View Cart
                                </button>
                                {userRole !== 'admin' && (
                                    <button
                                        onClick={handleMakeAdmin}
                                        className='px-5 py-3 bg-purple-600 text-white bricolage-grotesque font-medium rounded hover:bg-purple-700 transition text-sm'
                                    >
                                        Make Admin
                                    </button>
                                )}
                                {userRole === 'admin' && (
                                    <div className='px-5 py-3 bg-purple-100 text-purple-800 bricolage-grotesque font-medium rounded text-center'>
                                        ✓ Admin User
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Orders Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <h2 className='bricolage-grotesque text-3xl font-bold text-black mb-8'>Order History</h2>

                    {orders.length > 0 ? (
                        <div className='space-y-4'>
                            {orders.map((order) => (
                                <motion.div
                                    key={order.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className='bg-neutral-50 border border-neutral-200 rounded-lg p-6 hover:border-neutral-300 transition'
                                >
                                    <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
                                        <div>
                                            <p className='text-xs text-neutral-600 font-medium uppercase tracking-widest mb-2'>Order ID</p>
                                            <p className='text-sm font-mono'>{order.id.slice(0, 12)}...</p>
                                        </div>
                                        <div>
                                            <p className='text-xs text-neutral-600 font-medium uppercase tracking-widest mb-2'>Total</p>
                                            <p className='text-lg font-bold text-black'>${order.total?.toFixed(2) || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className='text-xs text-neutral-600 font-medium uppercase tracking-widest mb-2'>Date</p>
                                            <p className='text-sm text-neutral-700'>
                                                {order.createdAt?.toDate?.().toLocaleDateString?.() || new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div>
                                            <p className='text-xs text-neutral-600 font-medium uppercase tracking-widest mb-2'>Status</p>
                                            <span className={`px-3 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                                                {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='mt-4 pt-4 border-t border-neutral-200'>
                                        <p className='text-sm text-neutral-600'>Items: {order.items?.length || 0}</p>
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

export default MyShelf
