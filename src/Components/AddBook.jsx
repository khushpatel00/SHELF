import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addBook, addBookAsync } from "../Actions/libActions.js";
import { useNavigate } from "react-router";
import gsap from 'gsap';
import { motion } from 'framer-motion';

function AddBook() {
    const dispatch = useDispatch()
    const navigator = useNavigate();
    const isLoggedIn = useSelector(state => state.loggedIn)
    const userRole = useSelector(state => state.userRole)
    const previewRef = useRef(null);
    const [formData, setFormData] = useState({
        title: 'Time Immersion over the space',
        shortDescription: 'A mysterious tale across time',
        description: 'A boy who was responsible for manipulating the clock worldwide, mysteries remain',
        author: 'Arthur Morgan',
        price: '50',
        rdate: '',
        coverPath: '',
        pageCount: '300',
        language: 'English',
    })

    useEffect(() => {
        if (!isLoggedIn || userRole !== 'admin') {
            navigator('/')
            return
        }
        if (previewRef.current) {
            gsap.fromTo(previewRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
            );
        }
    }, [isLoggedIn, userRole, navigator]);

    const formHandler = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        const newData = {
            ...formData,
            id: Date.now().toString()
        };
        await dispatch(addBookAsync(newData));
        navigator('/')
    }

    return (
        <div className='min-h-screen bg-white pt-20 pb-12'>
            <div className='max-w-7xl mx-auto px-6'>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='mb-12'
                >
                    <h1 className='bricolage-grotesque text-5xl md:text-6xl font-bold text-black mb-3'>
                        Add a New Book
                    </h1>
                    <p className='text-lg text-neutral-600'>
                        Fill in the details below to add a new book to your collection
                    </p>
                </motion.div>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-12 items-start'>
                    {/* Form */}
                    <motion.form
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className='lg:col-span-2 space-y-8'
                        onSubmit={formSubmitHandler}
                    >
                        {/* Title Field */}
                        <div className='space-y-2'>
                            <label className='bricolage-grotesque text-sm font-bold text-black uppercase tracking-widest'>Title</label>
                            <input
                                required
                                value={formData.title}
                                onChange={formHandler}
                                placeholder="Enter book title"
                                className='w-full bg-neutral-50 border-2 border-neutral-200 rounded-lg px-4 py-3 text-base focus:border-black focus:outline-none transition'
                                type="text"
                                id="title"
                                name="title"
                            />
                        </div>

                        {/* Author Field */}
                        <div className='space-y-2'>
                            <label className='bricolage-grotesque text-sm font-bold text-black uppercase tracking-widest'>Author</label>
                            <input
                                required
                                value={formData.author}
                                onChange={formHandler}
                                placeholder="Enter author name"
                                className='w-full bg-neutral-50 border-2 border-neutral-200 rounded-lg px-4 py-3 text-base focus:border-black focus:outline-none transition'
                                type="text"
                                id="author"
                                name="author"
                            />
                        </div>

                        {/* Short Description Field */}
                        <div className='space-y-2'>
                            <label className='bricolage-grotesque text-sm font-bold text-black uppercase tracking-widest'>Short Description</label>
                            <input
                                required
                                value={formData.shortDescription}
                                onChange={formHandler}
                                placeholder="One line summary (shows under title)"
                                className='w-full bg-neutral-50 border-2 border-neutral-200 rounded-lg px-4 py-3 text-base focus:border-black focus:outline-none transition'
                                type="text"
                                id="shortDescription"
                                name="shortDescription"
                            />
                        </div>

                        {/* Full Description Field */}
                        <div className='space-y-2'>
                            <label className='bricolage-grotesque text-sm font-bold text-black uppercase tracking-widest'>Full Description</label>
                            <textarea
                                required
                                value={formData.description}
                                onChange={formHandler}
                                placeholder="Enter detailed book description"
                                className='w-full bg-neutral-50 border-2 border-neutral-200 rounded-lg px-4 py-3 text-base focus:border-black focus:outline-none transition resize-none h-32 font-serif'
                                id="description"
                                name="description"
                            />
                        </div>

                        {/* Language & Page Count Row */}
                        <div className='grid grid-cols-2 gap-4'>
                            <div className='space-y-2'>
                                <label className='bricolage-grotesque text-sm font-bold text-black uppercase tracking-widest'>Language</label>
                                <input
                                    required
                                    value={formData.language}
                                    onChange={formHandler}
                                    placeholder="English"
                                    className='w-full bg-neutral-50 border-2 border-neutral-200 rounded-lg px-4 py-3 text-base focus:border-black focus:outline-none transition'
                                    type="text"
                                    id="language"
                                    name="language"
                                />
                            </div>
                            <div className='space-y-2'>
                                <label className='bricolage-grotesque text-sm font-bold text-black uppercase tracking-widest'>Page Count</label>
                                <input
                                    required
                                    value={formData.pageCount}
                                    onChange={formHandler}
                                    placeholder="Number of pages"
                                    className='w-full bg-neutral-50 border-2 border-neutral-200 rounded-lg px-4 py-3 text-base focus:border-black focus:outline-none transition'
                                    type="number"
                                    id="pageCount"
                                    name="pageCount"
                                />
                            </div>
                        </div>

                        {/* Price Field */}
                        <div className='space-y-2'>
                            <label className='bricolage-grotesque text-sm font-bold text-black uppercase tracking-widest'>Price</label>
                            <div className='relative'>
                                <span className='absolute left-4 top-3 text-lg font-semibold text-neutral-500'>$</span>
                                <input
                                    required
                                    value={formData.price}
                                    onChange={formHandler}
                                    placeholder="0.00"
                                    className='w-full bg-neutral-50 border-2 border-neutral-200 rounded-lg pl-8 pr-4 py-3 text-base focus:border-black focus:outline-none transition'
                                    type="number"
                                    id="price"
                                    name="price"
                                    step="0.01"
                                />
                            </div>
                        </div>

                        {/* Release Date Field */}
                        <div className='space-y-2'>
                            <label className='bricolage-grotesque text-sm font-bold text-black uppercase tracking-widest'>Release Date</label>
                            <input
                                value={formData.rdate}
                                onChange={formHandler}
                                className='w-full bg-neutral-50 border-2 border-neutral-200 rounded-lg px-4 py-3 text-base focus:border-black focus:outline-none transition'
                                type="date"
                                id="rdate"
                                name="rdate"
                            />
                        </div>

                        {/* Cover Path Field */}
                        <div className='space-y-2'>
                            <label className='bricolage-grotesque text-sm font-bold text-black uppercase tracking-widest'>Cover Image URL</label>
                            <input
                                value={formData.coverPath}
                                onChange={formHandler}
                                placeholder="Enter image URL"
                                className='w-full bg-neutral-50 border-2 border-neutral-200 rounded-lg px-4 py-3 text-base focus:border-black focus:outline-none transition'
                                type="text"
                                id="coverPath"
                                name="coverPath"
                            />
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className='w-full bg-black text-white bricolage-grotesque text-lg font-bold py-4 rounded-lg hover:bg-neutral-800 transition mt-8'
                        >
                            Add Book to Collection
                        </motion.button>
                    </motion.form>

                    {/* Preview */}
                    <motion.div
                        ref={previewRef}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className='lg:sticky lg:top-24'
                    >
                        <div className='space-y-4 mb-6'>
                            <h3 className='bricolage-grotesque text-xl font-bold text-black'>Preview</h3>
                            <div className='w-12 h-1 bg-black'></div>
                        </div>

                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className='group cursor-pointer'
                        >
                            <div
                                className='relative h-96 rounded-lg overflow-hidden shadow-2xl bg-neutral-100 border border-neutral-300'
                                style={{
                                    aspectRatio: '2 / 3',
                                    backgroundImage: formData.coverPath ? `url(${formData.coverPath})` : 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            >
                                {/* Overlay */}
                                <div className='absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex flex-col justify-end p-4'>
                                    <div className='translate-y-4 group-hover:translate-y-0 transition-transform duration-300'>
                                        <h3 className='bricolage-grotesque text-sm font-bold text-white line-clamp-2 leading-tight'>
                                            {formData.title || 'Your Book Title'}
                                        </h3>
                                        {formData.author && (
                                            <p className='text-xs text-white/80 mt-1'>
                                                {formData.author}
                                            </p>
                                        )}
                                        {formData.shortDescription && (
                                            <p className='text-xs text-white/70 mt-2 line-clamp-2'>
                                                {formData.shortDescription}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Edge highlight */}
                                <div className='absolute top-0 left-0 w-1 h-full bg-white/20'></div>

                                {!formData.coverPath && (
                                    <div className='absolute inset-0 flex items-center justify-center text-neutral-400 text-sm'>
                                        Cover Preview
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Info Cards */}
                        <div className='mt-8 space-y-3'>
                            {formData.price && (
                                <div className='bg-neutral-50 p-4 rounded-lg border border-neutral-200'>
                                    <p className='bricolage-grotesque text-xs font-bold text-neutral-500 uppercase'>Price</p>
                                    <p className='text-2xl font-bold text-black mt-1'>${formData.price}</p>
                                </div>
                            )}
                            {formData.rdate && (
                                <div className='bg-neutral-50 p-4 rounded-lg border border-neutral-200'>
                                    <p className='bricolage-grotesque text-xs font-bold text-neutral-500 uppercase'>Release</p>
                                    <p className='text-lg font-semibold text-black mt-1'>
                                        {new Date(formData.rdate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short'
                                        })}
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default AddBook