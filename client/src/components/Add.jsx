import React from 'react';
import { getBooks } from '../actions';
import CardBook from './CardBook';
import SideBar from './SideBar';
import BottomBar from './BottomBar'
import { Link } from 'react-router-dom';

export default function Home(){

    return(
        <div>

             <Link to="/addauthor">
            <button>Add Author</button>
            </Link>
            <Link to="/addbook">
            <button>Add Book</button>
            </Link>
        </div>

        

        
    )
}