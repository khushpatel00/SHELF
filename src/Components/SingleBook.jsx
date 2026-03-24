import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useSearchParams } from 'react-router'
import { getBook, editBook, deleteBook, deleteBookAsync, editBookAsync, getBookAsync } from '../Actions/libActions';

function SingleBook() {
    const { id } = useParams();
    const [searchParam, setSearchParam] = useSearchParams();
    const edit = searchParam.get('edit')

    const book = useSelector(state => state.book)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')


    useEffect(() => {
        dispatch(getBookAsync(id));
        if (edit) {
            setIsEditing(true);
            setSearchParam({edit: true})
        }
    }, [id, dispatch])

    useEffect(() => {
        if (book) {
            setTitle(book.title || book.name || '')
            setAuthor(book.author || '')
            setDescription(book.description || '')
        }
    }, [book])

    const handleEdit = async () => {
        if (isEditing) {
            // Save
            // dispatch(editBook(id, { title, author, description }))
            await dispatch(editBookAsync(id, { title, author, description }))
            setIsEditing(false)
            setSearchParam({edit: false})
        } else {
            setIsEditing(true)
            setSearchParam({edit: true})
        }
    }

    const handleCancel = () => {
        setIsEditing(false)
        setSearchParam({edit: false})
        setTitle(book?.title || book?.name || '')
        setAuthor(book?.author || '')
        setDescription(book?.description || '')
    }

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            // dispatch(deleteBook(id))
            dispatch(deleteBookAsync(id))
            navigate('/')
        }
    }
    return (
        <div
            className='basis-1/8 scale-150 mt-30 cursor-pointer bg-amber-100 mx-auto lg:ms-auto lg:min-w-[20vw] xl:min-w-[15vw] md:min-w-[25vw] duration-200 *:duration-150 min-w-[50vw] max-w-fit w-auto aspect-2/3 relative border-s-8 border-amber-200'
            style={{ backgroundImage: `url(${book?.coverPath})`, backgroundSize: 'cover' }}
        >

            <div onClick={() => navigate('/')} className={'fixed top-0 left-0 font-bold -translate-x-full pe-5'}>{'<-'}<span className='bricolage-grotesque'>Back</span>  </div>

            <div className='absolute top-1/10 left-1/2 -translate-x-1/2 w-full p-0 m-0'>
                {isEditing ? (
                    <textarea
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='bricolage-grotesque capitalize text-2xl text-center wrap-anywhere w-full px-5 bg-transparent border-b border-amber-400'
                        placeholder="Title"
                    />
                ) : (
                    <p className='bricolage-grotesque capitalize text-2xl text-center wrap-anywhere w-full px-5'>{book?.title || book?.name}</p>
                )}
                {isEditing ? (
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className='bricolage-grotesque capitalize w-full text-end pe-5 text-zinc-600 bg-transparent border-b border-amber-400'
                        placeholder="Author"
                    />
                ) : (
                    <p className='bricolage-grotesque capitalize text-end pe-5 text-zinc-600'>{book?.author ? `~${book?.author}` : ''}</p>
                )}
            </div>

            <div className='absolute bottom-1/12 left-1/2 -translate-x-1/2 w-full'>
                {isEditing ? (
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='font-serif first-letter:capitalize w-full text-xs text-center italic px-5 bg-transparent border border-amber-400 resize-none'
                        placeholder="Description"
                        rows="3"
                    />
                ) : (
                    <p className='font-serif first-letter:capitalize w-full text-xs text-center italic px-5'>{book?.description}</p>
                )}
            </div>
            {isEditing ? (
                <div className={''}>
                    <button onClick={handleEdit} className='absolute text-sm ms-3 top-5/6  left-full  border-2 border-green-500/50 px-2 py-0.5 bricolage-grotesque'>Save</button>
                    <button onClick={handleCancel} className='absolute text-sm ms-3 top-full -translate-y-[100%] left-full  border-2 border-gray-500/50 px-2 py-0.5 bricolage-grotesque'>Cancel</button>
                </div>
            ) : (
                <div className={''}>
                    <button onClick={handleEdit} className='absolute text-sm ms-3 top-5/6  left-full  border-2 border-blue-500/50 px-2 py-0.5 bricolage-grotesque'>Edit</button>
                    <button onClick={()=>handleDelete(id)} className='absolute text-sm ms-3 top-full -translate-y-[100%] left-full  border-2 border-red-500/50 px-2 py-0.5 bricolage-grotesque'>Delete</button>
                </div>
            )}
        </div>
    )
}

export default SingleBook