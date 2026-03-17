export const addBook = (data) => {
    return {
        type: 'ADD_BOOK',
        payload: data,
    }
}
export const getAllBooks = () => {
    return {
        type: 'GET_ALL_BOOKS',
    } 
}
export const getBook = (id) => {
    return {
        type: 'GET_BOOK',
        payload: id,
    } 
}