
import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getUsers, postUserData, setUserPlan} from '../actions';
import UserDatosPerfil from './UserDatosPerfil';

const UserDatos = () => {

    const allUsers = useSelector(state => state.users);
    const logged = useSelector(state => state.userLogged);
    const userId = allUsers.filter((u) => u._id === logged[0]._id);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState('');
    const [input, setInput] = useState({
        name: '',
        surname: '',
        birthday: '',
        country: '',
        dni: '',
        phone: '', 
        address: '',
    });

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = logged[0]._id;
        dispatch(postUserData(id, input));
        alert('Datos personales actualizado');
        navigate('/user');
    }

    const handleClick = () => {
        setState('ok');
    }
    
    const handlePlanDelete = () => {
        const id = [logged[0]._id];      
        dispatch(setUserPlan(id));
        alert('Desuscripción a "Soy Premium" con éxito');
        navigate('/user');
    }

    useEffect(() => {
        return () => {
            dispatch(getUsers());
        };
    }, [dispatch]);

    return (
        <div>
            <Link to='/user'><p>Volver</p></Link>
            <form onSubmit={(e) => handleSubmit(e)}>
                <fieldset>
                    <legend>Datos personales</legend>

                    <label htmlFor="nickname">Usuario</label>
                    <input type="text" name='nickname' value={userId[0].nickname} readOnly/>

                    <label htmlFor="email">Email</label>
                    <input type="text" name='email' value={userId[0].email} readOnly/>

                    <label htmlFor="name">Nombre</label>
                    <input type="text" name='name' onChange={(e) => handleChange(e)} value={input.name}/>

                    <label htmlFor="surname">Apellido</label>
                    <input type="text" name='surname' onChange={(e) => handleChange(e)} value={input.surname}/>

                    <label htmlFor="birthday">Fecha de Nacimiento</label>
                    <input type="date" name='birthday'onChange={(e) => handleChange(e)} value={input.birthday}/>

                    <label htmlFor="country">Nacionalidad</label>
                    <input type="text" name='country' onChange={(e) => handleChange(e)} value={input.country}/>

                    <label htmlFor="dni">Nº de Documento</label>
                    <input type="text" name='dni' onChange={(e) => handleChange(e)} value={input.dni}/>

                    <label htmlFor="phone">Tel</label>
                    <input type="text" name='phone' onChange={(e) => handleChange(e)} value={input.phone}/>

                    <label htmlFor="address">Direccion</label>
                    <input type="text" name='address' onChange={(e) => handleChange(e)} value={input.address}/>

                    <button type='submit'>Actualizar</button>
                </fieldset>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>NewsLetter</th>
                        <th>Soy Premium</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        userId?.map(u => (
                            <tr key={u._id}>

                                <td>{u.name}</td>

                                <td>
                                    {
                                        u.isAdmin
                                        ?'Si'
                                        :'No' 
                                    }
                                </td>

                                <td>
                                    {
                                        u.isPremiun
                                        ?'Si'
                                        :'No' 
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {
                <button>Baja al NewsLetter</button>
            }

            {
                userId[0].isPremiun === false ?
                <button disabled>Baja a Soy Premium</button> :
                <button onClick={handlePlanDelete}>Baja a Soy Premium</button> 
            }
            

            <br />
            <button onClick={handleClick}>Ver mis datos</button>

            {
                state==='ok'?
                <UserDatosPerfil 
                    name={userId[0].name}
                    surname={userId[0].surname}
                    email={userId[0].email}
                    dni={userId[0].dni}
                    nickname={userId[0].nickname}
                    birthday={userId[0].birthday}
                    country={userId[0].country}
                    phone={userId[0].phone}
                    address={userId[0].address}
                 />: <p>El camino al exito está en la lectura de libros inspiradores. 'Luis Chacon'</p>
            }
           
        </div>
    )
}

export default UserDatos;
