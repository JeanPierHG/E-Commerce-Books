import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { putBook } from "../actions";


export default function putBookId(){

    const dispatch = useDispatch()

    const id = useParams().id

    const allBooks = useSelector( state => state.books)

    const bookId = allBooks.filter(book => book._id === id)


    const [post ,setPost] = useState({
        title: "",
        cover: "",
        rating: "",
        year: "",
        pages: "",
        editorial: "",
        price: "",
        stock: "",
        review: "",
    })

    useEffect(()=>{
            setPost(
                {...post,
                title: bookId[0].title,
                cover: bookId[0].cover,
                rating: bookId[0].rating,
                year: bookId[0].year,
                pages: bookId[0].pages,
                editorial: bookId[0].editorial,
                price: bookId[0].price,
                stock: bookId[0].stock,
                review: bookId[0].review,
            }
            )
    
    },[])


    function handleChange(e){     
        setPost({                           
            ...post, 
            [e.target.name] : e.target.value     
        })  
    }




function handleSubmit(e) {
        e.preventDefault();
            dispatch(putBook(post,id))
            alert('¡Libro Modificado!')                 
    };


    return(
        <div>
        <h1>Modifica el Libro</h1>
        
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>Titulo:</label>
            <input
              type="text"
              value={post.title}
              name="title"
              onChange={(e) => handleChange(e)}
            />
          </div>
  
          
          <div>
            <label>Editorial:</label>
            <input
              type="text"
              value={post.editorial}
              name="editorial"
              onChange={(e) => handleChange(e)}
            />
          </div>
  
          <div>
            <label>Imagen:</label>
            <input
              type="text"
              value={post.cover}
              name="cover"
              onChange={(e) => handleChange(e)}
            />
          </div>
  
          <div>
            <label>Rating:</label>
            <input
              type="number"
              min="0"
              max="10"
              value={post.rating}
              name="rating"
              onChange={(e) => handleChange(e)}
            />
          </div>
  
          <div>
            <label>Año:</label>
            <input
              type="number"
              value={post.year}
              name="year"
              onChange={(e) => handleChange(e)}
            />
          </div>
  
          <div>
            <label>Cantidad de paginas:</label>
            <input
              type="number"
              value={post.pages}
              name="pages"
              onChange={(e) => handleChange(e)}
            />
          </div>
  
          <div>
            <label>Precio:</label>
            <input
              type="number"
              value={post.price}
              name="price"
              onChange={(e) => handleChange(e)}
            />
          </div>
  
          <div>
            <label>Stock:</label>
            <input
              type="number"
              value={post.stock}
              name="stock"
              onChange={(e) => handleChange(e)}
            />
          </div>
  
          <div>
            <label>Reseña</label>
            <textarea
              value={post.review}
              name="review"
              onChange={(e) => handleChange(e)}
            />
          </div>
  
     

          <button type="submit">Modificar Libro</button>
        </form>
  
      </div>
        
    )
}