import "./App.css";
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { getBooks, getAuthors , getUsers } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import FAQ from "./components/FAQ";
import Landing from "./components/Landing";
import Author from "./components/Author";
import BookDetails from "./components/BookDetails";
import AuthorDetails from "./components/AuthorDetails";
import Add from "./components/Add";
import AddBook from "./components/AddBook";
import AddAuthor from "./components/AddAuthor";
import BottomBar from "./components/BottomBar";
import { Admin } from "./components/Admin";
import UserPerfil from "./components/UserPerfil";
import DeleteData from "./components/DeleteData";
import Put from "./components/Put";
import PutAuthor from "./components/PutAuthor";
import PutBook from "./components/PutBook";
import PutAuthorID from "./components/PutAuthorID";
import PutBookID from "./components/PutBookID";
import ProtectedRoute from "./components/ProtectedRoute";
import Stock from "./components/Stock";
import LogInButton from "./components/LogIn";
import LogOutButton from "./components/LogOut";
import { useAuth0 } from "@auth0/auth0-react";
import DeleteAuthor from "./components/DeleteAuthor";
import DeleteBook from "./components/DeleteBook";
import AdminPro from "./components/AdminPro";
import UserDatos from "./components/UserDatos";
import UserSuscripcion from "./components/UserSuscripcion";
import ShoopingCart from "./components/ShoppingCart";
import AdminUsers from "./components/AdminUsers";
import AdminOrders from "./components/AdminOrders";
import AdminCarousel from "./components/AdminCarousel";
import NavBarAdmin from "./components/NavBarAdmin";
//import StockTable from "./components/StockTable";
import UserFav from "./components/UserFav";




