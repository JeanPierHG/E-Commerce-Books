import "./App.css";
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { getBooks, getAuthors } from "./actions";
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

function App() {
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  const handleLoginAdmin = () =>
    setUser({
      id: "1",
      name: "guille",
      roles: ["admin"],
    });

  const handleLogoutAdmin = () => setUser(null);

  const handleLoginUser = () =>
    setUser({
      id: "1",
      name: "guille",
      roles: ["user"],
    });
  const handleLogoutUser = () => setUser(null);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAuthors());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <NavBar />
      <div className="main-without-nav">
        {user ? (
          <button onClick={handleLogoutAdmin}>Sign Out Admin</button>
        ) : (
          <button onClick={handleLoginAdmin}>Sign In Admin</button>
        )}

        {user ? (
          <button onClick={handleLogoutUser}>Sign Out User</button>
        ) : (
          <button onClick={handleLoginUser}>Sign In User</button>
        )}
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="home" element={<Home />} />
          <Route exact path="/aboutus" element={<AboutUs />} />
          <Route exact path="/faq" element={<FAQ />} />
          <Route exact path="/author" element={<Author />} />
          <Route exact path="/book/:id" element={<BookDetails />} />
          <Route exact path="/author/:id" element={<AuthorDetails />} />

          <Route element={<ProtectedRoute isAllowed={!!user} />}>
            <Route path="/shop" element={<Shop />} />
          </Route>

          <Route
            path="/admin"
            element={
              <ProtectedRoute
                redirectPath="/home"
                isAllowed={!!user && user.roles.includes("admin")}
              >
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute
                redirectPath="/home"
                isAllowed={!!user && user.roles.includes("user")}
              >
                <UserPerfil />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add"
            element={
              <ProtectedRoute
                redirectPath="/home"
                isAllowed={!!user && user.roles.includes("admin")}
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
                isAllowed={!!user && user.roles.includes("admin")}
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
              isAllowed={!!user && user.roles.includes("admin")}
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
                isAllowed={!!user && user.roles.includes("admin")}
              >
                <DeleteData />
              </ProtectedRoute>
            }
          />

          <Route
            path="/put"
            element={
              <ProtectedRoute
                redirectPath="/home"
                isAllowed={!!user && user.roles.includes("admin")}
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
                isAllowed={!!user && user.roles.includes("admin")}
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
                isAllowed={!!user && user.roles.includes("admin")}
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
                isAllowed={!!user && user.roles.includes("admin")}
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
                isAllowed={!!user && user.roles.includes("admin")}
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
                isAllowed={!!user && user.roles.includes("admin")}
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
