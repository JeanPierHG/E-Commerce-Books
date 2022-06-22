import React, { useState , useEffect } from 'react';
import { Link} from 'react-router-dom';
//import { postBook } from '../actions/index';
import { useDispatch , useSelector } from 'react-redux';
//import { postAuthor } from '../actions/index';
import style from '../Styles/addAuthor.module.css';





export default function AddAuthor(){
    
    const dispatch = useDispatch();

    const allAuthors = useSelector((state)=>state.author);



    const [errors,setErrors] = useState({});

    const [post,setPost] = useState({ 
        name:'',
        surname:'',
        date:'',
        country:'',
        biography:'',  
        picture:''
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

   


    function validate(post) {
        let errors = {};
        if (!post.name) {
            errors.name = 'Please insert a name' 
        } else if(!post.name.match(/^[A-Z]/)){
            errors.name='First letter must be a capital letter'}

        if (!post.surname) {
            errors.surname = 'Please insert a surname'
        } else if(!post.name.match(/^[A-Z]/)){
            errors.surname='First letter must be a capital letter'}
       
        if (!post.date) {
            errors.date = 'Please insert a date'
        }
        if (!post.country) {
            errors.country = 'Please insert a country'
        }else if(!post.country.match(/^[A-Z]/)){
            errors.country='First letter must be a capital letter'}

        if (!post.picture) {
            errors.picture = 'Insert an url'
        }
        if (!post.biography) {
            errors.biography = 'Add a biography'
        }
        return errors;
    }





    function handleSubmit(e) {
        e.preventDefault();
        if (Object.values(errors).length > 0) alert("Please fill in all the fields")
        else {
            dispatch(postAuthor(post))
            alert('¡Author Added!')
            setPost({
                name:'',
                surname:'',
                date:'',
                country:'',
                biography:'',  
                picture:''
            })
        }
    };

    

  
    return(
        <div >
           
            <h1>Add Author</h1>

            <h2>Fill in all the fields</h2>

            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input                    
                    type='text' 
                    value= {post.name} 
                    name= 'name'
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.name && (
                        <p className={style.error}>{errors.name}</p>
                    )}
                </div>

                <div>
                    <label >Apellido:</label>
                    <input                    
                    type='text' 
                    value= {post.surname} 
                    name= 'surname'
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.surname && (
                        <p className={style.error}>{errors.surname}</p>
                    )}
                </div>

                <div>
                    <label >Fecha de nacimiento:</label>
                    <input                    
                    type='date' 
                    value= {post.date} 
                    name= 'date'
                    max="2022-12-12"
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.date && (
                        <p className={style.error}>{errors.date}</p>
                    )}
                </div>

                <div>
                    <label >Pais:</label>
                    <input                    
                    type='text' 
                    value= {post.country} 
                    name= 'country'
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.country && (
                        <p className={style.error}>{errors.country}</p>
                    )}
                </div>

                <div>
                    <label >Biografia:</label>
                    <textarea                   
                    type='text' 
                    value= {post.biography} 
                    name= 'biography'
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.biography && (
                        <p className={style.error}>{errors.biography}</p>
                    )}
                </div>

                <div>
                    <label >Imagen:</label>
                    <input                    
                    type='text' 
                    value= {post.picture} 
                    name= 'picture'
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.picture && (
                        <p className={style.error}>{errors.picture}</p>
                    )}
                </div>

                
                <button type='submit'>Agregar Autor</button>

                {/* <Link to='./addbook'>
                    <button name='addbook' disabled>Add Book</button>
                </Link> */}

                
            </form>
            
        </div>
    )
}