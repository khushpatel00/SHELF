import React from "react"
import { Landing } from "./Components/Landing"
import { LibList } from "./Components/LibList"
import Menu from "./Components/Menu";
import { Route, Routes } from "react-router-dom";
import AddBook from './Components/AddBook';
import SingleBook from "./Components/SingleBook";

const App = () => {
  return (
    <>
      <Menu />
      <Routes>
        <Route element={<LibList />} path={'/'} />
        <Route element={<Landing />} path={'/view-books'} />
        
        <Route element={<AddBook />} path={'/add-book'} />
        <Route element={<SingleBook />} path={'/book/:id'} />

      </Routes>
    </>
  )
}
export default App;