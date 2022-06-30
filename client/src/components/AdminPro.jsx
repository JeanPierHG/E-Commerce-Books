import React from "react";
import CreateAdmin from "./CreateAdmin";
import { useSelector } from "react-redux";


export default function AdminPro(){

    //const usuarios = useSelector( state => state.users)
   // console.log('//AdminProU',usuarios)

    return(
        <div>

        <h5>AdminPro</h5>

            <CreateAdmin/>
            

        </div>
    )
}