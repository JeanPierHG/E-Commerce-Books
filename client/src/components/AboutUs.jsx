import React from 'react';
import { useState , useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { Link }  from 'react-router-dom';
import { animateScroll as scroll } from "react-scroll";
import style from '../Styles/aboutUs.module.css';

export default function AboutUs(){

    useEffect(() => {
        scroll.scrollToTop();
    }, []);

    return(

        <div className={style.container}>
            <span className={style.imageContainer}>
                <h5>Sobre Nosotros:</h5>
                <img className={style.image} src="https://i.pinimg.com/736x/e7/8f/07/e78f0726c66a0c00c460f9c0b83e4a24.jpg" alt="leyendo"/>
            </span>
            
            <h4>Tu nueva libreria de desarrollo personal</h4>
            <p>
                Somos la primer libreria dedicada a ofrecerte todos los libros de superación 
                productividad y crecimiento. Queremos brindarte los mejores titulos, para que tengas
                un gran abanico de eleccion de los libros que nos mueven y motivan a ser mejores lideres, mejores
                profesionales y mejores personas. 
            </p>
            <p>
                En LibrosPG11 vas a poder relacionarte con otros lectores, intercambiar opiniones, 
                dejar tus reseñas, puntuar libros, armar Listas personalizadas, y ser parte de 
                una gran Comunidad de apasionados por la lectura… ¡como nosotros!
            </p>
            <p>
                No te quedes afuera, la revolucion de los libros de crecimiento esta llegando.
            </p>
        </div>
    )
}