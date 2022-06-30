
import React from 'react';
import {FaHeart} from "react-icons/fa";
import {useDispatch, useSelector} from 'react-redux';
import {useAuth0} from "@auth0/auth0-react";
import {addFav, getUsers} from '../actions';

const Fav = ({book}) => {

    const isLogged = useSelector(state => state.userLogged);
    const dispatch = useDispatch();
    const{loginWithRedirect} = useAuth0();
    
    const handleClick = () => {
        if(isLogged.length === 0) return loginWithRedirect();
        const id = isLogged[0]._id;
        dispatch(addFav(book, id));
        alert('Libro agregado a favoritos');
        dispatch(getUsers());
    }


    return (
        <div>
            <FaHeart onClick={() => handleClick()}/>
        </div>
    )
}

export default Fav;

