const baseState = {
    books: JSON.parse(localStorage.getItem('books')) || [],
    book: null,
    loading: false,
    err: '',
}
console.log(JSON.parse(localStorage.getItem('books')))
JSON.parse(localStorage.getItem('books')) ? '' : localStorage.setItem('books', JSON.stringify([{ name: 'book1', author: 'author1' }, { name: 'book2', author: 'author2' }]))
export const libReducer = (state = baseState, action) => {
    let data = JSON.parse(localStorage.getItem('books')) || []
    switch (action.type) {
        case 'GET_ALL_BOOKS': 
            return baseState.books
            break;
        case 'ADD_BOOK': 
            
        default:
            return '';
    }
}