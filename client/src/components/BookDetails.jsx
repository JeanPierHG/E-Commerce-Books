import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookDetails ,getBookGenre, clearPageBookDetails, addToCart } from "../actions";
//import { clearPageBookDetails, getBookDetails } from "../actions";
import { Link } from "react-router-dom";
import styles from '../Styles/bookDetails.module.css'
import { animateScroll as scroll} from "react-scroll";

export default function BookDetails() {

  const id = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getBookDetails(id));
    scroll.scrollToTop();
  }, [dispatch]);

  function handleClick(e){

    dispatch(getBookGenre(e))
    navigate('/home')
  }
  function handleAddToCart(e){

    e.preventDefault();
    dispatch(addToCart(id))
    alert('Libro agregado al carrito!')
  }
 
  useEffect(() => {
    return () => {
      dispatch(clearPageBookDetails());
    }
  }, [dispatch]);


  const book = useSelector(state=>state.bookDetails);
  const author = book.authors
  console.log('book en details :',book)
  return (
    <div className={styles.container}>
      <Link to='/cart'><button className={styles.cart}>Ir al Carrito</button></Link>
      <img src={book.cover} alt="Not Found ):" className={styles.img} />
      
      <div className={styles.info}>

          <h1 className={styles.title}>{book.title}</h1>
        
        {author?
        <Link to={'/author/' + author._id}>
              <h2 className={styles.title}>{author?.name} {author?.surname} </h2>
        </Link>
        :'N'
        }

         <span>Generos :</span>

         {book?.genres?.map((e) => {
            return(
              
            <button onClick={()=>handleClick(e.genre)} className={styles.genres}>{e.genre}</button>
             
            )          
         })}

         <p>{book.review}</p>

      </div>

      <div className={styles.buy}>
        <h3 className={styles.price}>{book.price}$</h3>
        <h4>Stock:{book.stock}</h4>
        <button className={styles.button} onClick={e=>handleAddToCart(e)}>Añadir al carrito</button>
        <button className={styles.button}>Añadir a lista de desesados</button>
      </div>
      
      <div className={styles.details}>
      <h4>Detalles del producto</h4>
        <p className={styles.detail}>Paginas : {book.pages}</p>
        <p className={styles.detail}>Año : {book.year}</p>
        <p className={styles.detail}>Editorial : {book.editorial}</p>
      </div>

      <div className={styles.space}/>

      <div className={styles.comments}>
        <label>Da tu puntuacion!</label>
        <input type="number" placeholder="Puntuacion..." className={styles.rating} />
        <button>Ok</button>
        <textarea cols="80" rows="4" placeholder="Comenta!"  className={styles.comment}></textarea>
        <button>Post</button>
      </div>  

    </div>
  );
}