function App() {
  const dispatch = useDispatch();

  //const{ user, isAuthenticated , isLoading} = useAuth0()
  
  
  // const usuario = usuarios.filter(u=>u.email === user.email)


  // const [users, setUsers] = useState(null);

  // const handleLoginAdmin = () =>
  //   setUsers({
  //     id: "1",
  //     name: "guille",
  //     roles: ["admin"],
  //   });

  // const handleLogoutAdmin = () => setUsers(null);

  // const handleLoginUser = () =>
  //   setUsers({
  //     id: "1",
  //     name: "guille",
  //     roles: ["user"],
  //   });
  // const handleLogoutUser = () => setUsers(null);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAuthors());
  }, [dispatch]);


  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);


  const usuario = useSelector( state => state.userLogged);


  return (
    <BrowserRouter>
      <NavBar />
      { usuario.length === 1 && usuario[0].isAdmin
      ? 
      <NavBarAdmin/>
    :''} 
      
      <div className="main-without-nav">
        {/* {users ? (
          <button onClick={handleLogoutAdmin}>Sign Out Admin</button>
        ) : (
          <button onClick={handleLoginAdmin}>Sign In Admin</button>
        )}

        {users ? (
          <button onClick={handleLogoutUser}>Sign Out User</button>
        ) : (
          <button onClick={handleLoginUser}>Sign In User</button>
        )} */}
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="home" element={<Home />} />
          <Route exact path="/aboutus" element={<AboutUs />} />
          <Route exact path="/faq" element={<FAQ />} />
          <Route exact path="/author" element={<Author />} />
          <Route exact path="/book/:id" element={<BookDetails />} />
          <Route exact path="/author/:id" element={<AuthorDetails />} />
          

          <Route element={<ProtectedRoute isAllowed={usuario.length===1} />}>
            <Route path="/cart" element={<ShoopingCart />} />
          </Route>

          <Route element={<ProtectedRoute isAllowed={usuario.length===1} />}>
            <Route path="/user" element={<UserPerfil />} />
          </Route> 

          <Route element={<ProtectedRoute isAllowed={usuario.length===1} />}>
            <Route path="/user/datos" element={<UserDatos />} />
          </Route>

          <Route element={<ProtectedRoute isAllowed={usuario.length===1} />}>
            <Route path="/user/suscripcion" element={<UserSuscripcion />} />
          </Route>

          <Route element={<ProtectedRoute isAllowed={usuario.length===1} />}>
            <Route path="/user/deseados" element={<UserFav />} />
          </Route>

          <Route
            path="/admin"
            element={
              <ProtectedRoute
                redirectPath="/home"
                isAllowed={usuario.length===1 && usuario[0].isAdmin===true && usuario[0].isSuperAdmin === true}
              >
                <Admin />
              </ProtectedRoute>
            }
          />
         

            <Route
            path="/adminpro"
            element={
              <ProtectedRoute
                redirectPath="/home"
                isAllowed={usuario.length===1  && usuario[0].isSuperAdmin === true}
              >
                <AdminPro />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add"
            element={
              <ProtectedRoute
                redirectPath="/home"
                isAllowed={usuario.length===1 && usuario[0].isAdmin===true}
              >
                <Add />
              </ProtectedRoute>
            }
          />

          <Route
            path="/addauthor"
            element={
              <ProtectedRoute
                redirectPath="/home"
                isAllowed={usuario.length===1 && usuario[0].isAdmin===true}
              >
                <AddAuthor />
              </ProtectedRoute>
            }
          />

          <Route
          path="/addbook"
          element={
            <ProtectedRoute
              redirectPath="/home"
              isAllowed={usuario.length===1 && usuario[0].isAdmin===true}
            >
              <AddBook />
            </ProtectedRoute>
          }
        />

          <Route
            path="/delete"
            element={
              <ProtectedRoute
                redirectPath="/home"
                isAllowed={usuario.length===1 && usuario[0].isAdmin===true}
              >
                <DeleteData />
              </ProtectedRoute>
            }
          />

            <Route
            path="/deleteauthor"
            element={
              <ProtectedRoute
                redirectPath="/home"
                isAllowed={usuario.length===1 && usuario[0].isAdmin===true}
              >
                <DeleteAuthor />
              </ProtectedRoute>
            }
          />

            <Route
            path="/deletebook"
            element={
              <ProtectedRoute
                redirectPath="/home"
                isAllowed={usuario.length===1 && usuario[0].isAdmin===true}
              >
                <DeleteBook />
              </ProtectedRoute>
            }
          />

          <Route
            path="/put"
            element={
              <ProtectedRoute
                redirectPath="/home"
                isAllowed={usuario.length===1 && usuario[0].isAdmin===true}
              >
                <Put />
              </ProtectedRoute>
            }
          />

          <Route
            path="/putbook"
            element={
              <ProtectedRoute
                redirectPath="/home"
                isAllowed={usuario.length===1 && usuario[0].isAdmin===true}
              >
                <PutBook />
              </ProtectedRoute>
            }
          />

          <Route
            path="/putauthor"
            element={
              <ProtectedRoute
                redirectPath="/home"
                isAllowed={usuario.length===1 && usuario[0].isAdmin===true}
              >
                <PutAuthor />
              </ProtectedRoute>
            }
          />

          <Route
            path="/putAuthorID/:id"
            element={
              <ProtectedRoute
                redirectPath="/home"
                isAllowed={usuario.length===1 && usuario[0].isAdmin===true}
              >
                <PutAuthorID />
              </ProtectedRoute>
            }
          />

          <Route
            path="/putBookID/:id"
            element={
              <ProtectedRoute
                redirectPath="/home"
                isAllowed={usuario.length===1 && usuario[0].isAdmin===true}
              >
                <PutBookID />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/stock"
            element={
              <ProtectedRoute
                redirectPath="/home"
                isAllowed={usuario.length===1 && usuario[0].isAdmin===true}
              >
                <Stock />
              </ProtectedRoute>
            }
          />

            {/* <Route
            path="/stocktable"
            element={
              <ProtectedRoute
                redirectPath="/home"
                isAllowed={usuario.length===1 && usuario[0].isAdmin===true}
              >
                <StockTable />
              </ProtectedRoute>
            }
          /> */}


            <Route
            path="/adminorders"
            element={
              <ProtectedRoute
                redirectPath="/home"
                // isAllowed={!!users && users.roles.includes("admin")}
                isAllowed={usuario.length===1 && usuario[0].isAdmin===true}
              >
                <AdminOrders />
              </ProtectedRoute>
            }
          />

            <Route
            path="/adminusers"
            element={
              <ProtectedRoute
                redirectPath="/home"
                // isAllowed={!!users && users.roles.includes("admin")}
                isAllowed={usuario.length===1 && usuario[0].isAdmin===true}
              >
                <AdminUsers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admincarrusel"
            element={
              <ProtectedRoute
                redirectPath="/home"
                // isAllowed={!!users && users.roles.includes("admin")}
                isAllowed={usuario.length===1 && usuario[0].isAdmin===true}
              >
                <AdminCarousel />
              </ProtectedRoute>
            }
          />

          
          {/* <Route
            path="/user/suscripcion"
            element={
              <ProtectedRoute
                redirectPath="/home"
                isAuthenticated={usuario.length===1}
              >
                <UserSuscripcion />
              </ProtectedRoute>
            }
          /> */}
          
        </Routes>
      </div>
      <BottomBar />
    </BrowserRouter>
  );
}

export default App;
