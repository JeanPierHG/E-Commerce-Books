import React from 'react';
import { Link }  from 'react-router-dom';

export default function Landing(){

    return(
        <div>
        <div>E-commerce Libros</div>
        <Link to='/home'>
            <button>Home</button>
        </Link>
        </div>
    )
}