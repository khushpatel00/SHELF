import { useState } from 'react'

function AddBook() {

    const [formData, setFormData] = useState({
        title: 'Time Immersion over the space',
        description: 'A boy who was responsible for manuplating the clock worldwide, mysteries remain',
        author: 'Arthur Morgan',
        price: '50',
        rdate: '',
    }) 

    const formHandler = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const formSubmitHandler = () => {
        
    }

    return (
        <div className='flex flex-row flex-wrap items-center justify-center'>

            <div className='basis-full lg:basis-1/4 flex flex-wrap'>
                <div className='bg-amber-100 mx-auto lg:ms-auto lg:min-w-[25vw] xl:min-w-[20vw] md:min-w-[30vw] duration-200 *:duration-150 min-w-[50vw] max-w-fit w-auto aspect-2/3 relative border-s-8 border-amber-200'>
                    <div className='absolute top-1/10 left-1/2 -translate-x-1/2 w-full p-0 m-0'>
                        <p className='bricolage-grotesque capitalize text-2xl text-center wrap-anywhere w-full px-5'>{formData.title}</p>
                        <p className='bricolage-grotesque capitalize text-end pe-5 text-zinc-600'>{formData.author ? `~${formData.author}` : ''}</p>
                    </div>

                    <div className='absolute bottom-1/12 left-1/2 -translate-x-1/2 w-full'>
                        <p className='font-serif first-letter:capitalize w-full text-xs text-center italic px-5'>{formData.description}</p>
                    </div>
                </div>
            </div>


            <form action="" className="flex flex-col ps-10 flex-wrap w-full mt-5 mx-auto lg:m-0 lg:basis-1/2" onSubmit={formSubmitHandler}>
                <div className={'w-2/3 flex flex-row flex-wrap items-center'}>
                    <label className={'text-4xl font-semilight bricolage-grotesque'} htmlFor="title">Title: </label>
                    <input required value={formData.title} onChange={formHandler} placeholder="Title" className={'bg-zinc-300/50 rounded-md px-3 py-2 ms-5 my-0.5'} type="text" id="title" name="title" />
                </div>
                <div className={'w-2/3 flex flex-row flex-wrap items-center'}>
                    <label className={'text-4xl font-semilight bricolage-grotesque'} htmlFor="description">Description: </label>
                    <input required value={formData.description} onChange={formHandler} placeholder="Description" className={'bg-zinc-300/50 rounded-md px-3 py-2 ms-5 my-0.5'} type="text" id="description" name="description" />
                </div>
                <div className={'w-2/3 flex flex-row flex-wrap items-center'}>
                    <label className={'text-4xl font-semilight bricolage-grotesque'} htmlFor="author">Author: </label>
                    <input required value={formData.author} onChange={formHandler} placeholder="Author" className={'bg-zinc-300/50 rounded-md px-3 py-2 ms-5 my-0.5'} type="text" id="author" name="author" />
                </div>
                <div className={'w-2/3 flex flex-row flex-wrap items-center'}>
                    <label className={'text-4xl font-semilight bricolage-grotesque'} htmlFor="price">Price: </label>
                    <input required value={formData.price} onChange={formHandler} placeholder="Price" className={'bg-zinc-300/50 rounded-md px-3 py-2 ms-5 my-0.5'} type="number" id="price" name="price" />
                </div>
                <div className={'w-2/3 flex flex-row flex-wrap items-center'}>
                    <label className={'text-4xl font-semilight bricolage-grotesque'} htmlFor="rdate">Release Date: </label>
                    <input required value={formData.rdate} onChange={formHandler} className={'bg-zinc-300/50 rounded-md px-3 py-2 ms-5 my-0.5 uppercase'} type="date" id="rdate" name="rdate" />
                </div>
                <div className={'w-2/3 flex flex-row flex-wrap items-center'}>
                    <label className={'text-4xl font-semilight bricolage-grotesque'} htmlFor="coverImage">Cover Image: </label>
                    <input className={'bg-zinc-300/50 rounded-md px-3 py-2 ms-5 my-0.5 uppercase'} type="file" id="coverImage" name="coverImage" accept='.jpg,.jpeg,.png,.webp' />
                </div>
                <div className={'w-2/3 flex flex-row flex-wrap items-center'}>
                    <input type="submit" className="text-3xl bricolage-grotesque mt-2 border-2 duration-100 cursor-pointer border-zinc-200 px-3 py-1 rounded-md" />
                </div>
            </form>




        </div>
    )
}

export default AddBook