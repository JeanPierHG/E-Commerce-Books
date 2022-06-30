
import React from 'react';
import style from '../Styles/cardPremium.module.css';

const CardPremium = () => {

    return (
        <div className={style.container}>
            <h3>Plan: Soy Premium</h3>

            <p>Herramientas para empezar a potencial tu desarrollo al máximo</p>

            <h1>Ars 399/mes</h1>

            <li>Envio de podcast de interes</li>
            <li>Envio de notas de tu interes</li>
            <li>Opiniones de las ultimas herramientas de productividad</li>
            <li>Reseñas de textos selecionadas</li>
            <li>Resumen de tus libros favoritos</li>

            <button>Lo quiero</button>
        
        </div>
    )
}

export default CardPremium;
