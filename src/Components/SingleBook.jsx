import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useSearchParams } from 'react-router'
import { getBook, editBook, deleteBook, deleteBookAsync, editBookAsync, getBookAsync } from '../Actions/libActions';
import gsap from 'gsap';
import { motion } from 'framer-motion';

const CLOUDINARY_API_URL = 'https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'YOUR_UPLOAD_PRESET';

function SingleBook() {
    const { id } = useParams();
    const [searchParam, setSearchParam] = useSearchParams();
    const edit = searchParam.get('edit')

    const book = useSelector(state => state.book)
    const isLoggedIn = useSelector(state => state.loggedIn)
    const userRole = useSelector(state => state.userRole)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setloading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [cartAdded, setCartAdded] = useState(false)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [shortDescription, setShortDescription] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [rdate, setRdate] = useState('')
    const [pageCount, setPageCount] = useState('')
    const [language, setLanguage] = useState('')
    const [coverPath, setCoverPath] = useState('')
    const [uploading, setUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const contentRef = useRef(null)
    const fileInputRef = useRef(null);

    useEffect(() => {
        setloading(true);
        dispatch(getBookAsync(id));
        if (edit) {
            setIsEditing(true);
            setSearchParam({ edit: true })
        }
    }, [id, dispatch])

    useEffect(() => {
        if (book) {
            setTitle(book.title || book.name || '')
            setAuthor(book.author || '')
            setShortDescription(book.shortDescription || '')
            setDescription(book.description || '')
            setPrice(book.price || '')
            setRdate(book.rdate || '')
            setPageCount(book.pageCount || '')
            setLanguage(book.language || '')
            setCoverPath(book.coverPath || '')

            // Animate content on load
            if (contentRef.current) {
                gsap.fromTo(contentRef.current,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
                );
            }
            setTimeout(() => {
                setloading(false);
            }, 350)
        }
    }, [book])

    const handleEdit = async () => {
        if (isEditing) {
            const updateData = {
                title,
                author,
                shortDescription,
                description,
                price,
                rdate,
                pageCount,
                language,
                coverPath
            }
            await dispatch(editBookAsync(id, updateData))
            setIsEditing(false)
            setSearchParam({})
        } else {
            setIsEditing(true)
            setSearchParam({ edit: true })
        }
    }

    const handleCancel = () => {
        setIsEditing(false)
        setSearchParam({})
        setTitle(book?.title || book?.name || '')
        setAuthor(book?.author || '')
        setShortDescription(book?.shortDescription || '')
        setDescription(book?.description || '')
        setPrice(book?.price || '')
        setRdate(book?.rdate || '')
        setPageCount(book?.pageCount || '')
        setLanguage(book?.language || '')
        setCoverPath(book?.coverPath || '')
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setUploadProgress(0);

        try {
            const formDataCloud = new FormData();
            formDataCloud.append('file', file);
            formDataCloud.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

            // Simulate progress
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 90) clearInterval(progressInterval);
                    return prev + Math.random() * 20;
                });
            }, 200);

            const response = await fetch(CLOUDINARY_API_URL, {
                method: 'POST',
                body: formDataCloud,
            });

            clearInterval(progressInterval);
            const data = await response.json();

            if (data.secure_url) {
                setCoverPath(data.secure_url);
                setUploadProgress(100);
                setTimeout(() => setUploadProgress(0), 1000);
            }
        } catch (error) {
            console.error('Upload error:', error);
            setUploadProgress(0);
        } finally {
            setUploading(false);
        }
    }

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            dispatch(deleteBookAsync(id))
            navigate('/')
        }
    }

    const handleAddToCart = () => {
        if (!isLoggedIn) {
            navigate('/login')
            return
        }

        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]')
        const existingItem = cartItems.find(item => item.id === book.id)

        if (existingItem) {
            existingItem.quantity += 1
        } else {
            cartItems.push({
                id: book.id,
                title: book.title || book.name,
                author: book.author,
                price: book.price,
                coverPath: book.coverPath,
                quantity: 1
            })
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems))
        window.dispatchEvent(new Event('cartUpdated'))
        setCartAdded(true)
        setTimeout(() => setCartAdded(false), 2000)
    }

    return (
        <>
            {loading &&
                <>
                    <div className='absolute h-[99vh] w-[99vw] top-0 left-0 z-10 bg-[#edeceb] overflow-hidden'></div>
                    <img src="/loader.gif" className='absolute top-1/2 left-1/2 -translate-1/2 h-1/2 scale-75 w-auto z-40 overflow-hidden opacity-100' alt="" />
                </>
            }
            <div className='min-h-screen bg-white'>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className='fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200'
                >
                    <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
                        <button
                            onClick={() => navigate('/')}
                            className='flex items-center gap-2 text-sm font-medium text-black hover:text-neutral-600 transition'
                        >
                            <span className='text-lg'>←</span>
                            Back to Shelf
                        </button>
                        <div className='flex gap-3'>
                            {!isEditing && (
                                <>
                                    {userRole === 'admin' && (
                                        <>
                                            <button
                                                onClick={handleEdit}
                                                className='px-5 py-2 bg-black text-white text-sm font-medium rounded hover:bg-neutral-800 transition'
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(id)}
                                                className='px-5 py-2 border border-red-300 text-red-600 text-sm font-medium rounded hover:bg-red-50 transition'
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                    {isLoggedIn && (
                                        <button
                                            onClick={handleAddToCart}
                                            className={`px-5 py-2 text-white text-sm font-medium rounded transition ${
                                                cartAdded ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
                                            }`}
                                        >
                                            {cartAdded ? '✓ Added to Cart' : 'Add to Cart'}
                                        </button>
                                    )}
                                </>
                            )}
                            {isEditing && (
                                <>
                                    <button
                                        onClick={handleEdit}
                                        className='px-5 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition'
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className='px-5 py-2 border border-neutral-300 text-black text-sm font-medium rounded hover:bg-neutral-100 transition'
                                    >
                                        Cancel
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Hero Section */}
                <div className='pt-20 bg-gradient-to-b from-neutral-50 to-white'>
                    <div className='max-w-7xl mx-auto px-6 py-12'>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 items-start'>
                            {/* Book Cover */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                className='md:col-span-1'
                            >
                                {isEditing ? (
                                    <div className='space-y-3'>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileUpload}
                                            className='hidden'
                                            id="coverFileEdit"
                                            disabled={uploading}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled={uploading}
                                            className='w-full bg-neutral-50 border-2 border-dashed border-neutral-300 rounded-lg px-4 py-4 text-center hover:border-black hover:bg-neutral-100 transition disabled:opacity-50 disabled:cursor-not-allowed'
                                        >
                                            <div className='flex flex-col items-center gap-2'>
                                                <svg className='w-6 h-6 text-neutral-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                                                </svg>
                                                <p className='bricolage-grotesque text-sm font-semibold text-neutral-600'>
                                                    {uploading ? `Uploading... ${Math.round(uploadProgress)}%` : 'Click to update cover'}
                                                </p>
                                                <p className='text-xs text-neutral-500'>PNG, JPG or GIF</p>
                                            </div>
                                        </button>
                                        {uploadProgress > 0 && uploadProgress < 100 && (
                                            <div className='w-full h-2 bg-neutral-200 rounded-full overflow-hidden'>
                                                <div
                                                    className='h-full bg-black transition-all duration-300'
                                                    style={{ width: `${uploadProgress}%` }}
                                                ></div>
                                            </div>
                                        )}
                                        <div
                                            className='relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-2xl'
                                            style={{
                                                aspectRatio: '2 / 3',
                                                backgroundImage: coverPath ? `url(${coverPath})` : 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center'
                                            }}
                                        >
                                            {!coverPath && (
                                                <div className='absolute inset-0 flex items-center justify-center text-neutral-400'>
                                                    Cover Preview
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className='relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-2xl'
                                        style={{
                                            aspectRatio: '2 / 3',
                                            backgroundImage: book?.coverPath ? `url(${book.coverPath})` : 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}
                                    >
                                        {!book?.coverPath && (
                                            <div className='absolute inset-0 flex items-center justify-center text-neutral-400'>
                                                No Cover Image
                                            </div>
                                        )}
                                    </div>
                                )}
                            </motion.div>

                            {/* Book Info */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className='md:col-span-2 space-y-6'
                            >
                                {/* Title */}
                                {isEditing ? (
                                    <textarea
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className='bricolage-grotesque text-5xl font-bold w-full bg-neutral-50 border-2 border-black p-3 focus:outline-none resize-none leading-tight rounded'
                                        placeholder="Title"
                                    />
                                ) : (
                                    <h1 className='bricolage-grotesque text-5xl md:text-6xl font-bold text-black leading-tight'>
                                        {book?.title || book?.name}
                                    </h1>
                                )}

                                {/* Author */}
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                        className='bricolage-grotesque text-2xl bg-neutral-50 border-2 border-black p-3 focus:outline-none text-neutral-700 rounded'
                                        placeholder="Author"
                                    />
                                ) : (
                                    <p className='bricolage-grotesque text-2xl text-neutral-700'>
                                        By {book?.author || 'Unknown Author'}
                                    </p>
                                )}

                                {/* Short Description */}
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={shortDescription}
                                        onChange={(e) => setShortDescription(e.target.value)}
                                        className='w-full bg-neutral-50 border-2 border-black p-3 focus:outline-none text-neutral-600 rounded'
                                        placeholder="Short description"
                                    />
                                ) : (
                                    shortDescription && (
                                        <p className='text-lg text-neutral-600 italic'>
                                            "{book?.shortDescription}"
                                        </p>
                                    )
                                )}

                                {/* Divider */}
                                <div className='w-12 h-1 bg-black'></div>

                                {/* Quick Info */}
                                <div className='grid grid-cols-2 gap-6'>
                                    <div>
                                        <p className='text-sm text-neutral-500 font-medium'>PRICE</p>
                                        {isEditing ? (
                                            <input
                                                type="number"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                className='bg-neutral-50 border-2 border-black p-2 focus:outline-none w-full rounded mt-1'
                                                placeholder="0.00"
                                                step="0.01"
                                            />
                                        ) : (
                                            <p className='text-3xl font-bold text-black mt-1'>${book?.price || 'N/A'}</p>
                                        )}
                                    </div>
                                    <div>
                                        <p className='text-sm text-neutral-500 font-medium'>RELEASE DATE</p>
                                        {isEditing ? (
                                            <input
                                                type="date"
                                                value={rdate}
                                                onChange={(e) => setRdate(e.target.value)}
                                                className='bg-neutral-50 border-2 border-black p-2 focus:outline-none w-full rounded mt-1'
                                            />
                                        ) : (
                                            <p className='text-lg font-semibold text-black mt-1'>
                                                {book?.rdate ? new Date(book.rdate).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                }) : 'N/A'}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div ref={contentRef} className='max-w-7xl mx-auto px-6 py-16'>
                    {/* Description Section */}
                    <motion.div
                        className='mb-16'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className='bricolage-grotesque text-3xl font-bold text-black mb-6'>About This Book</h2>
                        {isEditing ? (
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className='w-full bg-neutral-50 border-2 border-black p-4 font-serif text-base leading-relaxed focus:outline-none rounded'
                                placeholder="Description"
                                rows="8"
                            />
                        ) : (
                            <p className='font-serif text-lg leading-relaxed text-neutral-800 max-w-3xl bg-neutral-50 p-8 rounded-lg'>
                                {book?.description || 'No description available'}
                            </p>
                        )}
                    </motion.div>

                    {/* Additional Info */}
                    <motion.div
                        className='grid grid-cols-1 md:grid-cols-3 gap-8'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div className='bg-neutral-50 p-6 rounded-lg border border-neutral-200'>
                            <h3 className='bricolage-grotesque text-sm font-bold text-neutral-700 mb-2 uppercase tracking-widest'>Format</h3>
                            <p className='text-lg font-semibold text-black'>Hardcover</p>
                        </div>
                        <div className='bg-neutral-50 p-6 rounded-lg border border-neutral-200'>
                            <h3 className='bricolage-grotesque text-sm font-bold text-neutral-700 mb-2 uppercase tracking-widest'>Pages</h3>
                            {isEditing ? (
                                <input
                                    type="number"
                                    value={pageCount}
                                    onChange={(e) => setPageCount(e.target.value)}
                                    className='bg-white border-2 border-black p-2 focus:outline-none w-full rounded'
                                    placeholder="Page count"
                                />
                            ) : (
                                <p className='text-lg font-semibold text-black'>{book?.pageCount || '300+'}</p>
                            )}
                        </div>
                        <div className='bg-neutral-50 p-6 rounded-lg border border-neutral-200'>
                            <h3 className='bricolage-grotesque text-sm font-bold text-neutral-700 mb-2 uppercase tracking-widest'>Language</h3>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className='bg-white border-2 border-black p-2 focus:outline-none w-full rounded'
                                    placeholder="Language"
                                />
                            ) : (
                                <p className='text-lg font-semibold text-black'>{book?.language || 'English'}</p>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </>

    )
}

export default SingleBook