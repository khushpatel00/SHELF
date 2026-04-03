import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { setLoggedIn, setLoggedOut, getUserRoleAsync } from '../Actions/libActions';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

function Menu() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);
    let isLoggedIn = useSelector(state => state.loggedIn);
    let userRole = useSelector(state => state.userRole);
    let user = useSelector(state => state.user);

    useEffect(() => {
        const updateCartCount = () => {
            const items = JSON.parse(localStorage.getItem('cartItems') || '[]')
            setCartCount(items.length)
        }
        
        updateCartCount()
        window.addEventListener('cartUpdated', updateCartCount)
        return () => window.removeEventListener('cartUpdated', updateCartCount)
    }, [])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                dispatch(setLoggedIn({
                    uid: authUser.uid,
                    email: authUser.email,
                    displayName: authUser.displayName,
                    photoURL: authUser.photoURL,
                }));
                dispatch(getUserRoleAsync(authUser.uid));
            } else {
                dispatch(setLoggedOut());
            }
        });

        return () => unsubscribe();
    }, [dispatch])

    const handleLogout = async () => {
        try {
            await signOut(auth);
            dispatch(setLoggedOut());
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200"
        >
            <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
                <Link
                    to={'/'}
                    className="bricolage-grotesque font-bold text-3xl text-black hover:text-neutral-600 transition"
                >
                    <span className="font-black">S</span>helf
                </Link>
                <div className='flex gap-6 items-center'>
                    {isLoggedIn && (
                        <>
                            <Link
                                to={'/my-shelf'}
                                className="bricolage-grotesque font-medium text-sm text-black hover:text-neutral-600 transition uppercase tracking-widest"
                            >
                                My Shelf
                            </Link>
                            {userRole === 'admin' && (
                                <Link
                                    to={'/control-orders'}
                                    className="bricolage-grotesque font-medium text-sm text-black hover:text-neutral-600 transition uppercase tracking-widest"
                                >
                                    Manage Orders
                                </Link>
                            )}
                        </>
                    )}
                    <div className='flex gap-3 items-center'>
                        {isLoggedIn && (
                            <Link
                                to={'/cart'}
                                className='relative flex items-center justify-center w-10 h-10 rounded hover:bg-neutral-100 transition'
                            >
                                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' />
                                </svg>
                                {cartCount > 0 && (
                                    <span className='absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center'>
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        )}
                        <div className='flex gap-3'>
                        {isLoggedIn && userRole === 'admin' ?
                            <>
                                <Link
                                    to={'/add-book'}
                                    className="px-5 py-2 bg-black text-white bricolage-grotesque font-medium text-sm rounded hover:bg-neutral-800 transition"
                                >
                                    Add Book
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="px-5 py-2 border border-neutral-300 text-black bricolage-grotesque font-medium text-sm rounded hover:bg-neutral-100 transition"
                                >
                                    Logout
                                </button>
                            </>
                            : isLoggedIn ?
                            <button
                                onClick={handleLogout}
                                className="px-5 py-2 border border-neutral-300 text-black bricolage-grotesque font-medium text-sm rounded hover:bg-neutral-100 transition"
                            >
                                Logout
                            </button>
                            :
                            <Link
                                to={'/login'}
                                className="px-5 py-2 bg-black text-white bricolage-grotesque font-medium text-sm rounded hover:bg-neutral-800 transition"
                            >
                                Login
                            </Link>
                        }
                        </div>
                    </div>
                </div>
            </div>
        </motion.nav>
    )
}

export default Menu