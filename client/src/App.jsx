import './App.css';
import React from 'react';
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import  Home  from './components/Home';
import AboutUs from './components/AboutUs';
import FAQ from './components/FAQ';
import { getBooks } from './actions';
import { useDispatch , useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {

  const dispatch = useDispatch() 

  useEffect(()=> {    
    dispatch(getBooks())
    },[dispatch]) 

  return (
    <BrowserRouter>
    <Routes>
        {/* <Route exact path='/' element= {<LandingPage/>}/> */}
        <Route exact path='/home' element= {<Home/>}/>
        <Route exact path='/aboutus' element={<AboutUs/>}/>
        <Route exact path='/faq' element={<FAQ/>}/>
        {/* <Route exact path='/book/:id' element={<DetailBook/>} />        */}
    </Routes>
    </BrowserRouter>
  )
}

export default App