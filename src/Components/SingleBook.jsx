import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import { getBook } from '../Actions/libActions';

function SingleBook() {
    const { id } = useParams();
    const book = useSelector(state => state.book)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getBook(id));
        console.log(book)
    }, [])
    return (
        <div
            className='basis-1/8 cursor-pointer bg-amber-100 hover:scale-105 mx-auto lg:ms-auto lg:min-w-[20vw] xl:min-w-[15vw] md:min-w-[25vw] duration-200 *:duration-150 min-w-[50vw] max-w-fit w-auto aspect-2/3 relative border-s-8 border-amber-200'>
            <div className='absolute top-1/10 left-1/2 -translate-x-1/2 w-full p-0 m-0'>
                <p className='bricolage-grotesque capitalize text-2xl text-center wrap-anywhere w-full px-5'>{book?.title || book?.name}</p>
                <p className='bricolage-grotesque capitalize text-end pe-5 text-zinc-600'>{book?.author ? `~${book?.author}` : ''}</p>
            </div>

            <div className='absolute bottom-1/12 left-1/2 -translate-x-1/2 w-full'>
                <p className='font-serif first-letter:capitalize w-full text-xs text-center italic px-5'>{book?.description}</p>
            </div>
        </div>
    )
}

export default SingleBook