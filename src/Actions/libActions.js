export const addBook = (data) => {
    return {
        type: 'ADD_BOOK',
        payload: data,
    }
}
export const getAllBook = () => {
    return {
        type: 'GET_ALL_BOOKS',
    } 
}