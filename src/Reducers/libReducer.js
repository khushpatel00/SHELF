const baseState = {
    books: JSON.parse(localStorage.getItem('books')) || [],
    book: null,
    loading: false,
    err: '',
}
// console.log(JSON.parse(localStorage.getItem('books')))
JSON.parse(localStorage.getItem('books')) ? '' : '[]';
export const libReducer = (state = baseState, action) => {
    let data = JSON.parse(localStorage.getItem('books')) || []
    switch (action.type) {
        case 'GET_ALL_BOOKS':
            return {
                ...state,
                books: JSON.parse(localStorage.getItem('books')) || []
            };
        case 'ADD_BOOK':
            let localItems = JSON.parse(localStorage.getItem('books'))
            localItems.push(action.payload);
            // console.log(localItems);
            localStorage.setItem('books', JSON.stringify(localItems))
            return {
                ...state,
                books: JSON.parse(localStorage.getItem('books'))
            };
        case 'GET_BOOK':
            let book = JSON.parse(localStorage.getItem('books'))[action.payload]
            return {
                ...state,
                book: book
            }

        default:
            return state;
    }
}