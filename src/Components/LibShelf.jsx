import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getAllBooks, getAllBookAsync } from "../Actions/libActions";
import { useNavigate } from "react-router";

export const LibShelf = () => {
    const books = useSelector(state => state.books);
    const dispatch = useDispatch()
    const navigator = useNavigate()
    useEffect(() => {
        // dispatch(getAllBooks())
        dispatch(getAllBookAsync())
    }, []);
    const singleBookPage = (i) => {
        navigator(`/book/${i}`);
    }
    return (
        <>
            <div className='flex flex-row flex-wrap'>
                {books.map(((book, index) => {
                    return (
                        <div
                            key={i} onClick={() => singleBookPage(book.id)} className='basis-1/8 xl:basis-1/4 cursor-pointer bg-amber-100 hover:scale-105 m-3 my-6 lg:min-w-[20vw] xl:min-w-[15vw] md:min-w-[25vw] duration-200 *:duration-150 min-w-[50vw] max-w-fit w-auto aspect-2/3 relative border-s-8 border-amber-200'
                            style={{ backgroundImage: `url(${book?.coverPath})`, backgroundSize: 'cover' }}>
                            <div className='absolute top-1/10 w-full p-0 m-0'>
                                <p className='bricolage-grotesque capitalize text-2xl text-center wrap-anywhere w-full px-5'>{book.title || book.name}</p>
                                <p className='bricolage-grotesque capitalize text-end pe-5 text-zinc-600'>{book.author ? `~${book.author}` : ''}</p>
                            </div>

                            <div className='absolute bottom-1/12 left-1/2 -translate-x-1/2 w-full'>
                                <p className='font-serif first-letter:capitalize w-full text-xs text-center italic px-5'>{book.description}</p>
                            </div>
                        </div>
                    )
                }))}
            </div>
        </>
    )


}