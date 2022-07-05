import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { postUser, getUsers, setToAdmin } from '../../../actions'
import { useSelector, useDispatch } from 'react-redux'
import AdminProSet from '../../AdminPro/Permisos/AdminProSet'
import AdminUserChangePlan from '../../Admin/AdminUserChangePlan'
import AdminUserBanned from '../../Admin/AdminUserBanned'
import AdminUserProfile from '../../Admin/AdminUserProfile'
import { Link } from 'react-router-dom'
import AdminSearchBarUser from '../../Admin/AdminSearchBarUser'
import AdminRefreshUsers from '../../Admin/AdminRefreshUser'
import AdminUserNewsLetter from '../../Admin/AdminUserNewsLetter'
import styles from '../../../Styles/AdminUser2.module.css'
import '.././adminUsers.css'

// import SetAdminUser from "./SetAdminUser";
// import BannAdminUser from "./BannUser";
// import ForcePasswordResetButton from "./ForcePSWreset";

// {id: userId, changes:{isAdmin:true}}

export default function AdminOrders(props) {
  const dispatch = useDispatch()

  const usuarios = useSelector((state) => state.users)

  const [seleccionados, setSeleccionados] = useState([])

  const [changed, setChanged] = useState(false)

  function selectUser(e) {
    var userId = e.target.value
    console.log('userId:', userId)

    if (!e.target.checked) {
      let seleccion = seleccionados.filter((usuario) => usuario._id !== userId)
      console.log('seleccion:', seleccion)
      setSeleccionados(seleccion)
    } else {
      let usuarioCheck = usuarios.find((usuario) => usuario._id === userId)
      console.log('usuarioCheck:', usuarioCheck)

      setSeleccionados([...seleccionados, usuarioCheck])
    }
  }

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  useEffect(() => {
    var checkeds = document.getElementsByClassName('checkbox')
    for (let i = 0; i < checkeds.length; i++) {
      checkeds[i].checked = false
    }
    setSeleccionados([])
    dispatch(getUsers())
  }, [changed])

  useEffect(() => {}, [usuarios])

  return usuarios.length > 0 ? (
    <div className={styles.containerAll}>
      <h1>Control de usuarios</h1>
      <div>
        <div id='tableleft'></div>
        <div className={styles.containerFlex}>
          <div className={styles.containerActions}>
            <AdminUserChangePlan
              users={seleccionados}
              changed={changed}
              setChanged={setChanged}
            />
            <AdminUserBanned
              users={seleccionados}
              changed={changed}
              setChanged={setChanged}
            />
            <AdminUserNewsLetter
              users={seleccionados}
              changed={changed}
              setChanged={setChanged}
            />
          </div>
          <div>
            <div className={styles.containerUser}>
              <AdminRefreshUsers />
              <AdminSearchBarUser />
            </div>
            <div class='container'>
              <table class='content-table'>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Usuario</th>

                    <th>Plan</th>
                    <th>Estado</th>
                    <th>NewsLetter</th>
                    <th>Administrador</th>
                    <th>check</th>
                  </tr>
                </thead>

                <tbody>
                  {usuarios.map((usuario) => (
                    <tr key={usuario.id}>
                      <td>
                        <Link to={`/adminuserprofile/${usuario._id}`}>
                          {usuario.email}
                        </Link>
                      </td>

                      <td>{usuario.name}</td>

                      <td>
                        {usuario.isPremiun === true ? 'Premium' : 'Standar'}
                      </td>

                      <td>{usuario.isBanned ? 'Bloqueado' : 'Activo'}</td>

                      <td>{usuario.isSubscribeNewsLetter ? 'Si' : 'No'}</td>

                      <td>{usuario.isAdmin ? 'Si' : 'No'}</td>
                      <td>
                        <input
                          className='checkbox'
                          type='checkbox'
                          value={usuario._id}
                          onChange={(e) => selectUser(e)}
                          defaultChecked={false}
                        ></input>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  )
}















// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link, NavLink } from "react-router-dom";
// import { getAllOrders } from "../../../actions";





// function AdminOrders() {
  
//   // const dispatch = useDispatch();
//   // const [orderView, setOrderView] = useState([]);
//   // const [status, setStatus] = useState("");

//   const orders = useSelector((state) => state.orders);

//   useEffect(() => {
//     dispatch(getAllOrders());
//   }, []);
//   // useEffect(() => {
//   //   setOrderView(orders);
//   // }, [orders]);
  
//   // const handleStatus = (e) => {
//   //   setStatus(e.target.value);
//   //   setCurrentPage(1)
//   // };
//   // useEffect(() => {
//   //   status.length>0&&setOrderView(orders.filter((e) => e.status === status));
//   // }, [status]);

//  //-------------------------Paginado de Tablas------------------//
// //  const [currentPage, setCurrentPage] = useState(1);
// //  const [rows, setRows] = useState(10); //modificamos esto si queremos mostrar mas filas
// //  const [pageNumberLimit, setPageNumberLimit] = useState(5);
// //  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
// //  const [minPageNumberLmit, setMinPageNumberLmit] = useState(0);
// //  const handleClick = (event) => {
// //    setCurrentPage(Number(event.target.id));
// //  };
// //  const handleNextbtn = () => {
// //    setCurrentPage(currentPage + 1);
// //    if (currentPage + 1 > maxPageNumberLimit) {
// //      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
// //      setMinPageNumberLmit(minPageNumberLmit + pageNumberLimit);
// //    }
// //  };
// //  const handlePrevbtn = () => {
// //    setCurrentPage(currentPage - 1);
// //    if ((currentPage - 1) % pageNumberLimit === 0) {
// //      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
// //      setMinPageNumberLmit(minPageNumberLmit - pageNumberLimit);
// //    }
// //  };

// //  const pages = [];
// //  for (let i = 1; i <= Math.ceil(orderView.length / rows); i++) {
// //    pages.push(i);
// //  }
// //  const indexOfLastItem = currentPage * rows;
// //  const indexOfFirstItem = indexOfLastItem - rows;
// //  const currentItems = orderView.slice(indexOfFirstItem, indexOfLastItem);
// //  const renderPageNumbers = pages.map((number) => {
// //    if (number < maxPageNumberLimit + 1 && number > minPageNumberLmit) {
// //      return (
// //        <li
// //          key={number}
// //          id={number}
// //          onClick={e=>handleClick(e)}
// //          className={currentPage === number ? "activo" : null}
// //        >
// //          {number}
// //        </li>
// //      );
// //    } else {
// //      return null;
// //    }
// //  });
//  //-------------------------------------------------------------------------

//   return (
//     <div>
//       <div>
//         <br />
//         {/* <nav className="navbar justify-content-start mx-3" aria-label="breadcrumb">
//                 <ol class="breadcrumb">
//                     <li class="breadcrumb-item"><a href={ROUTES.ADMIN}>Admin</a></li>
//                     <li class="breadcrumb-item active" aria-current="page">Order</li>
//                 </ol>
//             </nav> */}
//         <br />
//         <div >
//           <div >
//             <h3 > Estados</h3>
//             <div id="buttoncategory">
//               <button
//                 id="buttonorder"
//                 onClick={(e) => handleStatus(e)}
//                 value={"shipped"}
//               >
//                 Enviada
//               </button>
//             </div>
//             <div id="buttoncategory">
//               <button
//                 id="buttonorder"
//                 onClick={(e) => handleStatus(e)}
//                 value={"cart"}
//               >
//                 Carrito
//               </button>
//             </div>
//             <div id="buttoncategory" >
//               <button
//                 id="buttonorder"
//                 onClick={(e) => handleStatus(e)}
//                 value={"checkout"}
//               >
//                 Checkout
//               </button>
//             </div>
//             <div id="buttoncategory" >
//               <button
//                 id="buttonorder"
//                 onClick={(e) => handleStatus(e)}
//                 value={"cancelled"}
//               >
//                 Canceladas
//               </button>
//             </div>
//             <div id="buttoncategory" >
//               <button
//                 id="buttonorder"
//                 onClick={(e) => handleStatus(e)}
//                 value={"delivered"}
//               >
//                 Entregadas
//               </button>
//             </div>
//             <div id="buttoncategory" >
//               <button
//                 id="buttonorder"
//                 onClick={(e) => handleStatus(e)}
//                 value={"approved"}
//               >
//                 Aprobadas
//               </button>
//             </div>
//             <div id="buttoncategory" >
//               <button
//                 id="buttonorder"
//                 onClick={(e) => handleStatus(e)}
//                 value={"rejected"}
//               >
//                 Rechazadas
//               </button>
//             </div>
//           </div>
//           <div>
//             {orderView && orderView.length > 0 ? (
//               <table id="tableright">
//                 <h3 >Ordenes de los usuarios</h3>
//                 <thead >
//                   <tr>
//                     <th>Orden ID</th>
//                     <th>Usuario nombre</th>
//                     <th>Usuario Email</th>
//                     <th>Precio Total</th>
//                     <th>Estado</th>
//                     <th>Fecha de Pedido</th>
//                     <th># Productos</th>
//                     <th>detalle</th>
//                   </tr>
//                 </thead>
//                 {currentItems.length>0&&currentItems.map((e) => (
//                   <tbody>
//                     <tr>
//                       <td>{e.id}</td>
//                       <td>{e.user?.user_name}</td>
//                       <td>{e.user?.email}</td>
//                       <td>{e.total_price}</td>
//                       <td>{e.status}</td>
//                       <td>{e.date}</td>
//                       <td>{e.products.length}</td>
//                       <NavLink to={`/admin/orders/${e.id}`}>
//                         <td >detalles</td>
//                       </NavLink>
//                     </tr>
//                   </tbody>
//                 ))}
//               </table>
//             ) : null}
//           </div>
//         </div>
//         <br />

//         {
//           <ul >
//             <li>
//               <button
//                 onClick={handlePrevbtn}
//                 disabled={currentPage === pages[0] ? true : false}
//               >
//                 prev
//               </button>
//             </li>
//             {renderPageNumbers}
//             <li>
//               <button
//                 onClick={handleNextbtn}
//                 disabled={
//                   currentPage === pages[pages.length - 1] ? true : false
//                 }
//               >
//                 next
//               </button>
//             </li>
//           </ul>
//         }
//       </div>
//     </div>
//   )
// }

// export default AdminOrders;