import './App.css'
import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom'
import {
  getBooks,
  getAuthors,
  getUsers,
  postUser,
  getCarouselImages,
} from './actions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import Home from './components/Home'
import AboutUs from './components/AboutUs'
import FAQ from './components/FAQ'
import Landing from './components/Landing'
import Author from './components/Author'
import BookDetails from './components/BookDetails'
import AuthorDetails from './components/AuthorDetails'
import Add from './components/Admin/Add'
import AddBook from './components/Admin/AddBook'
import AddAuthor from './components/Admin/AddAuthor'
import BottomBar from './components/BottomBar'
import { Admin } from './components/Admin/Admin'
import UserPerfil from './components/UserPerfil'
import DeleteData from './components/Admin/DeleteData'
import Put from './components/Admin/Put'
import PutAuthor from './components/Admin/PutAuthor'
import PutBook from './components/Admin/PutBook'
import PutAuthorID from './components/Admin/PutAuthorID'
import putBookId from './components/Admin/PutBookID'
import ProtectedRoute from './components/ProtectedRoute'
import Stock from './components/Admin/Stock'
import LogInButton from './components/LogIn'
import LogOutButton from './components/LogOut'
import { useAuth0 } from '@auth0/auth0-react'
import DeleteAuthor from './components/Admin/DeleteAuthor'
import DeleteBook from './components/Admin/DeleteBook'
import AdminPro from './components/AdminPro/AdminPro'
import UserDatos from './components/UserDatos'
import UserSuscripcion from './components/UserSuscripcion'
import ShoopingCart from './components/ShoppingCart'
import AdminUsers from './components/Admin/AdminUsers'
import AdminOrders from './components/Admin/Order/AdminOrders'
import AdminCarousel from './components/AdminCarousel'
import NavBarAdmin from './components/Admin/NavBarAdmin'
import StockTable from './components/Admin/StockTable'
import AdminUsers2 from './components/Admin/AdminUsers2'
import CreateAdmin from './components/AdminPro/CreateAdmin'
import UserFav from './components/UserFav'
import { AdminProProfile } from './components/AdminPro/AdminProProfile'
import AdminUserProfile from './components/Admin/AdminUserProfile'
import ProtectedRouteBan from './components/ProtectedRouteBan'
import Banned from './components/Admin/Banned'
import UserNavBar from './components/UserNavBar'
import UserPlanLectura from './components/UserPlanLectura'
import AdminUserNewsLetter from './components/Admin/AdminUserNewsLetter'
import AdminProPerfilUsuarios from './components/AdminPro/AdminProPerfilesUsuarios'
import Mercadopago from './components/Mercadopago'

