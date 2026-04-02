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
    const containerRef = useRef(null);
    const bookRefsMap = useRef({});

    useEffect(() => {
        setLoading(true)
        dispatch(getAllBookAsync())
    }, []);

    useEffect(() => {
        if (books && books.length > 0) {
            setLoading(false)
            animateBooks()
        }
    }, [books]);

    const animateBooks = () => {
        if (!containerRef.current) return;
        
        books.forEach((book, index) => {
            const element = bookRefsMap.current[book.id];
            if (!element) return;

            const animationVariants = [
                { opacity: 0, x: -100, y: 50, rotationZ: -15 },
                { opacity: 0, x: 100, y: 50, rotationZ: 15 },
                { opacity: 0, y: 100, rotationX: 90 },
                { opacity: 0, y: -100, rotationX: -90 },
                { opacity: 0, x: -150, rotationZ: -25 },
                { opacity: 0, x: 150, rotationZ: 25 },
            ];

            const variant = animationVariants[index % animationVariants.length];

            gsap.fromTo(
                element,
                variant,
                {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    rotationZ: 0,
                    rotationX: 0,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "back.out(1.7)"
                }
            );
        });
    };

    const handleBookClick = (id) => {
        const element = bookRefsMap.current[id];
        if (!element) return;

        gsap.to(element, {
            rotationY: 180,
            duration: 0.8,
            ease: "back.inOut(2)",
            onComplete: () => {
                navigator(`/book/${id}`);
            }
        });
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
                <>
                    <div className='absolute h-[99vh] w-[99vw] top-0 left-0 z-10 bg-[#edeceb] overflow-hidden'></div>
                    <img src="/loader.gif" className='absolute top-1/2 left-1/2 -translate-1/2 h-1/2 scale-75 w-auto z-40 overflow-hidden opacity-100' alt="" />
                </>
            }
            <div className='p-8 pt-20 min-h-screen bg-white'>
                <div className='mb-12'>
                    <h1 className='bricolage-grotesque text-6xl font-bold text-black mb-2'>My Shelf</h1>
                    <div className='w-32 h-1.5 bg-black'></div>
                </div>

                {books && books.length > 0 ? (
                    <div ref={containerRef} className='grid grid-cols-4 gap-6 auto-rows-max'>
                        {books.map((book, index) => (
                            <div
                                key={book.id}
                                ref={(el) => { if (el) bookRefsMap.current[book.id] = el; }}
                                className={`book-card ${getBentoClasses(index)} cursor-pointer group`}
                                onClick={() => handleBookClick(book.id)}
                                style={{
                                    perspective: '1000px',
                                    transformStyle: 'preserve-3d'
                                }}
                            >
                                <div
                                    className={`relative ${getBookHeight(index)} rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-neutral-100 border border-neutral-300`}
                                    style={{
                                        aspectRatio: '2 / 3',
                                        backgroundImage: book?.coverPath ? `url(${book.coverPath})` : 'none',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                >
                                    {/* Overlay with information - always visible */}
                                    <div className='absolute inset-0 bg-black/30 group-hover:bg-black/60 transition-all duration-300 flex flex-col justify-between p-3'>
                                        {/* Top info */}
                                        <div className='flex-1'></div>
                                        
                                        {/* Bottom info - always visible */}
                                        <div>
                                            <h3 className='bricolage-grotesque text-sm font-bold text-white line-clamp-2 leading-tight'>
                                                {book.title || book.name}
                                            </h3>
                                            {book.author && (
                                                <p className='text-xs text-white/90 mt-1 line-clamp-1'>
                                                    {book.author}
                                                </p>
                                            )}
                                            {book.shortDescription && (
                                                <p className='text-xs text-white/75 mt-2 line-clamp-2'>
                                                    {book.shortDescription}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Edge highlight effect */}
                                    <div className='absolute top-0 left-0 w-1 h-full bg-white/20'></div>
                                </div>
                            </div>
                        ))}
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