import React, { useState, useEffect } from 'react'
import { getUsers, getAllOrders } from '../../../actions'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import AdminSearchBarUserOrders from '../SearchBars/AdminSearchBarUserOrders'
import AdminRefreshUsers from '../RefreshButtons/AdminRefreshUser'
import AdminRefreshOrders from '../RefreshButtons/AdminRefreshOrders'
import AdminOrderStatus from './ManejoDeEstados/AdminOrderStatus'
import styles from '../../../Styles/AdminUser2.module.css'


// import SetAdminUser from "./SetAdminUser";
// import BannAdminUser from "./BannUser";
// import ForcePasswordResetButton from "./ForcePSWreset";

// {id: userId, changes:{isAdmin:true}}

export default function AdminOrders(props) {
  const dispatch = useDispatch()

  const usuarios = useSelector((state) => state.users)
  const orders = useSelector(state=>state.orders)
  

  const [seleccionados, setSeleccionados] = useState([])

  const [changed, setChanged] = useState(false)

  function selectOrder(e) {
    var orderId = e.target.value
   

    if (!e.target.checked) {
      let seleccion = seleccionados.filter((order) => order._id !== orderId)
      
      setSeleccionados(seleccion)
    } else {
      let orderCheck = orders.find((order) => order._id === orderId)
      

      setSeleccionados([...seleccionados, orderCheck])
    }
  }

  useEffect(() => {
    dispatch(getAllOrders())
  }, [])

  useEffect(() => {
    var checkeds = document.getElementsByClassName('checkbox')
    for (let i = 0; i < checkeds.length; i++) {
      checkeds[i].checked = false
    }
    setSeleccionados([])
    dispatch(getAllOrders())
  }, [changed])

  useEffect(() => {}, [orders])

  return orders.length > 0 ? (
    <div className={styles.containerAll}>
      <h1>Control de Ordenes</h1>
      <div>
        <div id='tableleft'></div>
        <div className={styles.containerFlex}>
          <div className={styles.containerActions}>
          
            <AdminOrderStatus
              orders={seleccionados}
              changed={changed}
              setChanged={setChanged}
            />
          </div>
          <div>
            <div className={styles.containerUser}>
              <AdminRefreshOrders />
              <AdminSearchBarUserOrders />
              
            </div>
            <div class='container'>
              <table class='content-table'>
                <thead>
                  <tr>
                    <th>Nº Orden</th>
                    <th>Usuario</th>

                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Producto</th>
                    <th>Estado de Orden</th>
                   
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>
                        <Link to={`/adminorderdetails/${order._id}`}>
                          {order._id}
                        </Link>
                      </td>

                      <td> <Link to={`/adminuserprofile/${order.usuario[0]._id}`}>
                          {order.usuario[0].email}
                        </Link></td>

                      <td>
                        {order.fecha}
                      </td>

                      <td>
                        {order.total}
                      </td>

                      <td>{order.status}</td>

                    
                      <td>
                        <input
                          className='checkbox'
                          type='checkbox'
                          value={order._id}
                          onChange={(e) => selectOrder(e)}
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
    <p>No se encontro el dato</p>
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