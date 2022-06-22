
import React from 'react';
import SearchBar from './SearchBar';
import style from '../Styles/nav.module.css';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {getBookGenre} from '../actions';

const NavBar = () => {

    const dispatch = useDispatch();

    const handleSelectGenre = (e) => {
        e.preventDefault();
        dispatch(getBookGenre(e.target.value));
    }

    const genres = ['Salud', 'Deportes', 'Biografia', 'Nutricion', 'Filosofia', 'Ensayo', 'Desarrollo Personal',
    'Economia', 'Espiritualidad', 'Historia', 'Negocios', 'Psicologia', 'Neurociencia'];

    return (
        <div className={style.container}>
            
            <h3 className={style.logo}>PG-11 Books</h3>

            <Link to='/home'><p className={style.inicio}>Inicio</p></Link>

            <div className={style.select}>
                <select defaultValue="default" onChange={(e) => handleSelectGenre(e)}>Generos
                    <option value="default" disabled>Generos</option>
                    {
                        genres?.map(e => (
                            <option key={e} value={e}>{e}</option>
                        ))
                    }
                </select>    
            </div>

            <div className={style.autor}>
               <Link to='/author'><p>Autores</p></Link> 
            </div>

            <SearchBar/>

            <button className={style.button}>Login</button>
      
        </div>
    )
}

export default NavBar;
