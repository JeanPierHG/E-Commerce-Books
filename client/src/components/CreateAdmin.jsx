import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToAdmin } from "../actions";
import { postUser } from "../actions";


export default function CreateAdmin(){

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const usuarios = useSelector( state => state.users )

    const usuario = useSelector ( state => state.userLogged )

    function handleClick(id){
        //console.log('id:',id)       
        dispatch(setToAdmin(id))
        alert('Nuevo Admin')
        navigate('/home')
        //dispatch(postUser(usuario))       
    }

    

    // function handleClickAdmin(id){
    //     e.preventDefault()
    //     dispatch(setToUser(id))
    //     alert('Nuevo Admin')
    // }

    return (
        <div>

            <div>Create Admin</div>

            <div>

                {usuarios.map(usuario =>{
                    return(
                        <li key={usuario._id}>{usuario.name} : {
                            <button onClick={()=>handleClick(usuario._id)}>{!usuario.isAdmin 
                            ?'USUARIO'
                            :'ADMINISTRADOR'}</button>
                        }</li>
                            
                            
                            
                    )
                })}

            </div>
            
          
        
    
    
    </div>
    
    )
    
}





