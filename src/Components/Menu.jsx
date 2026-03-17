import React from 'react'
import { Link } from "react-router";

function Menu() {
    return (
        <nav className="w-full bg-zinc-100 flex flex-wrap justify-between px-5 py-5 items-end">
            <Link to={'/'} className="bricolage-grotesque font-bold text-5xl text-center "><span className="font-black">S</span>helf</Link>
            <Link to={'/add-book'} className="bricolage-grotesque font-light text-end text-3xl tracking-tighter">Add Book</Link>
        </nav>
    )
}

export default Menu