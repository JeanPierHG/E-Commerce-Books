import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getBooks } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import FAQ from "./components/FAQ";
import Landing from "./components/Landing";
import Author from "./components/Author";
import BookDetails from "./components/BookDetails";
import AuthorDetails from './components/AuthorDetails';
import AddBook from './components/AddBook';
import Add from './components/Add';
import AddAuthor from './components/AddAuthor';
import BottomBar from './components/BottomBar';



function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);


  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path='/' element= {<Landing/>}/>
        <Route exact path='/home' element= {<Home/>}/>      
        <Route exact path='/aboutus' element={<AboutUs/>}/>
        <Route exact path='/faq' element={<FAQ/>}/>
        <Route exact path='/author' element={<Author/>}/>
        <Route exact path='/book/:id' element={<BookDetails/>} />
        <Route exact path='/author/:id' element={<AuthorDetails/>} />
        <Route exact path='/add' element={<Add/>} />  
        <Route exact path='/addbook' element={<AddBook/>} />     
        <Route exact path='/addauthor' element={<AddAuthor/>} />      
      </Routes>
      <BottomBar/>
    </BrowserRouter>
  );
}

export default App;
