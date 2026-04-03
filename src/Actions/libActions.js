import { collection, addDoc, doc, deleteDoc, setDoc, querySnapshotFromJSON, getDoc, getDocs, query, where, updateDoc } from "firebase/firestore";
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

export const setLoggedIn = (user) => {
    return {
        type: 'LOGIN',
        payload: user,
    }
}

export const setLoggedOut = () => {
    return {
        type: 'LOGOUT',
    }
}

export const setUserRole = (role) => {
    return {
        type: 'SET_USER_ROLE',
        payload: role,
    }
}

export const setOrders = (orders) => {
    return {
        type: 'SET_ORDERS',
        payload: orders,
    }
}

export const addOrder = (order) => {
    return {
        type: 'ADD_ORDER',
        payload: order,
    }
}

export const updateOrder = (order) => {
    return {
        type: 'UPDATE_ORDER',
        payload: order,
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
// export const editBookAsync = (id, data) => {
//     return async (dispatch) => {
//         try {
//             // const res = await getDocs(collection(db, "SHELF"));
//             dispatch(editBook(res.data));
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }
export const editBookAsync = (id, data) => {
    return async (dispatch) => {
        try {
            await setDoc(doc(db, "SHELF", id), data, { merge: true })
            dispatch(editBook(id, data))
        } catch (error) {
            console.log(error)
        }
    }
}

// export const getBookAsync = (id, data) => {
//     return async (dispatch) => {
//         try {
//             // const res = await getDocs(collection(db, "SHELF"));
//             dispatch(getBook(res.data));
//             console.log(res);
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }

export const getBookAsync = (id) => {
    return async (dispatch) => {
        try {
            const res = await getDoc(doc(db, "SHELF", id))
            if (res.exists()) {
                const book = { id: res.id, ...res.data() }
                dispatch(getBook(book))
            } else {
                console.log(`Document not found: ${id}`)
            }
        } catch (error) {
            console.log(error)
        }
    }
}

// Order management
export const createOrderAsync = (userId, orderData) => {
    return async (dispatch) => {
        try {
            const orderRef = await addDoc(collection(db, "orders"), {
                userId,
                ...orderData,
                createdAt: new Date(),
                status: 'pending'
            })
            const newOrder = { id: orderRef.id, userId, ...orderData, createdAt: new Date(), status: 'pending' }
            dispatch(addOrder(newOrder))
            return newOrder.id
        } catch (error) {
            console.log(error)
        }
    }
}

export const getUserOrdersAsync = (userId) => {
    return async (dispatch) => {
        try {
            const q = query(collection(db, "orders"), where("userId", "==", userId))
            const snapshot = await getDocs(q)
            const orders = []
            snapshot.forEach((doc) => {
                orders.push({ id: doc.id, ...doc.data() })
            })
            dispatch(setOrders(orders))
        } catch (error) {
            console.log(error)
        }
    }
}

export const getAllOrdersAsync = () => {
    return async (dispatch) => {
        try {
            const snapshot = await getDocs(collection(db, "orders"))
            const orders = []
            snapshot.forEach((doc) => {
                orders.push({ id: doc.id, ...doc.data() })
            })
            dispatch(setOrders(orders))
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateOrderStatusAsync = (orderId, status) => {
    return async (dispatch) => {
        try {
            await updateDoc(doc(db, "orders", orderId), { status })
            const updatedOrder = await getDoc(doc(db, "orders", orderId))
            dispatch(updateOrder({ id: updatedOrder.id, ...updatedOrder.data() }))
        } catch (error) {
            console.log(error)
        }
    }
}

// Admin role management
export const setUserAsAdminAsync = (userId) => {
    return async (dispatch) => {
        try {
            const userRef = doc(db, "users", userId)
            const userSnap = await getDoc(userRef)
            
            // If user document doesn't exist, create it first
            if (!userSnap.exists()) {
                await setDoc(userRef, {
                    role: 'admin',
                    createdAt: new Date()
                })
            } else {
                // If exists, just update the role
                await updateDoc(userRef, { role: 'admin' })
            }
            
            dispatch(setUserRole('admin'))
        } catch (error) {
            console.log('Error making user admin:', error)
        }
    }
}

export const getUserRoleAsync = (userId) => {
    return async (dispatch) => {
        try {
            const userRef = doc(db, "users", userId)
            const userSnap = await getDoc(userRef)
            
            if (userSnap.exists()) {
                const role = userSnap.data().role || 'user'
                dispatch(setUserRole(role))
            } else {
                // User document doesn't exist, create it with default 'user' role
                await setDoc(userRef, {
                    role: 'user',
                    createdAt: new Date()
                })
                dispatch(setUserRole('user'))
            }
        } catch (error) {
            console.log('Error getting user role:', error)
            dispatch(setUserRole('user'))
        }
    }
}
