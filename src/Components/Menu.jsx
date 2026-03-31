import React, { useEffect } from 'react'
import { Link } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedIn } from '../Actions/libActions';

function Menu() {
    const dispatch = useDispatch();
    let isLoggedIn = useSelector(state => state.loggedIn);
    console.log(isLoggedIn)
    useEffect(() => {

    }, [])

    return (
        <nav className="sticky top-0 left-0 z-50 w-full bg-zinc-100 flex flex-wrap justify-between px-5 py-5 items-end">
            <Link to={'/'} className="bricolage-grotesque font-bold text-5xl text-center "><span className="font-black">S</span>helf</Link>
            <div>
                {isLoggedIn ?
                    <Link to={'/add-book'} className="bricolage-grotesque font-light text-end text-3xl tracking-tighter">Add Book</Link>
                    :
                    <Link to={'/login'} className="bricolage-grotesque font-light text-end text-3xl tracking-tighter">Login</Link>
                }
            </div>
        </nav>
    )
}

export default Menu