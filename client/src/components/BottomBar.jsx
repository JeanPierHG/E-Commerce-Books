import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../Styles/BottomBar.module.css'
import InfoIcon from '@mui/icons-material/Info'
import LiveHelpIcon from '@mui/icons-material/LiveHelp'
import PaymentIcon from '@mui/icons-material/Payment'
import ShareIcon from '@mui/icons-material/Share'
import DraftsIcon from '@mui/icons-material/Drafts'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import mercado from '../imgs/mercadoPago.webp'
import facebook from '../imgs/facebook.png'
import instagram from '../imgs/instagram.png'
import { getUsers, setUserNews } from '../actions'
import { useAuth0, User } from '@auth0/auth0-react'

export default function BottomBar() {
  const [input, setInput] = useState('')
  const { user, isAuthenticated, isLoading } = useAuth0();
  const dispatch = useDispatch();
  const allUsers = useSelector(state => state.users);
  const isLogged = useSelector(state => state.userLogged);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setInput(e.target.value);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const usuario = allUsers.filter((u) => u._id === isLogged[0]._id);
    /* if(isLogged.length === 0) {
      setInput('');
      return alert('Para suscribirte a nuestro newsletter necesitas estar logeado'); 
    } */
    if (usuario[0].isSubscribeNewsLetter === true){
      setInput('');
      return alert('Ya estas subscipto!!');
    } 
    
    const id = [isLogged[0]._id];
    dispatch(setUserNews(id));
    alert(`Gracias ${input} Suscripción exitosa a nuestro newsletters.`);
    setInput('');
    navigate('/user');
    dispatch(getUsers());
    
  }

  return (
    <div className={styles.container}>
      <div className={styles.container2}>
        <div>
          <div className={styles.about}>
            <InfoIcon />
            <Link className={styles.Link} to='/aboutus'>
              <span>About us</span>
            </Link>
          </div>
          <div>
            <LiveHelpIcon />
            <Link className={styles.Link} to='/faq'>
              <span>FAQ's</span>
            </Link>
          </div>
        </div>
        <div>
          <div className={styles.payments}>
            <PaymentIcon />
            <span>Medios de Pago:</span>

            <img src={mercado} width='100px'></img>
          </div>
        </div>
        <div>
          <div className={styles.networks}>
            <ShareIcon />
            <span>Redes Sociales:</span>
            <a
              href='https://www.instagram.com/'
              target='_blank'
              rel='noreferrer noopener'>
              <img src={instagram} width='35px' height='35px' />
            </a>

            <a
              href='https://www.facebook.com/'
              target='_blank'
              rel='noreferrer noopener'>
              <img src={facebook} width='35px' height='35px' />
            </a>
          </div>
        </div>
        <div>
          <div>
            <div className={styles.info}>
              <DraftsIcon />
              <span>NewsLetter</span>
            </div>
            <input
              className={styles.input}
              type='text'
              placeholder='mail'
              value={input}
              onChange={(e) => handleChange(e)}
            />
            {
              isLogged.length === 0 ? 
              <p>Para suscribirte necesitas estar logeado</p> :
              <button
              className={styles.btn}
              type='submit'
              onClick={(e) => handleSubmit(e)}>
              Suscribirse
            </button> 
            
            }
            {/* <button
              className={styles.btn}
              type='submit'
              onClick={(e) => handleSubmit(e)}>
              Suscribirse
            </button> */}
          </div>
        </div>
        <div>
          <LocationOnIcon />
          <span>Dirección: Av Belgrano 444, Mendoza, Argentina</span>
        </div>
      </div>
    </div>
  )
}
