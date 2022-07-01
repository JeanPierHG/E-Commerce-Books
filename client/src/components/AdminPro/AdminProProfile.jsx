
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getUsers , postUserData } from '../../actions';


export function AdminProProfile(){

    const allUsers = useSelector(state => state.users);
    const adminPro= allUsers.filter(usuario=> usuario.isSuperAdmin === true)
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
        const id = adminPro[0]._id;
        dispatch(postUserData(id, input));
        alert('Datos personales actualizado');
        navigate('/adminpro');
        dispatch(getUsers())
    }

    const handleClick = () => {
        setState('ok');
    }

    useEffect(() => {
        return () => {
            dispatch(getUsers());
        };
    }, [dispatch]);
 
   
    return (
        <div>
            <Link to='/adminpro'><p>Volver</p></Link>

            <form onSubmit={(e) => handleSubmit(e)}>
                <fieldset>
                    <legend>Datos personales</legend>

                    <label htmlFor="nickname">Usuario</label>
                    <input type="text" name='nickname' value={adminPro[0].nickname} readOnly/>

                    <label htmlFor="email">Email</label>
                    <input type="text" name='email' value={adminPro[0].email} readOnly/>

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

            

            <div>
                <h4>Mi perfil</h4>
                <p>Nombre: {adminPro[0].name}</p>
                <p>Apellido: {adminPro[0].surname}</p>
                <p>Email: {adminPro[0].email}</p>
                <p>Usuario: {adminPro[0].nickname}</p>
                <p>DNI: {adminPro[0].dni}</p>
                <p>País: {adminPro[0].country}</p>
                <p>Tel: {adminPro[0].phone}</p>
                <p>Dirección: {adminPro[0].address}</p>
                <p>Fecha de nacimiento: {adminPro[0].birthday}</p>
            </div>
        </div>
    )
}


 

   
 

   

   