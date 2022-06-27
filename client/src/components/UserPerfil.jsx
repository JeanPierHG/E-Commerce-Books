
import React from 'react';
import {Link} from 'react-router-dom';

const UserPerfil = () => {

    return (
        <div>
            <h4>Bienvenido</h4>

            <p>La gente exitosa tiene grandes bibliotecas. El resto tiene grandes pantallas de Television.</p>
            <p><strong>Jim Rohn</strong></p>

            <span>
                <Link to='/user/datos'>
                    <h5>Mis datos personales</h5>
                </Link>

                <Link to='/user/suscripcion'>
                    <h5>Mi plan de suscripcion</h5>
                </Link>
                
                <Link to='/user/lectura'>
                    <h5>Mi plan de lectura</h5>
                </Link>

                <Link to='/user/compras'>
                    <h5>Mis compras</h5>
                </Link>

                <Link to='/user/deseados'>
                    <h5>Mis libros deseados</h5>
                </Link>
            </span>
        </div>
    )
}

export default UserPerfil;
