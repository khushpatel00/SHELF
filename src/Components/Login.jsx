import React from 'react'
import { Link } from 'react-router'

function Login() {
    return (
        <div className='flex flex-row flex-wrap'>
            <div className='md:max-w-1/4 backdrop-blur-3xl h-screen'>
                <form className={'max-w-9/10 mx-auto w-auto bricolage-grotesque'}>
                    <label className={'text-2xl font-medium '} htmlFor="email">Email: </label>
                    <input className={'w-full bg-zinc-500/20 m-1 rounded-lg px-5 py-2.5 '} type="email" name="email" id="email" />

                    <label className={'text-2xl font-medium '} htmlFor="password">Password: </label>
                    <input className={'w-full bg-zinc-500/20 m-1 rounded-lg px-5 py-2.5 '} type="password" name="password" id="password" />
                    <input className={'bg-zinc-200/30 w-auto block text-xl font-semibold p-1.5 px-5 rounded-xl mx-auto mt-5'} type="submit" value="Login" />


                    <div className='text-center mb-10'>Dont have an Account? <Link className='text-blue-700 underline ' to={'/signup'}>Sign Up</Link></div>

                    <>
                        {/* google login */}
                        <div className={'cursor-pointer'}>
                            <div
                                class="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"><img
                                    src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"
                                    class="h-[18px] w-[18px] " />Continue with
                                Google
                            </div>
                        </div>
                    </>


                </form>
            </div>
            <div className='md:w-3/4 md:flex md:relative absolute top-0 left-0 w-screen -z-10 h-screen'>
                <img src="" className='w-full h-full' alt="" />
            </div>
        </div>
    )
}

export default Login
