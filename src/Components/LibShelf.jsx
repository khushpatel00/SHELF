import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getAllBook } from "../Actions/libActions";

export const LibShelf = () => {
    const { books } = useSelector(state => state);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllBook());
    }, []);

    return (
        <>
            {/* {books} */}
        </>
    )


}