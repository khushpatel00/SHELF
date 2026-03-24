import axios from "axios"

export const addBook = (data) => {
    return {
        type: 'ADD_BOOK',
        payload: data,
    }
}
export const getAllBooks = (data) => {
    return {
        type: 'GET_ALL_BOOKS',
        payload:data,
    }
}
export const getBook = (data) => {
    return {
        type: 'GET_BOOK',
        payload: data,
    }
}
export const editBook = (id, data) => {
    return {
        type: 'EDIT_BOOK',
        payload: { id, data },
    }
}
export const deleteBook = (id) => {
    return {
        type: 'DELETE_BOOK',
        payload: id,
    }
}

//thank

export const addBookAsync = (data) => {
    return async (dispatch) => {
        try {
            let res = await axios.post("http://localhost:5000/books/", data);
            dispatch(addBook(res.data));
        } catch (error) {
            console.log(error);
        }
    }
}
export const deleteBookAsync = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`http://localhost:5000/books/${id}`);

            console.log(id);
            dispatch(deleteBook(id));


        } catch (error) {
            console.log(error);
        }
    }
}
export const editBookAsync = (id, data) => {
    return async (dispatch) => {
        try {
            let res = await axios.put(`http://localhost:5000/books/${id}`, data);
            dispatch(editBook(res.data));
        } catch (error) {
            console.log(error);
        }
    }
}
export const getAllBookAsync = (data) => {
    return async (dispatch) => {
        try {
            let res = await axios.get("http://localhost:5000/books",data);
            dispatch(getAllBooks(res.data));
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }
}
export const getBookAsync = (id,data) => {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:5000/books/${id}`,data);
            dispatch(getBook(res.data));
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
}