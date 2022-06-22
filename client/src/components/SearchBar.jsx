
import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {getBookTitle} from '../actions';

const SearchBar = () => {

    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getBookTitle(input));
    }

    return (
        <div>

            <input type="text" placeholder='Título' onChange={(e) => handleChange(e)}/>
            <button type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button>
      
        </div>
    )
}

export default SearchBar;
