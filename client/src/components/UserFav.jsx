
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {deleteBookFav} from '../actions';
import style from '../Styles/userFav.module.css';

const UserFav = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allUsers = useSelector(state => state.users);
    const users = useSelector(state => state.userLogged);
    const userId = allUsers.filter((u) => u._id === users[0]._id);
    console.log('soi id user', userId);

    const handleDeleteFav = (book) => {
        const id = users[0]._id;
        dispatch(deleteBookFav(book, id));
        alert('Libro Favorito Eliminado');
        //navigate('/user');
    }

    return (
        <div>
            <Link to='/user'><p>Volver</p></Link>

            <h3>Mis libros favoritos:</h3>

            <ol>
                {
                    userId[0].favouritesBooks?.map(e => (
                        
                        <li>
                            {e.title}
                            <Link to={'/book/' + e._id}>
                                <img className={style.container} src={e.cover} alt="buscando" />
                            </Link>
                            <button onClick={() => handleDeleteFav(e._id)}>X</button>
                        </li>  
                    ))
                }
            </ol>
            <br />
        </div>
    )
}

export default UserFav;
