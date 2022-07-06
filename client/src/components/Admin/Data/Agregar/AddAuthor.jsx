import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
//import { postBook } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux'
import { getAuthors, postAuthor } from '../../../../actions/index'
import style from '../../../../Styles/addAuthor.module.css'

export default function AddAuthor() {
  const dispatch = useDispatch()

  const allAuthors = useSelector((state) => state.author)

  const [errors, setErrors] = useState({})

  const [post, setPost] = useState({
    name: '',
    surname: '',
    birth: '',
    country: '',
    biography: '',
    picture: '',
  })

  useEffect(() => {
    setErrors(validate(post))
  }, [post])

  function handleChange(e) {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    })
  }

  function validate(post) {
    let errors = {}
    let date_regex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
    if (!post.name) {
      errors.name = 'Ingresar nombre del autor'
    }
    if (!post.name.match(/^[a-zA-Z]*$/g)) {
      errors.name = 'El nombre solo puede contener letras'
    }
    if (!post.surname) {
      errors.surname = 'Ingresar apellido'
    }
    if (!post.surname.match(/^[a-zA-Z]*$/g)) {
      errors.surname = 'El apellido solo puede contener letras'
    }
    if (!post.birth) {
      errors.birth = 'Ingresar fecha de nacimiento'
    }
    if (post.birth && !post.birth.match(date_regex)) {
      errors.birth = 'Debe ser una fecha valida'
    }
    if (!post.country) {
      errors.country = 'Ingresar un pais'
    }
    
    if (!post.picture) {
      errors.picture = 'Ingresar url'
    }
    if (!post.biography) {
      errors.biography = 'Ingresar biografia del autor'
    }
    if (post.biography.length > 10000) {
      errors.biography = 'Pasaste el limite de caracteres'
    }

    return errors
  }

  const [failedSubmit, setFailedSubmit] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (Object.values(errors).length > 0) {
      setFailedSubmit(true)
      return alert('Error! revisar formulario')
    }
    {
      dispatch(postAuthor(post))
      alert('Autor agregado!')
      setPost({
        name: '',
        surname: '',
        birth: '',
        country: '',
        biography: '',
        picture: '',
      })
      setTimeout(function(){
        dispatch(getAuthors())
      }, 5000);
    }
  }

  return (
    <div className={style.form}>
      <h1 className={style.titleForm}>Add Author</h1>
      <form className={style.containerForm} onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre:</label>
          <input
            type='text'
            value={post.name}
            name='name'
            onChange={(e) => handleChange(e)}
          />
          {(errors.name && failedSubmit) ||
          !errors.name?.split(' ').includes('Ingresar') ? (
            <p className={style.error}>{errors.name}</p>
          ) : null}
        </div>

        <div>
          <label>Apellido:</label>
          <input
            type='text'
            value={post.surname}
            name='surname'
            onChange={(e) => handleChange(e)}
          />
          {(errors.surname && failedSubmit) ||
          !errors.surname?.split(' ').includes('Ingresar') ? (
            <p className={style.error}>{errors.surname}</p>
          ) : null}
        </div>

        <div>
          <label>Fecha de nacimiento:</label>
          <input
            type='date'
            value={post.birth}
            name='birth'
            max='2022-12-12'
            onChange={(e) => handleChange(e)}
          />
          {(errors.birth && failedSubmit) ||
          !errors.birth?.split(' ').includes('Ingresar') ? (
            <p className={style.error}>{errors.birth}</p>
          ) : null}
        </div>

        <div>
          <label>Pais:</label>
          <input
            type='text'
            value={post.country}
            name='country'
            onChange={(e) => handleChange(e)}
          />
          {(errors.country && failedSubmit) ||
          !errors.country?.split(' ').includes('Ingresar') ? (
            <p className={style.error}>{errors.country}</p>
          ) : null}
        </div>

        <div>
          <label>Biografia:</label>
          <textarea
            type='text'
            value={post.biography}
            name='biography'
            onChange={(e) => handleChange(e)}
          />
          {(errors.biography && failedSubmit) ||
          !errors.biography?.split(' ').includes('Ingresar') ? (
            <p className={style.error}>{errors.biography}</p>
          ) : null}
        </div>

        <div>
          <label>Imagen:</label>
          <input
            type='text'
            value={post.picture}
            name='picture'
            onChange={(e) => handleChange(e)}
          />
          {(errors.picture && failedSubmit) ||
          !errors.picture?.split(' ').includes('Ingresar') ? (
            <p className={style.error}>{errors.picture}</p>
          ) : null}
        </div>

        <button className={style.btn} type='submit'>
          Agregar Autor
        </button>
      </form>

      <Link to='/add'>
        <button className={`${style.btnAdmin}`}>↼ Back</button>
      </Link>
    </div>
  )
}
