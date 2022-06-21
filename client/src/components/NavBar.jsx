
import React from 'react';
import SearchBar from './SearchBar';
import style from '../Styles/nav.module.css';

const NavBar = () => {

    const genres = ['Salud', 'Deportes', 'Biografia', 'Nutricion', 'Filosofia', 'Ensayo', 'Desarrollo Personal',
    'Economia', 'Espiritualidad', 'Historia', 'Negocios', 'Psicologia', 'Neurociencia'];

    return (
        <div className={style.container}>
            
            <h3 className={style.logo}>PG-11 Books</h3>

            <p className={style.inicio}>Inicio</p>

            <div className={style.select}>
                <select defaultValue="default">Generos
                    <option value="default" disabled>Generos</option>
                    {
                        genres?.map(e => (
                            <option key={e} value={e}>{e}</option>
                        ))
                    }
                </select>    
            </div>

            <div className={style.autor}>
                <p>Autores</p>
            </div>

            <SearchBar/>

            <button className={style.button}>Login</button>
      
        </div>
    )
}

export default NavBar;
