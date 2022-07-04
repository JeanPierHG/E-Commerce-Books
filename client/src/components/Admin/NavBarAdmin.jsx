
import React, {useState} from 'react';
import SearchBar from '../SearchBar';
import style from '../../Styles/navAdmin.module.css';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { getBookGenre , getBooks } from '../../actions';
import {scroller} from "react-scroll";
import LogInButton from '../LogIn';
import LogOutButton from '../LogOut';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from 'react-redux';


const NavBarAdmin = () => {

    const [state, setState] = useState('default');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth0()
    const usuario = useSelector((state)=>state.userLogged)


   

   

    return (
    <div className={style.container}>
               
        { usuario.length === 1 && usuario[0].isSuperAdmin && usuario[0].isBanned===false
            ? 
                <Link to='/adminpro' className={style.Link}>
                    <button className={style.navItem}>AdminPro</button>
                </Link>
            :''
        }

        { usuario.length === 1 && usuario[0].isAdmin && usuario[0].isBanned===false
            ? 
                <Link to='/admin' className={style.Link}>
                    <button  className={style.navItem}>Administrador</button>
                </Link>
            :''
        }

    </div>

    )
}

export default NavBarAdmin;
