import React, { useState , useEffect } from 'react';
import { Link} from 'react-router-dom';
//import { postBook } from '../actions/index';
import { useDispatch , useSelector } from 'react-redux';
import style from '../Styles/addBook.module.css';





export default function AddBook(){
    
    const dispatch = useDispatch();

    const allBooks = useSelector((state)=>state.books);

    const genres = ['Salud', 'Deportes', 'Biografia', 'Nutricion', 'Filosofia', 'Ensayo', 'Desarrollo Personal',
    'Economia', 'Espiritualidad', 'Historia', 'Negocios', 'Psicologia', 'Neurociencia'];

    const [errors,setErrors] = useState({});

    const [post,setPost] = useState({ 
        title:'',
        cover:'',
        rating:'',
        year:'',
        pages:'',
        editorial:'',
        price:'',
        authors:{name:'',surname:''},
        genres:[],
        stock:'',
        review:'',
    })


    function handleChange(e){     
        setPost({                           
            ...post, 
            [e.target.name] : e.target.value     
        })
        setErrors(validate({
            ...post,                          
            [e.target.name] : e.target.value
        }))     
    }

    function handleSelectGenres(e){ 
        setPost({
            ...post, 
            genres: [...post.genres,e.target.value]       
        })
        setErrors(validate({
            ...post,
            genres: [...post.genres,e.target.value]
        }));
    }

    function handleSteps(e) {
        setPost({
            ...post,
            review: [e.target.value]
        });
        setErrors(validate({
            ...post,
            review: e.target.value
        }));
    }

    function handleGenreDelete(diet){
        setPost({
            ...post,  
            genres: post.genres.filter(e=>e!==diet)
        })
        setErrors(validate({
            ...post,
            genres: [...post.genres]
        }));
    }

    function validate(post) {
        let errors = {};
        if (!post.title) {
            errors.title = 'Please insert a title' 
        } else if(!post.title[0].match(/^[A-Z]/)){
            errors.title='First letter must be a capital letter'};


        if (!post.authors.name) {
            errors.authors= 'Add auhtor name'
        }else if(!post.authros.name[0].match(/^[A-Z]/)){
            errors.authors='First letter must be a capital letter'};


        if (!post.authors.surname) {
            errors.authors= 'Add auhtor surname'
        }else if(!post.authros.surname[0].match(/^[A-Z]/)){
            errors.authors='First letter must be a capital letter'};

         if (!post.editorial) {
            errors.editorial = 'Please add an editorial'
        }else if(!post.editorial[0].match(/^[A-Z]/)){
            errors.editorial='First letter must be a capital letter'};

        if (!post.cover) {
            errors.cover = 'Pleaseinsert an url related to the cover'
        }


        if (!post.rating || post.rating < 0 || post.rating > 10) {
                    errors.rating = 'Value must be between 0 and 10'
                };

        if (!post.year) {
            errors.year = 'Please insert a year, must be a number'
        };

        if (!post.pages) {
            errors.pages = 'Please insert the book`s pages, must be a number'
        };

        if (!post.price) {
            errors.price = 'Please insert the price, must be a number'
        };

        if (!post.stock) {
            errors.stock = 'Please insert the stock, must be a number'
        };
        
   
        if (!post.review) {
            errors.review = 'Please write a review'
        };
       
        
        if (!post.genres.length) {
            errors.genres = 'Please add some genres'
        };

        return errors;
    }





    function handleSubmit(e) {
        e.preventDefault();
        if (Object.values(errors).length > 0) alert("Please fill in all the fields")
        else {
            dispatch(postBook(post))
            console.log('soy Post:',post)
            alert('¡Book Added!')
            setPost({
                title:'',
                cover:'',
                rating:'',
                year:'',
                pages:'',
                editorial:'',
                price:'',
                authors:{name:'',surname:''},
                genres:[],
                stock:'',
                review:'',
            })
        }
    };

  
    return(
        <div >
           
            <h1>Add Book</h1>
            <h2>Fill in all the fields</h2>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label >Titulo:</label>
                    <input                    
                    type='text' 
                    value= {post.title} 
                    name= 'title'
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.title && (
                        <p className={style.error}>{errors.title}</p>
                    )}
                </div>

                <div>
                    <label >Nombre de Autor:</label>
                    <input                    
                    type='text' 
                    value= {post.authors.name} 
                    name= 'authors'
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.authors && (
                        <p className={style.error}>{errors.authors}</p>
                    )}
                </div>

                <div>
                    <label >Apellido de Autor:</label>
                    <input                    
                    type='text' 
                    value= {post.authors.surname} 
                    name= 'authors'
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.authors && (
                        <p className={style.error}>{errors.authors}</p>
                    )}
                </div>

                <div>
                    <label >Editorial:</label>
                    <input                    
                    type='text' 
                    value= {post.editorial} 
                    name= 'editorial'
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.editorial && (
                        <p className={style.error}>{errors.editorial}</p>
                    )}
                </div>

                <div>
                    <label >Imagen:</label>
                    <input                    
                    type='text' 
                    value= {post.cover} 
                    name= 'cover'
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.cover && (
                        <p className={style.error}>{errors.cover}</p>
                    )}
                </div>
 

                <div>
                    <label>Rating:</label>
                    <input 
                    type='number' min='0' max='10' 
                    value= {post.rating} 
                    name= 'rating'
                    onChange={(e)=>handleChange(e)}    
                    />
                     {errors.rating && (
                        <p className={style.error}>{errors.rating}</p>
                    )}
                </div>

                <div>
                    <label>Año:</label>
                    <input 
                    type='number' 
                    value= {post.year} 
                    name= 'year'
                    onChange={(e)=>handleChange(e)}    
                    />
                     {errors.year && (
                        <p className={style.error}>{errors.year}</p>
                    )}
                </div>

                <div>
                    <label>Cantidad de paginas:</label>
                    <input 
                    type='number' 
                    value= {post.pages} 
                    name= 'pages'
                    onChange={(e)=>handleChange(e)}    
                    />
                     {errors.pages && (
                        <p className={style.error}>{errors.pages}</p>
                    )}
                </div>

                <div>
                    <label>Precio:</label>
                    <input 
                    type='number' 
                    value= {post.price} 
                    name= 'price'
                    onChange={(e)=>handleChange(e)}    
                    />
                     {errors.price && (
                        <p className={style.error}>{errors.price}</p>
                    )}
                </div>

                <div>
                    <label>Stock:</label>
                    <input 
                    type='number' 
                    value= {post.stock} 
                    name= 'stock'
                    onChange={(e)=>handleChange(e)}    
                    />
                     {errors.stock && (
                        <p className={style.error}>{errors.stock}</p>
                    )}
                </div>


                <div>
                    <label>Reseña</label>
                    <textarea 
                    value= {post.review} 
                    name= 'review'
                    onChange={(e)=>handleSteps(e)}
                    />
                     {errors.review && (
                        <p className={style.error}>{errors.review}</p>
                    )}
                </div>


                <select onChange={e => handleSelectGenres(e)} defaultValue='default'>
                    <option value="default" disabled >Genres</option>
                        {
                            genres && genres.map(genre => (
                                <option value={genre}>{genre}</option>
                                    ))
                        }
                </select>
                        {errors.genres && (
                            <p className={style.error}>{errors.genres}</p>
                        )}
                        {post.genres.map(genre =>
                            <div key={genre}>
                                <p>{genre}</p>
                                <button onClick={() => handleGenreDelete(genre)}>X</button>
                            </div>
                        )}


                <button type='submit'>Agregar Libro</button>

                
            </form>
            
        </div>
    )
}