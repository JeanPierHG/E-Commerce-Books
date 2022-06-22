
import React from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {getAuthors} from '../actions';
import CardAuthor from './CardAuthor';

const Author = () => {

    const dispatch = useDispatch();
    const authors = useSelector(state => state.authors);
    
    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getAuthors());
    }

    /* useEffect(() => dispatch(getAuthors()),[dispatch]); */

    return (
        <div>
           <button onClick={handleClick}>ingresar</button>
            <ol>
                {
                    authors?.map(e => (
                        <Link to={'/author/' + e._id}>
                            
                            <CardAuthor name={e.name} surname={e.surname} picture={e.picture}/>
                        
                        </Link>
                    ))
                }  
            </ol>
      
        </div>
    )
}

export default Author;
