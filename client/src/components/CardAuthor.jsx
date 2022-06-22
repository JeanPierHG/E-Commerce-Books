
import React from 'react';
import style from '../Styles/cardAuthor.module.css';

const CardAuthor = ({name, surname, picture}) => {

    return (
        <div className={style.container}>
            <span>{name} </span>
            <span>{surname}</span>
            <div className={style.imageContainer}>
                <img className={style.image} src={picture} alt="buscando img"/>
            </div>
        </div>
    )
}

export default CardAuthor;
