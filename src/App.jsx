import React from "react"
import { LibList } from "./Components/LibList"
import Menu from "./Components/Menu";
import { Route, Routes } from "react-router-dom";
import AddBook from './Components/AddBook';
import SingleBook from "./Components/SingleBook";
import Login from './Components/Login';
import Signup from './Components/Signup';
import { LibShelf } from "./Components/LibShelf";
import MyShelf from './Components/MyShelf';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';
import ControlOrders from './Components/ControlOrders';

const App = () => {
  return (
    <>
      <Menu />
      <Routes>
        <Route element={<LibList />} path={'/'} />
        <Route element={<LibShelf />} path={'/view-books'} />
        <Route element={<Login />} path={'/login'} />
        <Route element={<Signup />} path={'/signup'} />
        <Route element={<AddBook />} path={'/add-book'} />
        <Route element={<SingleBook />} path={'/book/:id'} />
        <Route element={<MyShelf />} path={'/my-shelf'} />
        <Route element={<Cart />} path={'/cart'} />
        <Route element={<Checkout />} path={'/checkout'} />
        <Route element={<ControlOrders />} path={'/control-orders'} />
      </Routes>
    </>
  )
}
export default App;