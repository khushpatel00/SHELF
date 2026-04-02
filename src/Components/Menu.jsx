import React, { useEffect } from 'react'
import { Link } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { setLoggedIn } from '../Actions/libActions';

function Menu() {
    const dispatch = useDispatch();
    let isLoggedIn = useSelector(state => state.loggedIn);

    useEffect(() => {

    }, [])

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
                        <Link
                            to={'/'}
                            className="bricolage-grotesque font-medium text-sm text-black hover:text-neutral-600 transition uppercase tracking-widest"
                        >
                            My Shelf
                        </Link>
                    )}
                    <div>
                        {isLoggedIn ?
                            <Link
                                to={'/add-book'}
                                className="px-5 py-2 bg-black text-white bricolage-grotesque font-medium text-sm rounded hover:bg-neutral-800 transition"
                            >
                                Add Book
                            </Link>
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
        </motion.nav>
    )
}

export default Menu