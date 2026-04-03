const baseState = {
    books: [],
    book: null,
    loading: false,
    err: '',
    loggedIn: false,
    user: null,
    userRole: 'user', // 'user' or 'admin'
    orders: [],
}
// books: JSON.parse(localStorage.getItem('books')) || [],
// console.log(JSON.parse(localStorage.getItem('books')))
// JSON.parse(localStorage.getItem('books')) ? '' : '[]';
export const libReducer = (state = baseState, action) => {
    // let data = JSON.parse(localStorage.getItem('books')) || []
    switch (action.type) {
        case 'GET_ALL_BOOKS':
            return {
                ...state,
                books: action.payload
            };
        case 'ADD_BOOK':
            // let localItems = JSON.parse(localStorage.getItem('books')) || []
            // localItems.push(action.payload);
            // console.log(localItems);
            // localStorage.setItem('books', JSON.stringify(localItems))
            return {
                ...state,
                // books: JSON.parse(localStorage.getItem('books') || '[]') || []
            };
        case 'GET_BOOK':
            // let book = JSON.parse(localStorage.getItem('books'))[action.payload]
            return {
                ...state,
                book: action.payload
            }
        case 'EDIT_BOOK':
            // let editItems = JSON.parse(localStorage.getItem('books'))
            // editItems[action.payload.id] = action.payload.data
            // localStorage.setItem('books', JSON.stringify(editItems))
            return {
                ...state,
                // books: editItems,
                // book: action.payload.data
            }
        case 'DELETE_BOOK':
            // let deleteItems = JSON.parse(localStorage.getItem('books'))
            // deleteItems.splice(action.payload, 1)
            // localStorage.setItem('books', JSON.stringify(deleteItems))
            return {
                ...state,
                // books: deleteItems, 
                // book: null
            }
        case 'LOGIN':
            return {
                ...state,
                loggedIn: true,
                user: action.payload,
            }
        case 'LOGOUT':
            return {
                ...state,
                loggedIn: false,
                user: null,
                userRole: 'user',
            }
        case 'SET_USER_ROLE':
            return {
                ...state,
                userRole: action.payload,
            }
        case 'SET_ORDERS':
            return {
                ...state,
                orders: action.payload,
            }
        case 'ADD_ORDER':
            return {
                ...state,
                orders: [...state.orders, action.payload],
            }
        case 'UPDATE_ORDER':
            return {
                ...state,
                orders: state.orders.map(order => 
                    order.id === action.payload.id ? action.payload : order
                ),
            }

        default:
            return state;
    }
}