import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getAllBooks, deleteBook, getAllBookAsync, deleteBookAsync } from "../Actions/libActions";
import { Navigate, useNavigate } from "react-router";

export const LibList = () => {
    const books = useSelector(state => state.books);
    const dispatch = useDispatch()
    const navigator = useNavigate()
    
      useEffect(() => {
          // dispatch(getAllBooks())
          dispatch(getAllBookAsync())
      }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            // dispatch(deleteBook(id))
            dispatch(deleteBookAsync(id))
            Navigate('/')
        }
    }

    const handleEdit = (id) => {
        navigator(`/book/${id}?edit=true`);
    }

    return (
        <div className='p-6'>
            <h1 className='text-3xl font-bold mb-6 bricolage-grotesque'>Library Books</h1>
            <div className='overflow-x-auto shadow-md rounded-lg'>
                <table className='w-full border-collapse'>
                    <thead>
                        <tr className='bg-amber-600 text-white'>
                            <th className='border border-amber-700 px-6 py-3 text-left font-semibold'>Title</th>
                            <th className='border border-amber-700 px-6 py-3 text-left font-semibold'>Author</th>
                            <th className='border border-amber-700 px-6 py-3 text-left font-semibold'>Description</th>
                            <th className='border border-amber-700 px-6 py-3 text-left font-semibold'>Price</th>
                            <th className='border border-amber-700 px-6 py-3 text-center font-semibold'>Release Date</th>
                            <th className='border border-amber-700 px-6 py-3 text-center font-semibold'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books && books.length > 0 ? (
                            books.map((book, index) => (
                                <tr key={index} className='hover:bg-amber-50 transition-colors'>
                                    <td className='border border-amber-200 px-6 py-4 font-semibold text-gray-800'>{book.title || book.name}</td>
                                    <td className='border border-amber-200 px-6 py-4 text-gray-700'>{book.author || 'N/A'}</td>
                                    <td className='border border-amber-200 px-6 py-4 text-gray-700 max-w-xs truncate'>{book.description || 'N/A'}</td>
                                    <td className='border border-amber-200 px-6 py-4 text-gray-700'>${book.price || 'N/A'}</td>
                                    <td className='border border-amber-200 px-6 py-4 text-center text-gray-700'>{book.rdate || 'N/A'}</td>
                                    <td className='border border-amber-200 px-6 py-4 text-center'>
                                        <div className='flex gap-2 justify-center'>
                                            <button
                                                onClick={() => handleEdit(book.id)}
                                                className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200'
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(book.id)}
                                                className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200'
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan='6' className='border border-amber-200 px-6 py-8 text-center text-gray-500'>
                                    No books found. Start adding some books to your library!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
