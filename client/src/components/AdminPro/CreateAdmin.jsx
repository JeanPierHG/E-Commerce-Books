
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AdminProSet from "./AdminProSet";
import { getUsers , postUser , setToAdmin } from "../../actions";
import {Link} from 'react-router-dom';
import SuperAdminProSet from "./SuperAdminProSet";
import AdminSearchBarUser from "../Admin/AdminSearchBarUser";
import AdminRefreshUsers from "../Admin/AdminRefreshUser";
import styles from "../../Styles/createAdmin.module.css"
import "./createAdminTest.css"


// {id: userId, changes:{isAdmin:true}}



export default function CreateAdmin(props) {

  const dispatch = useDispatch(); 
  
  const usuarios = useSelector((state) => state.users);

  const [seleccionados, setSeleccionados] = useState([]);

  const [changed, setChanged] = useState(false);

 
  
  function selectUser(e) {
    var userId = e.target.value;
    console.log('userId:',userId)
   
    if (!e.target.checked) 
    {
       let seleccion = seleccionados.filter(usuario => usuario._id !== userId);
       console.log('seleccion:',seleccion)
      setSeleccionados(seleccion);
    } else {
    
    
    let usuarioCheck = usuarios.find(usuario => usuario._id === userId);
    console.log('usuarioCheck:',usuarioCheck)

      setSeleccionados([...seleccionados, usuarioCheck]);
      }
    
}
  
useEffect(() => {
  dispatch(getUsers());
}, []);


  useEffect(() => {
    var checkeds = document.getElementsByClassName("checkbox");
    for (let i = 0; i < checkeds.length; i++) {
      checkeds[i].checked = false;
    }
    setSeleccionados([]);
    dispatch(getUsers());
  }, [changed]);

  useEffect(() => {}, [usuarios]);

  return usuarios.length > 0 ? (
    <div >
      <h1 >Control de usuarios</h1>
      <div >

        <div id="tableleft">
          <div>
            <AdminRefreshUsers/>
            <AdminSearchBarUser/>
            <AdminProSet
              users={seleccionados}
              changed={changed}
              setChanged={setChanged}
            />
          </div> 

          <div>
            <SuperAdminProSet
              users={seleccionados}
              changed={changed}
              setChanged={setChanged}
            />
          </div> 
       </div>
      <div class='container'>
        <table class="content-table">
          <thead >
            <tr >
              <th >Email</th>
              <th >Usuario</th>
             
              <th >Administrador</th>
              <th >Pro</th>
              <th >check</th>
            </tr>
          </thead>

          <tbody >
            {usuarios.map((usuario) => (
             
             <tr  key={usuario._id}>
                <td >
                  <Link to={`/adminuserprofile/${usuario._id}`}>{usuario.email}</Link>
                </td>
                <td >{usuario.name}</td>         
                <td>{usuario.isAdmin ? "Si" : "No"}</td>
                <td >{usuario.isSuperAdmin ? "Si" : "No"}</td>
                <td class='active' >
                  {usuario.isSuperAdmin != "isSuperAdmin"?
                  <input 
                  className="checkbox"
                    type="checkbox"
                    value={usuario._id}
                    onChange={(e) => selectUser(e)}
                    defaultChecked={false}
                  ></input> : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
}




