
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAuthorDetails } from '../actions';
import { Link } from 'react-router-dom';
import style from '../Styles/authorDetails.module.css';

const AuthorDetails = () => {

    const dispatch = useDispatch();
    const authorDetails = useSelector(state => state.authorDetails);
    const {id} = useParams();

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getAuthorDetails(id));
    }

    /* useEffect(() => dispatch(getAuthorDetails(id)), [dispatch]); */

    return (
        <div>

            <button onClick={handleClick}>ingresar</button>
            <Link to='/author'><p>Volver</p></Link>
            <div>
                <span>{authorDetails.name} </span>
                <span>{authorDetails.surname}</span>
            </div>
            <div className={style.imageContainer}>
                <img className={style.image} src={authorDetails.picture} alt="buscando img"/>
            </div>
            <div>
                <h4>{authorDetails.country}</h4>
                <p>{authorDetails.birth}</p>
            </div>
            <div>
                <p>{authorDetails.biography}</p>
            </div>
      
        </div>
    )
}

export default AuthorDetails;
