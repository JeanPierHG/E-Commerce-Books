
import React, {useState} from 'react';
import SearchBar from './SearchBar';
import style from '../Styles/nav.module.css';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {getBookGenre, getBooks} from '../actions';
import {scroller} from "react-scroll";

const NavBar = () => {

    const [state, setState] = useState('default');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getBooks());
        navigate('/home/');
        scroller.scrollTo("gaston");
    };

    const handleSelectGenre = (e) => {
        e.preventDefault();
        dispatch(getBookGenre(e.target.value));
        setState('default');
        navigate('/home/');
        scroller.scrollTo("gaston");
    }

    const genres = ['Salud', 'Deportes', 'Biografia', 'Nutricion', 'Filosofia', 'Ensayo', 'Desarrollo Personal',
    'Economia', 'Espiritualidad', 'Historia', 'Negocios', 'Psicologia', 'Neurociencia'];

    return (
        <div className={style.container}>
            
            <h3 className={style.logo}>PG-11 Books</h3>

            <Link to="/home" className={style.Link}><p className={style.navItem} onClick={handleClick}>Todos los libros</p></Link>

            <Link to='/home' className={style.Link}><p className={style.navItem}>Inicio</p></Link>

            <div>
               <Link to='/author' className={style.Link}><p className={style.navItem}>Autores</p></Link> 
            </div>

            <div>
                <select defaultValue="default" value={state} onChange={(e) => handleSelectGenre(e)} className={style.select}>Generos
                    <option value="default" disabled>Generos</option>
                    {
                        genres?.map(e => (
                            <option key={e} value={e}>{e}</option>
                        ))
                    }
                </select>    
            </div>

            <SearchBar/>

            <div className={style.toggle}>
                <div className={style.bar}></div>
            </div>

            <Link to='/user'  className={style.Link}><h3 className={style.navItem}>Mi cuenta</h3></Link>
           
        </div>
    )
}

export default NavBar;
