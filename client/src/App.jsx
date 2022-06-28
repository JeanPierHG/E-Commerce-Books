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
import Shop from "./components/Shop";
import Stock from "./components/Stock";
import LogInButton from "./components/LogIn";
import LogOutButton from "./components/LogOut";
import { useAuth0 } from "@auth0/auth0-react";
import DeleteAuthor from "./components/DeleteAuthor";
import DeleteBook from "./components/DeleteBook";



function App() {
  const dispatch = useDispatch();
  const{ user, isAuthenticated , isLoading} = useAuth0()


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


  return (
    <BrowserRouter>
      <NavBar />
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

          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/shop" element={<Shop />} />
          </Route>

          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/user" element={<UserPerfil />} />
          </Route>

          <Route
            path="/admin"
            element={
              <ProtectedRoute
                redirectPath="/home"
                // isAllowed={!!users && users.roles.includes("admin")}
                isAuthenticated={isAuthenticated}
              >
                <Admin />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/user"
            element={
              <ProtectedRoute
                redirectPath="/home"
                // isAllowed={!!user && user.roles.includes("user")}
                isAuthenticated={users}
              >
                <UserPerfil />
              </ProtectedRoute>
            }
          /> */}

          <Route
            path="/add"
            element={
              <ProtectedRoute
                redirectPath="/home"
                isAuthenticated={isAuthenticated}
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
                isAuthenticated={isAuthenticated}
              >
                <AddAuthor />
              </ProtectedRoute>
            }
          />

          {/* <Route
          path="/addbook"
          element={
            <ProtectedRoute
              redirectPath="/home"
              isAllowed={!!user && users.roles.includes("admin")}
            >
              <AddBook />
            </ProtectedRoute>
          }
        /> */}

          <Route
            path="/delete"
            element={
              <ProtectedRoute
                redirectPath="/home"
                isAuthenticated={isAuthenticated}
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
                isAuthenticated={isAuthenticated}
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
                isAuthenticated={isAuthenticated}
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
                isAuthenticated={isAuthenticated}
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
                isAuthenticated={isAuthenticated}
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
                isAuthenticated={isAuthenticated}
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
                isAuthenticated={isAuthenticated}
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
                isAuthenticated={isAuthenticated}
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
                isAuthenticated={isAuthenticated}
              >
                <Stock />
              </ProtectedRoute>
            }
          />
          
          {/* <Route exact path='/add' element={<Add/>} /> */}
          <Route exact path="/addbook" element={<AddBook />} />
          {/* <Route exact path='/addauthor' element={<AddAuthor/>} />  */}
        </Routes>
      </div>
      <BottomBar />
    </BrowserRouter>
  );
}

export default App;
