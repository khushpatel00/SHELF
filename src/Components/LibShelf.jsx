import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getAllBooks, getAllBookAsync } from "../Actions/libActions";
import { useNavigate } from "react-router";
import gsap from "gsap";

export const LibShelf = () => {
    const books = useSelector(state => state.books);
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const [loading, setLoading] = useState(false)
    const loaderRef = useRef(null);
    const containerRef = useRef(null);
    const bookRefsMap = useRef({});

    useEffect(() => {
        setLoading(true)
        dispatch(getAllBookAsync())
    }, []);

    useEffect(() => {
        if (books && books.length > 0) {
            animateBooks()
            // Fade out loader
            if (loaderRef.current) {
                gsap.to(loaderRef.current, {
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.inOut",
                    onComplete: () => setLoading(false)
                });
            } else {
                setLoading(false);
            }
        }
    }, [books]);

    const animateBooks = () => {
        if (!containerRef.current) return;
        
        books.forEach((book, index) => {
            const element = bookRefsMap.current[book.id];
            if (!element) return;

            gsap.fromTo(
                element,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    delay: index * 0.08,
                    ease: "power2.out"
                }
            );
        });
    };

    const handleBookClick = (id) => {
        navigator(`/book/${id}`);
    };

    // Bento grid configuration - different sizes for different positions
    const getBentoClasses = (index) => {
        const bentoPattern = [
            'col-span-1 row-span-1',
            'col-span-1 row-span-1',
            'col-span-2 row-span-1',
            'col-span-1 row-span-1',
            'col-span-1 row-span-1',
            'col-span-1 row-span-2',
            'col-span-1 row-span-1',
            'col-span-1 row-span-1',
        ];
        return bentoPattern[index % bentoPattern.length];
    };

    const getBookHeight = (index) => {
        const pattern = [
            'h-80',
            'h-80',
            'h-80',
            'h-96',
            'h-80',
            'h-[34rem]',
            'h-80',
            'h-80',
        ];
        return pattern[index % pattern.length];
    };

    return (
        <>
            {loading &&
                <div ref={loaderRef}>
                    <div className='absolute h-[99vh] w-[99vw] top-0 left-0 z-10 bg-[#edeceb] overflow-hidden'></div>
                    <img src="/loader.gif" className='absolute top-1/2 left-1/2 -translate-1/2 h-1/2 scale-75 w-auto z-40 overflow-hidden opacity-100' alt="" />
                </div>
            }
            <div className='p-8 pt-20 min-h-screen bg-white'>
                <div className='mb-12'>
                    <h1 className='bricolage-grotesque text-6xl font-bold text-black mb-2'>My Shelf</h1>
                    <div className='w-32 h-1.5 bg-black'></div>
                </div>

                {books && books.length > 0 ? (
                    <div ref={containerRef} className='grid grid-cols-4 gap-6 auto-rows-max'>
                        {books.map((book, index) => {
                            const bentoClass = getBentoClasses(index);
                            const isWideItem = bentoClass.includes('col-span-2');
                            const isTallItem = bentoClass.includes('row-span-2');
                            
                            return (
                                <div
                                    key={book.id}
                                    ref={(el) => { if (el) bookRefsMap.current[book.id] = el; }}
                                    className={`book-card ${bentoClass} cursor-pointer group bg-neutral-50 p-4 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-all duration-300`}
                                    onClick={() => handleBookClick(book.id)}
                                >
                                    <div className='flex gap-4 h-full'>
                                        {/* Book Cover */}
                                        <div
                                            className={`relative rounded-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-neutral-100 border border-neutral-300 flex-shrink-0 ${isWideItem ? 'w-40' : 'w-32'}`}
                                            style={{
                                                aspectRatio: '2 / 3',
                                                backgroundImage: book?.coverPath ? `url(${book.coverPath})` : 'none',
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center'
                                            }}
                                        >
                                            {/* Overlay */}
                                            <div className='absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300'></div>
                                            {/* Edge highlight */}
                                            <div className='absolute top-0 left-0 w-1 h-full bg-white/20'></div>
                                        </div>

                                        {/* Description Section - Show for wide or tall items */}
                                        {book.shortDescription && (
                                            <div className='flex flex-col justify-between flex-1 min-w-0'>
                                                <div>
                                                    <h3 className='bricolage-grotesque text-sm font-bold text-black line-clamp-2 leading-tight'>
                                                        {book.title || book.name}
                                                    </h3>
                                                    {book.author && (
                                                        <p className='text-xs text-neutral-600 mt-2 line-clamp-1'>
                                                            {book.author}
                                                        </p>
                                                    )}
                                                </div>
                                                <p className='text-xs text-neutral-700 line-clamp-3 leading-relaxed'>
                                                    {book.shortDescription}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className='flex items-center justify-center h-96 rounded-lg bg-neutral-50 border border-neutral-200'>
                        <p className='bricolage-grotesque text-2xl text-neutral-400'>No books yet. Start exploring!</p>
                    </div>
                )}
            </div>
        </>
    );
}