import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardBook from "./CardBook";
import styles from '../Styles/adminCarousel.module.css'
import { addBookCarousel } from "../actions";

export default function AdminCarousel(){

    const dispatch=useDispatch();
    const books=useSelector(state=>state.books)
    const carousel=useSelector(state=>state.carousel)
    console.log('state.carousel =',carousel)

    const [state,setState]=useState({
        addbook:false,
        addBookOffer:false,
        addPackage:false,
        custom:false,
    })
    
    const [input,setInput]=useState({
        title:'',
        cover:'',
        description:'',
        price:'',
        custom:true,
    })

    const [addForm,setAddForm]=useState(false)
    const [addCustomform,setAddCustomForm]=useState(false)
    const [currentBook,setCurrentBook]=useState({
        title:'',
        _id:'',
        price:'',
        newPrice:'',
        cover:'',
    })
    function handleInputs(e){
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
        console.log('input :',input)
    }

    function addBook(e){
        e.preventDefault();
        setAddCustomForm(false);
        setState({
            addbook:true,
            addBookOffer:false,
            addPackage:false,
            custom:false,
        })
    }

    function addPackage(e){
        e.preventDefault();
        setState({
            addbook:false,
            addBookOffer:false,
            addPackage:true,
            custom:false,
        })
    }
    function addCustom(e){
        e.preventDefault();
        setState({
            addbook:false,
            addBookOffer:false,
            addPackage:true,
            custom:false,
        })
    }
    function handleAdd(e){
        e.preventDefault();
        setAddForm(true);
        let book=e.target.value.split(',')
        setCurrentBook({title:book[0],_id:book[1],cover:book[2],price:book[3]})
        console.log('currentBook',currentBook)
    }
    function handleNewPrice(e){
        e.preventDefault();
        setCurrentBook({...currentBook,newPrice:e.target.value})
        console.log('currentBook',currentBook)
    }
    function handleSend(e){
        e.preventDefault();
        dispatch(addBookCarousel(currentBook))
    }
    function handleSendForm(e){
        e.preventDefault();
        dispatch(addBookCarousel(input))
    }
    function addFormFalse(e){
        e.preventDefault();
        setAddForm(false);
        setAddCustomForm(false);
    }
    function addCustomForm(e){
        e.preventDefault();
        setAddCustomForm(true);
        setAddForm(false)
        setState({
            addbook:false,
            addBookOffer:false,
            addPackage:false,
            custom:true
        })
    }

    

    return(
        <div>
            <h1>Manejo de Carrusel</h1>
            <h3>Opciones:</h3>
            <button onClick={e=>addBook(e)}>Agregar Libro</button>
            {/* <button onClick={e=>addBookOffer(e)}>Agregar libro con descuento</button> */}
            {/* <button onClick={e=>addPackage(e)}>Agregar paquete</button> */}
            <button onClick={e=>addCustomForm(e)}>Agregar personalizado</button>
            {
                addForm?<div>
                   <h4> Añadiendo {currentBook.title} al carousel </h4>
                   <p>Precio del libro : {currentBook.price}</p>
                   <p>Añadir precio de oferta :</p>
                   <input type="number" value={currentBook.newPrice} onChange={e=>handleNewPrice(e)}/>
                   <button onClick={e=>handleSend(e)}>Añadir</button>
                   <button onClick={e=>addFormFalse(e)}>Cancelar</button>
                </div>:null
            }
            {
                addCustomform?<div>
                    <form onSubmit={e=>handleSendForm(e)}>
                        <label>Titulo :</label>
                        <input type="text" name='title' value={input.title} onChange={e=>{handleInputs(e)}} />
                        <label >Imagen(URL)</label>
                        <input type="text" name='cover' value={input.cover} onChange={e=>{handleInputs(e)}} />
                        <label>descripcion :</label>
                        <input type="text" name='description' value={input.description}  onChange={e=>{handleInputs(e)}}/>
                        <label>Precio :</label>
                        <input type="text" name='price' value={input.price} onChange={e=>{handleInputs(e)}}/>
                        <button type="Submit">Añadir</button>
                        <button onClick={e=>addFormFalse(e)}>Cancelar</button>
                    </form>
                </div>:null
            }
            {
                state.addbook?books.map((book, index) => {
                    return (
                      <div key={index} className={styles.cardsContainer}>
                        <div className={styles.cards}>
                            <h3>{book.title}</h3>
                            <button value={[book.title.replaceAll(',',' '),book._id,book.cover,book.price]} onClick={e=>handleAdd(e)}>Add</button>
                            <img src={book.cover} width='200px' alt="not Found" />
                        </div>
                      </div>
                    )
                  })
                    
                :null
            }
        </div>
    )
}