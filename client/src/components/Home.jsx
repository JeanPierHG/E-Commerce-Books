import React from 'react';
import { useState , useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { Link }  from 'react-router-dom';
import { getBooks } from '../actions';
import SideBar from './SideBar';
import BottomBar from './BottomBar'
import NavBar from './NavBar';



export default function Home(){

    const dispatch = useDispatch() 
    const allBooks = useSelector(state => state.books) 

  
return(
    <div >

        <NavBar/>
        
        <SideBar/>


        <div >
            <div>
                <select onChange={e => handleOrderByName(e)} defaultValue='default'>
                    <option value="default" disabled >Alphabetical Order</option>
                    <option value="ascendent">A-Z</option>
                    <option value="descendent">Z-A</option>
                </select>
           
                <select  onChange={e => handleOrderByRating(e)} defaultValue='default'>
                    <option value="default" disabled >Order by Rating</option>
                    <option value="desc">Higher</option>
                    <option value="asc">Lower</option>
                </select>

                <select  onChange={e => handleOrderByPrice(e)} defaultValue='default'>
                    <option value="default" disabled >Order by Price</option>
                    <option value="desc">Higher</option>
                    <option value="asc">Lower</option>
                </select>
            </div>
     
            <div>
                {
                allBooks.length 
                ? allBooks.map(book=>{
                    return(
                        // <Link to={"/book/"+book.id}>
                        //     <Card title={book.title} cover={book.cover} price={book.price} rating={book.rating} id={book.id} key={book.id}/>
                        // </Link>
                        book.title
                      
                    )               
                    })
                : <h5>Book Not Found!</h5>
                }
            </div>
           
            <BottomBar/>
        </div>
    </div>
    
)

   
}