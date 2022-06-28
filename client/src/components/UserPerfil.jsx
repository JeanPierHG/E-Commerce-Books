
import React from 'react';
import {Link} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from 'react-redux';
import { postUser } from '../actions';
import { useSelector } from 'react-redux';

const UserPerfil = () => {

    const dispatch = useDispatch()

    const { user , isAuthenticated , isLoading } = useAuth0()

    const usuarios= useSelector( state => state.users)
    console.log('//usuarios:',usuarios)

    const usuario = usuarios.filter(u=>u.email === user.email)
    console.log('((((usu:',usuario)


    
    if(isLoading){
        return <div>Cargando...</div>
    }

    return (
        <div>
            <h4>Bienvenido</h4>

            <p>La gente exitosa tiene grandes bibliotecas. El resto tiene grandes pantallas de Television.</p>
            <p><strong>Jim Rohn</strong></p>

            {isAuthenticated && (
            <div>
                  {/* {JSON.stringify(user)}  */}

                <img src={user.picture} alt={user.name}/>
                <h2>{user.name}</h2>
                <p>Email: {user.email}</p>
            </div>
        )}
       

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





// export default function Profile(){

//     const{ user , isAuthenticated , isLoading} = useAuth0()

//     if(isLoading){
//         return <div>Cargando...</div>
//     }

//     return (
//         isAuthenticated && (
//             <div>
//                  {JSON.stringify(user)}

//                 {/* <img src={user.picture} alt={user.name}/>
//                 <h2>{user.name}</h2>
//                 <p>Email: {user.email}</p> */}
//             </div>
//         )
//     )
// }


// {"nickname":"guillermobr88",
// "name":"guillermobr88@gmail.com",
// "picture":"https://s.gravatar.com/avatar/13aa6d5b3b0c99cc535fed7a2abf7d87?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fgu.png",
// "updated_at":"2022-06-27T18:15:56.384Z",
// "email":"guillermobr88@gmail.com",
// "email_verified":true,
// "sub":"auth0|62b829304dd722e042fa9e14"}



