import React from "react";
import { useDispatch } from "react-redux";
import { getAuthorsAdmin } from "../actions";
import { Link } from "react-router-dom";


export default function AdminRefreshAuthor(){


    const dispatch = useDispatch()


    const handleClickAuthors = (e) => {
        e.preventDefault();
        dispatch(getAuthorsAdmin());
        navigate('/admin/');
        scroller.scrollTo("gaston");
    };



    return(
        <div>
     <Link to="/admin">
         <p  onClick={handleClickAuthors}>Todos los Autores</p>
     </Link>
     </div>
    )
}