
import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {getBookTitle} from '../actions';
import styles from '../Styles/searchBar.module.css'
import {scroller} from "react-scroll";

const SearchBar = () => {

    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getBookTitle(input));
        navigate('/home/');
        scroller.scrollTo("gaston");
        setInput('');
    }

    return (
        <div className={styles.container}>

            <input type="text" placeholder='Título' value={input} onChange={(e) => handleChange(e)} className={styles.input}/>
            <button type='submit' onClick={(e) => handleSubmit(e)} className={styles.button}>Buscar</button>
      
        </div>
    )
}

export default SearchBar;
