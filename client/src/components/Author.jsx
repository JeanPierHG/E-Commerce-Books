
import React from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {getAuthors} from '../actions';
import CardAuthor from './CardAuthor';
import { animateScroll as scroll} from "react-scroll";
import styles from '../Styles/author.module.css'
import SearchBarAuthor from './SearchBarAuthor';

const Author = () => {

    const dispatch = useDispatch();
    const authors = useSelector(state => state.authors);    
    const orderedAuthors = authors.sort(function (a, b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        if (b.name.toLowerCase() > a.name.toLowerCase()) {
          return -1;
        }
        return 0;
    })
    
    useEffect(() => {
        scroll.scrollToTop();
    }, []);

    const handleClickAuthors = (e) => {
        e.preventDefault();
        dispatch(getAuthors());
        navigate('/admin/');
        scroller.scrollTo("gaston");
    };

    return (
        <div className={styles.authors}>

            <SearchBarAuthor/>

        <Link to="/admin">
            <p  onClick={handleClickAuthors}>Todos los Autores</p>
        </Link>
         
            <ol className={styles.container}>
                {orderedAuthors.length?
                    orderedAuthors.map(e => (
                        <Link to={'/author/' + e._id} className={styles.Link}>
                            
                            <CardAuthor name={e.name} surname={e.surname} picture={e.picture}/>
                        
                        </Link>
                    ))
                    :"No se encontro el Escritor"
                }  
            </ol>
      
        </div>
    )
}

export default Author;
