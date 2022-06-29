import React from "react";
import { useDispatch } from "react-redux";
import { getBooksAdmin } from "../actions";
import { Link } from "react-router-dom";


export default function AdminRefreshBooks(){


    const dispatch = useDispatch()



    const handleClickBooks = (e) => {
        e.preventDefault();
        dispatch(getBooksAdmin());
        navigate('/admin/');
        scroller.scrollTo("gaston");
    };

    


    return(
    <div>
        <Link to="/admin">
            <p onClick={handleClickBooks}>Todos los libros</p>
        </Link>
     </div>
    )
}