
import React, {useState} from 'react';
import style from '../Styles/userNavBar.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from 'react-redux';


const UserNavBar = () => {


    const { isAuthenticated } = useAuth0()
    const usuario = useSelector((state)=>state.userLogged)
    console.log('//uuuu//:',usuario)


   

   

    return (
    <div className={style.container}>
        {usuario[0].name?
               
       <h3 className={style.titulo}>Bienvenido {usuario[0].name}</h3>
        
       :<h3 className={style.titulo}>Bienvenido {usuario[0].nickname}</h3>

        }
    </div>

    )
}

export default UserNavBar;