function App() {
  const dispatch = useDispatch()

  const { user } = useAuth0()

  useEffect(() => {
    dispatch(getBooks())
  }, [dispatch])

  useEffect(() => {
    dispatch(getAuthors())
  }, [dispatch])

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  useEffect(() => {
    if (user) {
      dispatch(postUser(user))
    }
  }, [user])

  useEffect(() => {
    dispatch(getCarouselImages())
  }, [dispatch])

  const usuario = useSelector((state) => state.userLogged)
  console.log('appp:', usuario)

  return (
    <BrowserRouter>
      <NavBar />
      {usuario.length === 1 && usuario[0].isAdmin ? <NavBarAdmin /> : ''}
      {usuario.length === 1 ? <UserNavBar /> : ''}

      <div className='main-without-nav'>
        <Routes>
          <Route
            element={
              <ProtectedRouteBan
                isAllowed={
                  usuario.length === 0 || usuario[0].isBanned === false
                }
              />
            }
          >
            <Route exact path='/' element={<Landing />} />
            <Route path='/home' element={<Home />} />
            <Route exact path='/aboutus' element={<AboutUs />} />
            <Route exact path='/faq' element={<FAQ />} />
            <Route exact path='/author' element={<Author />} />
            <Route exact path='/book/:id' element={<BookDetails />} />
            <Route exact path='/author/:id' element={<AuthorDetails />} />
          </Route>

          <Route
            path='/banned'
            element={
              <ProtectedRoute
                redirectPath='/'
                isAllowed={usuario.length === 1 && usuario[0].isBanned === true}
              >
                <Banned />
              </ProtectedRoute>
            }
          />

          <Route element={<ProtectedRoute isAllowed={usuario.length === 1} />}>
            <Route path='/cart' element={<ShoopingCart />} />
          </Route>

          <Route element={<ProtectedRoute isAllowed={usuario.length === 1} />}>
            <Route path='/user' element={<UserPerfil />} />
          </Route>

          <Route element={<ProtectedRoute isAllowed={usuario.length === 1} />}>
            <Route path='/user/datos' element={<UserDatos />} />
          </Route>

          <Route element={<ProtectedRoute isAllowed={usuario.length === 1} />}>
            <Route path='/user/suscripcion' element={<UserSuscripcion />} />
          </Route>

          <Route element={<ProtectedRoute isAllowed={usuario.length === 1} />}>
            <Route path='/user/deseados' element={<UserFav />} />
          </Route>

          <Route element={<ProtectedRoute isAllowed={usuario.length === 1} />}>
            <Route path='/user/lectura' element={<UserPlanLectura />} />
          </Route>

          <Route
            path='/admin'
            element={
              <ProtectedRoute
                redirectPath='/home'
                isAllowed={usuario.length === 1 && usuario[0].isAdmin === true}
              >
                <Admin />
              </ProtectedRoute>
            }
          />

          <Route
            path='/adminpro'
            element={
              <ProtectedRoute
                redirectPath='/home'
                isAllowed={
                  usuario.length === 1 && usuario[0].isSuperAdmin === true
                }
              >
                <AdminPro />
              </ProtectedRoute>
            }
          />

          <Route
            path='/createadmin'
            element={
              <ProtectedRoute
                redirectPath='/home'
                isAllowed={
                  usuario.length === 1 && usuario[0].isSuperAdmin === true
                }
              >
                <CreateAdmin />
              </ProtectedRoute>
            }
          />

          <Route
            path='/adminproperfilusuarios/:id'
            element={
              <ProtectedRoute
                redirectPath='/home'
                isAllowed={
                  usuario.length === 1 && usuario[0].isSuperAdmin === true
                }
              >
                <AdminProPerfilUsuarios />
              </ProtectedRoute>
            }
          />

          <Route
            path='/adminproprofile'
            element={
              <ProtectedRoute
                redirectPath='/home'
                isAllowed={
                  usuario.length === 1 && usuario[0].isSuperAdmin === true
                }
              >
                <AdminProProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path='/adminuserprofile/:id'
            element={
              <ProtectedRoute
                redirectPath='/home'
                isAllowed={usuario.length === 1 && usuario[0].isAdmin === true}
              >
                <AdminUserProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path='/add'
            element={
              <ProtectedRoute
                redirectPath='/home'
                isAllowed={
                  usuario.length === 1 &&
                  usuario[0].isAdmin === true &&
                  usuario[0].isAdminData === true
                }
              >
                <Add />
              </ProtectedRoute>
            }
          />

          <Route
            path='/addauthor'
            element={
              <ProtectedRoute
                redirectPath='/home'
                isAllowed={
                  usuario.length === 1 &&
                  usuario[0].isAdmin === true &&
                  usuario[0].isAdminData === true
                }
              >
                <AddAuthor />
              </ProtectedRoute>
            }
          />

          <Route
            path='/addbook'
            element={
              <ProtectedRoute
                redirectPath='/home'
                isAllowed={
                  usuario.length === 1 &&
                  usuario[0].isAdmin === true &&
                  usuario[0].isAdminData === true
                }
              >
                <AddBook />
              </ProtectedRoute>
            }
          />

          <Route
            path='/delete'
            element={
              <ProtectedRoute
                redirectPath='/home'
                isAllowed={
                  usuario.length === 1 &&
                  usuario[0].isAdmin === true &&
                  usuario[0].isAdminData === true
                }
              >
                <DeleteData />
              </ProtectedRoute>
            }
          />

          <Route
            path='/deleteauthor'
            element={
              <ProtectedRoute
                redirectPath='/home'
                isAllowed={
                  usuario.length === 1 &&
                  usuario[0].isAdmin === true &&
                  usuario[0].isAdminData === true
                }
              >
                <DeleteAuthor />
              </ProtectedRoute>
            }
          />

          <Route
            path='/deletebook'
            element={
              <ProtectedRoute
                redirectPath='/home'
                isAllowed={
                  usuario.length === 1 &&
                  usuario[0].isAdmin === true &&
                  usuario[0].isAdminData === true
                }
              >
                <DeleteBook />
              </ProtectedRoute>
            }
          />

          <Route
            path='/put'
            element={
              <ProtectedRoute
                redirectPath='/home'
                isAllowed={
                  usuario.length === 1 &&
                  usuario[0].isAdmin === true &&
                  usuario[0].isAdminData === true
                }
              >
                <Put />
              </ProtectedRoute>
            }
          />

          <Route
            path='/putbook'
            element={
              <ProtectedRoute
                redirectPath='/home'
                isAllowed={
                  usuario.length === 1 &&
                  usuario[0].isAdmin === true &&
                  usuario[0].isAdminData === true
                }
              >
                <PutBook />
              </ProtectedRoute>
            }
          />

          <Route
            path='/putauthor'
            element={
              <ProtectedRoute
                redirectPath='/home'
                isAllowed={
                  usuario.length === 1 &&
                  usuario[0].isAdmin === true &&
                  usuario[0].isAdminData === true
                }
              >
                <PutAuthor />
              </ProtectedRoute>
            }
          />

          <Route
            path='/putAuthorID/:id'
            element={
              <ProtectedRoute
                redirectPath='/home'
                isAllowed={
                  usuario.length === 1 &&
                  usuario[0].isAdmin === true &&
                  usuario[0].isAdminData === true
                }
              >
                <PutAuthorID />
              </ProtectedRoute>
            }
          />

          <Route
            path='/putBookID/:id'
            element={
              <ProtectedRoute
                redirectPath='/home'
                isAllowed={
                  usuario.length === 1 &&
                  usuario[0].isAdmin === true &&
                  usuario[0].isAdminData === true
                }
              >
                <putBookId />
              </ProtectedRoute>
            }
          />

          <Route
            path='/stock'
            element={
              <ProtectedRoute
                redirectPath='/home'
                isAllowed={
                  usuario.length === 1 &&
                  usuario[0].isAdmin === true &&
                  usuario[0].isAdminStock === true
                }
              >
                <Stock />
              </ProtectedRoute>
            }
          />

          <Route
            path='/stocktable'
            element={
              <ProtectedRoute
                redirectPath='/home'
                isAllowed={
                  usuario.length === 1 &&
                  usuario[0].isAdmin === true &&
                  usuario[0].isAdminStock === true
                }
              >
                <StockTable />
              </ProtectedRoute>
            }
          />

          <Route
            path='/adminorders'
            element={
              <ProtectedRoute
                redirectPath='/home'
                // isAllowed={!!users && users.roles.includes("admin")}
                isAllowed={
                  usuario.length === 1 &&
                  usuario[0].isAdmin === true &&
                  usuario[0].isAdminOrders === true
                }
              >
                <AdminOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path='/adminusers'
            element={
              <ProtectedRoute
                redirectPath='/home'
                // isAllowed={!!users && users.roles.includes("admin")}
                isAllowed={
                  usuario.length === 1 &&
                  usuario[0].isAdmin === true &&
                  usuario[0].isAdminUsers === true
                }
              >
                <AdminUsers />
              </ProtectedRoute>
            }
          />

          <Route
            path='/adminusers2'
            element={
              <ProtectedRoute
                redirectPath='/home'
                // isAllowed={!!users && users.roles.includes("admin")}
                isAllowed={
                  usuario.length === 1 &&
                  usuario[0].isAdmin === true &&
                  usuario[0].isAdminStock === true
                }
              >
                <AdminUsers2 />
              </ProtectedRoute>
            }
          />

          <Route
            path='/admincarrusel'
            element={
              <ProtectedRoute
                redirectPath='/home'
                // isAllowed={!!users && users.roles.includes("admin")}
                isAllowed={
                  usuario.length === 1 &&
                  usuario[0].isAdmin === true &&
                  usuario[0].isAdminMarketing === true
                }
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
          <Route path='/mercadopago' element={<Mercadopago />} />
        </Routes>
      </div>
      <BottomBar />
    </BrowserRouter>
  )
}

export default App
