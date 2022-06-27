
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getBooks } from '../actions';
import styles from "../Styles/Home.module.css";

const OrderBooks = () => {

    const dispatch = useDispatch();
    const [order, setOrder] = useState("Asc");
    const [price, setPrice] = useState('');
    /* const [rating, setRating] = useState(""); */

    function handleSort(e) {
        setOrder(e.target.value);
        dispatch(getBooks(e.target.value));
        /* setCurrentPage(1); */
    }
    
    /* function handleRating(e) {
        setRating(e.target.value);
        dispatch(getBooks(order, e.target.value));
        setCurrentPage(1);
    } */
    
    function handlePrice(e) {
        setPrice(e.target.value);
        dispatch(getBooks(order, e.target.value));
        /* setCurrentPage(1); */
    }

    return (
        <div className={styles.ubiOptions}>
            <p className={styles.p}>Ordenar Por:
                
                <select className={styles.options} onChange={(e) => handleSort(e)} defaultValue="default">
                    <option value="default" disabled>
                        Orden alfabético
                    </option>
                    <option className={styles.options} value="Asc">
                        Nombre Ascendente
                    </option>
                    <option className={styles.options} value="desc">
                        Nombre Descendente
                    </option>
                </select>

                {/* <select onChange={(e) => handleRating(e)}>
                <option value="Asc">Higher Rating</option>
                <option value="desc">Lower Rating</option>
                </select> */}

                <select className={styles.options} onChange={(e) => handlePrice(e)} defaultValue="default">
                    <option value="default" disabled>
                        Orden por precio
                    </option>
                    <option className={styles.options} value="Asc">
                        Precio mas Bajo
                    </option>
                    <option className={styles.options} value="desc">
                        Precio mas Alto
                    </option>
                </select>
            </p>
        </div>
    )
}

export default OrderBooks;
