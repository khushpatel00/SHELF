import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getAllBooks, deleteBook, deleteBookAsync, getAllBookAsync } from "../Actions/libActions";
import { useNavigate } from "react-router";

export const LibList = () => {
    const books = useSelector(state => state.books);
<<<<<<< HEAD
=======
    console.log(books);
    
>>>>>>> 07e9387 (added: firebase db)
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    
    useEffect(() => {
        dispatch(getAllBookAsync())
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            dispatch(deleteBookAsync(id))
<<<<<<< HEAD
=======
            console.log(id);
            
>>>>>>> 07e9387 (added: firebase db)
        }
    }

    const handleEdit = (id) => {
        navigator(`/book/${id}?edit=true`);
    }

    const handleSort = (column) => {
        if (sortColumn === column) {
            // Toggle direction if same column clicked
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // Set new column with ascending direction
            setSortColumn(column);
            setSortDirection('asc');
        }
    }

    const getSortedBooks = () => {
        if (!books || books.length === 0) return books;
        
        const sorted = [...books].sort((a, b) => {
            let aValue, bValue;
            
            switch(sortColumn) {
                case 'title':
                    aValue = (a.title || a.name).toLowerCase();
                    bValue = (b.title || b.name).toLowerCase();
                    break;
                case 'author':
                    aValue = (a.author || '').toLowerCase();
                    bValue = (b.author || '').toLowerCase();
                    break;
                case 'description':
                    aValue = (a.description || '').toLowerCase();
                    bValue = (b.description || '').toLowerCase();
                    break;
                case 'price':
                    aValue = parseFloat(a.price) || 0;
                    bValue = parseFloat(b.price) || 0;
                    break;
                case 'rdate':
                    aValue = new Date(a.rdate) || new Date(0);
                    bValue = new Date(b.rdate) || new Date(0);
                    break;
                default:
                    return 0;
            }
            
            if (aValue < bValue) {
                return sortDirection === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortDirection === 'asc' ? 1 : -1;
            }
            return 0;
        });
        
        return sorted;
    }

    const displayBooks = getSortedBooks();

    const getSortIndicator = (column) => {
        if (sortColumn !== column) return '';
        return sortDirection === 'asc' ? ' ▲' : ' ▼';
    }

    return (
        <div className='p-6 mt-20 *:duration-200'>
            <h1 className='text-3xl font-bold my-6 bricolage-grotesque'>Library Books</h1>
            <div className='overflow-x-auto shadow-md rounded-lg'>
                <table className='w-full border-collapse'>
                    <thead>
                        <tr className='bg-amber-600/20'>
                            <th className='border border-amber-700 px-6 py-3 text-center font-semibold'>SR No.</th>
                            <th className='border border-amber-700 px-6 py-3 text-center font-semibold'>Image</th>
                            <th 
                                className='border border-amber-700 px-6 py-3 text-left font-semibold cursor-pointer duration-200 hover:bg-amber-600/30'
                                onClick={() => handleSort('title')}
                            >
                                Title<span className="text-xs text-zinc-700">{getSortIndicator('title')}</span>
                            </th>
                            <th 
                                className='border border-amber-700 px-6 py-3 text-left font-semibold cursor-pointer duration-200 hover:bg-amber-600/30'
                                onClick={() => handleSort('author')}
                            >
                                Author<span className="text-xs text-zinc-700">{getSortIndicator('author')}</span>
                            </th>
                            <th 
                                className='border border-amber-700 px-6 py-3 text-left font-semibold cursor-pointer duration-200 hover:bg-amber-600/30'
                                onClick={() => handleSort('description')}
                            >
                                Description<span className="text-xs text-zinc-700">{getSortIndicator('description')}</span>
                            </th>
                            <th 
                                className='border border-amber-700 px-6 py-3 text-left font-semibold cursor-pointer duration-200 hover:bg-amber-600/30'
                                onClick={() => handleSort('price')}
                            >
                                Price<span className="text-xs text-zinc-700">{getSortIndicator('price')}</span>
                            </th>
                            <th 
                                className='border border-amber-700 px-6 py-3 text-center font-semibold cursor-pointer duration-200 hover:bg-amber-600/30'
                                onClick={() => handleSort('rdate')}
                            >
                                Release Date<span className="text-xs text-zinc-700">{getSortIndicator('rdate')}</span>
                            </th>
                            <th className='border border-amber-700 px-6 py-3 text-center font-semibold'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayBooks && displayBooks.length > 0 ? (
                            displayBooks.map((book, index) => (
                                <tr key={index} className='duration-200 hover:bg-amber-50 transition-colors'>
                                    <td className='border border-amber-200 px-6 py-4 text-center font-semibold text-gray-800'>{index + 1}</td>
                                    <td className='border border-amber-200 px-6 py-4 text-center'>
                                        {book.coverPath ? (
                                            <img src={book.coverPath} alt={book.title || book.name} className='h-20 w-16 object-cover rounded' />
                                        ) : (
                                            <div className='h-20 w-16 bg-gray-300 rounded flex items-center justify-center text-gray-500 text-xs'>No Image</div>
                                        )}
                                    </td>
                                    <td className='border border-amber-200 px-6 py-4 font-semibold text-gray-800'>{book.title || book.name}</td>
                                    <td className='border border-amber-200 px-6 py-4 text-gray-700'>{book.author || 'N/A'}</td>
                                    <td className='border border-amber-200 px-6 py-4 text-gray-700 max-w-xs truncate'>{book.description || 'N/A'}</td>
                                    <td className='border border-amber-200 px-6 py-4 text-gray-700'>${book.price || 'N/A'}</td>
                                    <td className='border border-amber-200 px-6 py-4 text-center text-gray-700'>{book.rdate || 'N/A'}</td>
                                    <td className='border border-amber-200 px-6 py-4 text-center'>
                                        <div className='flex gap-2 justify-center'>
                                            <button
                                                onClick={() => handleEdit(book.id)}
                                                className='bg-blue-500 duration-200 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200'
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(book.id)}
                                                className='bg-red-500 duration-200 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200'
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan='8' className='border border-amber-200 px-6 py-8 text-center text-gray-500'>
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
