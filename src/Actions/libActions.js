import { collection, addDoc, doc, deleteDoc, setDoc, querySnapshotFromJSON, getDoc, getDocs } from "firebase/firestore";
import db from '../firebase/firebase.config';


export const addBook = (data) => {
    return {
        type: 'ADD_BOOK',
        payload: data,
    }
}
export const getAllBooks = (data) => {
    return {
        type: 'GET_ALL_BOOKS',
        payload: data,
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


export const setLoggedIn = (state) => {
    if (state === true) return {
        type: 'LOGIN',
        payload: state,
    }
    else return {
        type: 'LOGOUT',
        payload: state,
    }

}
export const addBookAsync = (data) => {
    return async (dispatch) => {
        try {
            await setDoc(doc(db, "SHELF", data.id), data)
            dispatch(addBook({
                ...data,
                id: data.id,
            }));
            console.log(data.id);


        } catch (error) {
            console.error(error);
        }
    }
}
export const getAllBookAsync = (data) => {
    return async (dispatch) => {
        try {
            const res = await getDocs(collection(db, "SHELF"));
            const books = [];

            res.forEach((doc) => {
                books.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            dispatch(getAllBooks(books));
        } catch (error) {
            console.log(error);
        }
    }
}


export const deleteBookAsync = (id) => {
    return async (dispatch) => {
        try {

            await deleteDoc(doc(db, "SHELF", id)); 

            dispatch(deleteBook(id));

        } catch (error) {
            console.log(error);
        }
    }
}
export const editBookAsync = (id, data) => {
    return async (dispatch) => {
        try {
            dispatch(editBook(res.data));
        } catch (error) {
            console.log(error);
        }
    }
}

export const getBookAsync = (id, data) => {
    return async (dispatch) => {
        try {

            dispatch(getBook(res.data));
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
}
