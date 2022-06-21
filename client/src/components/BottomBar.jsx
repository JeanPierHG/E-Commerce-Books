import React from 'react';
import { useState , useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { Link }  from 'react-router-dom';


export default function BottomBar(){

const instagram = 'https://img.icons8.com/nolan/64/instagram-new.png'
    return (

        <div >
            <div className='box' >
                <Link to='/aboutus'>
                    <h5 >About us</h5>
                </Link>

                <Link to='/faq'>
                    <h5>FAQ's</h5>
                </Link>
                <h5>Medios de Pago:</h5>
                <img src='https://play-lh.googleusercontent.com/4hN-UTy-2_Ma1Ouye5FpN2Issj73Oms62hokLp5OZR6zdt2yzkEpGSpK0v47RK8Oc8Q' width='50px'></img>
                <h5>Redes Sociales:</h5>
                <li><a href='https://www.instagram.com/'><img src='https://www.actualidadiphone.com/wp-content/uploads/2016/05/Captura-de-pantalla-2016-05-11-a-las-16.36.33.png' width={80}></img></a></li>
                <li><a href='https://es-la.facebook.com/'><img src='https://www.kindpng.com/picc/m/243-2433115_computer-icons-facebook-messenger-facebook-icon-hd-png.png' width={30}></img></a></li>
                <h5>NewsLetter</h5>
                <h5>Dirección: Av Belgrano 444, Mendoza, Argentina</h5>
            </div>
        </div>

    )
}