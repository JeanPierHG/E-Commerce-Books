import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
//import { postBook } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux'
import { postAuthor } from '../../../../actions/index'
import style from '../../../../Styles/PutAuthorID.module.css'
import { putAuthor } from '../../../../actions/index'

export default function PutAuthorID() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const id = useParams().id
  // console.log('soy id:',id)
  const allAuthors = useSelector((state) => state.authors)

  const authorId = allAuthors.filter((author) => author._id === id)
  console.log('aaaa:', authorId)

  const [post, setPost] = useState({
    name: '',
    surname: '',
    date: '',
    country: '',
    biography: '',
    picture: '',
  })

  useEffect(() => {
    setPost({
      ...post,
      name: authorId[0].name,
      surname: authorId[0].surname,
      date: authorId[0].date,
      country: authorId[0].country,
      biography: authorId[0].biography,
      picture: authorId[0].picture,
    })
  }, [])

  function handleChange(e) {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(putAuthor(post, id))
    alert('¡Autor Modificado!')
    navigate('/put')
  }

  return (
    <div className={style.form}>
      <h1 className={style.titleForm}>Modificar los campos necesarios</h1>
      <form className={style.containerForm} onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre:</label>
          <input
            type='text'
            value={post.name}
            name='name'
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label>Apellido:</label>
          <input
            type='text'
            value={post.surname}
            name='surname'
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label>Fecha de nacimiento:</label>
          <input
            type='date'
            value={post.date}
            name='date'
            max='2022-12-12'
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label>Pais:</label>
          <input
            type='text'
            value={post.country}
            name='country'
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label>Biografia:</label>
          <textarea
            type='text'
            value={post.biography}
            name='biography'
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label>Imagen:</label>
          <input
            type='text'
            value={post.picture}
            name='picture'
            onChange={(e) => handleChange(e)}
          />
        </div>

        <button className={style.btn} type='submit'>
          Modificar Autor
        </button>
      </form>

      <Link to='/putauthor'>
        <button className={style.btnAdmin}>↼ Back</button>
      </Link>
    </div>
  )
}
