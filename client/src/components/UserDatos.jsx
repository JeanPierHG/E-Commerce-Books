
import React from 'react';
import {Link} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const UserDatos = () => {

    const {user} = useAuth0();

    return (
        <div>
            <Link to='/user'><p>Volver</p></Link>
            <form>
                <fieldset>
                    <legend>Datos personales</legend>

                    <label htmlFor="nickname">Usuario</label>
                    <input type="text" id='nickname' value={user.nickname}/>

                    <label htmlFor="email">Email</label>
                    <input type="text" id='email' value={user.email}/>

                    <label htmlFor="name">Nombre</label>
                    <input type="text" id='name'/>

                    <label htmlFor="lastName">Apellido</label>
                    <input type="text" id='lastName'/>

                    <label htmlFor="age">Años</label>
                    <input type="number" id='age'/>

                    <label htmlFor="country">Nacionalidad</label>
                    <input type="text" id='country'/>

                    <button>Actualizar</button>
                </fieldset>

                <fieldset>
                    <legend>Suscripciones</legend>

                    <h4>Al Newsletter</h4>

                    <label htmlFor="news">SI</label>
                    <input type="radio" name="news" value='Si' />

                    <label htmlFor="news">NO</label>
                    <input type="radio" name="news" value='No' checked/>

                    <h4>Soy premium</h4>

                    <label htmlFor="premium">SI</label>
                    <input type="radio" name="premium" value='Si' />

                    <label htmlFor="premium">NO</label>
                    <input type="radio" name="premium" value='No' checked/>
                </fieldset>

            </form>
        </div>
    )
}

export default UserDatos;
