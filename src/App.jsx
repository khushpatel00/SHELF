import React from "react"
import { LibShelf } from "./Components/LibShelf"
import Menu from "./Components/Menu";
import { Route, Routes } from "react-router";
import AddBook from './Components/addBook';

const App = () => {
  return (
    <>
      <Menu />
      <Routes>
        <Route element={<LibShelf />} path={'/'} />
        <Route element={<AddBook />} path={'/add-book'} />

      </Routes>
    </>
  )
}
export default App;