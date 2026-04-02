import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../firebase/firebase.config'

function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const googleProvider = new GoogleAuthProvider()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        // Validate passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        // Validate password length
        if (password.length < 6) {
            setError('Password should be at least 6 characters')
            return
        }

        setLoading(true)

        try {
            await createUserWithEmailAndPassword(auth, email, password)
            navigate('/')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleSignup = async () => {
        setError('')
        setLoading(true)

        try {
            await signInWithPopup(auth, googleProvider)
            navigate('/')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex h-full flex-row flex-wrap'>
            {loading &&
                <>
                    <div className='absolute h-[99vh] w-[99vw] top-0 left-0 z-10 bg-[#edeceb] overflow-hidden'></div>
                    <img src="/loader.gif" className='absolute top-1/2 left-1/2 -translate-1/2 h-1/2 scale-75 w-auto z-40 overflow-hidden opacity-100' alt="" />
                </>
            }
            <div className='md:max-w-1/4 backdrop-blur-3xl mt-10 h-screen'>
                <form onSubmit={handleSubmit} className={'max-w-9/10 mx-auto w-auto bricolage-grotesque'}>
                    {error && <p className='text-red-500 text-center mb-4'>{error}</p>}
                    
                    <label className={'text-2xl font-medium '} htmlFor="email">Email: </label>
                    <input 
                        className={'w-full bg-zinc-500/20 m-1 rounded-lg px-5 py-2.5 '} 
                        type="email" 
                        name="email" 
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label className={'text-2xl font-medium '} htmlFor="password">Password: </label>
                    <input 
                        className={'w-full bg-zinc-500/20 m-1 rounded-lg px-5 py-2.5 '} 
                        type="password" 
                        name="password" 
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <label className={'text-2xl font-medium '} htmlFor="confirmPassword">Confirm Password: </label>
                    <input 
                        className={'w-full bg-zinc-500/20 m-1 rounded-lg px-5 py-2.5 '} 
                        type="password" 
                        name="confirmPassword" 
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <input 
                        className={'bg-zinc-200/30 w-auto block text-xl font-semibold p-1.5 px-5 rounded-xl mx-auto mt-5 cursor-pointer'} 
                        type="submit" 
                        value={loading ? 'Signing up...' : 'Sign Up'}
                        disabled={loading}
                    />

                    <div className='text-center mb-10 mt-4'>Already have an Account? <Link className='text-blue-700 underline ' to={'/login'}>Login</Link></div>

                    <>
                        {/* google signup */}
                        <div 
                            className={'cursor-pointer'}
                            onClick={handleGoogleSignup}
                        >
                            <div
                                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <img
                                    src="https://www.svgrepo.com/show/475656/google-color.svg" 
                                    alt="Google"
                                    className="h-[18px] w-[18px]"
                                />
                                {loading ? 'Signing up...' : 'Sign up with Google'}
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

export default Signup
