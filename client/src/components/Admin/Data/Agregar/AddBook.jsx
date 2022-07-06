import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { postBook } from '../../../../actions/index'
import { useDispatch, useSelector } from 'react-redux'
import style from '../../../../Styles/addBook.module.css'

export default function AddBook() {
  const dispatch = useDispatch()

  const allBooks = useSelector((state) => state.books)

  const genres = [
    'Salud',
    'Deportes',
    'Biografia',
    'Nutricion',
    'Filosofia',
    'Ensayo',
    'Desarrollo Personal',
    'Economia',
    'Espiritualidad',
    'Historia',
    'Negocios',
    'Psicologia',
    'Neurociencia',
  ]

  const [post, setPost] = useState({
    title: '',
    cover: '',
    rating: '',
    year: '',
    pages: '',
    editorial: '',
    price: '',
    authors: { name: '', surname: '' },
    genres: [],
    stock: '',
    review: '',
  })

  const [errors, setErrors] = useState({
    title: '',
    cover: '',
    rating: '',
    year: '',
    pages: '',
    editorial: '',
    price: '',
    authorsName: '',
    authorsSurname: '',
    genres: '',
    stock: '',
    review: '',
  })

  function validate(post) {
    let errors = {}
    let nameRegex = /^[a-zA-Z0-9 _]*$/g
    let titleRegex = /^[a-zA-Z _]*$/g
    if (!post.title) {
      errors.title = 'Ingresar titulo (!)'
    }

    if (post.title.length > 50) {
      errors.title = 'El titulo es demasiado largo'
    }

    if (!post.authors.name) {
      errors.authorsName = 'Ingresar nombre del autor '
    }

    if (post.authors?.name?.length > 50) {
      errors.authorsName = 'El nombre es demasiado largo'
    }

    if (!post.authors.name.match(/^[a-zA-Z]*$/g)) {
      errors.authorsName = 'El nombre solo puede contener letras'
    }

    if (!post.authors.surname) {
      errors.authorsSurname = 'Ingresar apellido del autor'
    }

    if (post.authors.surname.length > 50) {
      errors.authorsSurname = 'El apellido es demasiado largo'
    }

    if (!post.authors.surname.match(/^[a-zA-Z]*$/g)) {
      errors.authorsSurname = 'El apellido solo puede contener letras'
    }

    if (!post.editorial) {
      errors.editorial = 'Ingresar editorial'
    }

    if (post.editorial.length > 50) {
      errors.editorial = 'Nombre de editorial demasiado largo'
    }


    if (!post.cover) {
      errors.cover = 'Ingresar URL de la portada'
    }

    if (post.editorial.length > 50) {
      errors.editorial = 'Nombre de editorial demasiado largo'
    }

    if (!post.rating) {
      errors.rating = 'Ingresar el rating!'
    }

    if (
      post.rating < 0 ||
      post.rating > 10 ||
      !post.rating.match(/^[0-9]*$/g)
    ) {
      errors.rating = 'Debe ser un numero entre 0 y 10'
    }

    if (!post.year) {
      errors.year = 'Ingresar año'
    }

    if (post.year && !post.year.match(/^[0-9]*$/g)) {
      errors.year = 'Debe ser un numero'
    }

    if (!post.pages) {
      errors.pages = 'Ingresar cantidad de paginas'
    }

    if (post.pages > 3031) {
      errors.pages = 'La novela mas larga del mundo tiene 3.031 páginas'
    }

    if (post.pages && !post.pages.match(/^[0-9]*$/g)) {
      errors.pages = 'Debe ser un numero'
    }

    if (!post.price) {
      errors.price = 'Ingresar precio'
    }

    if (post.price > 99999999999) {
      errors.price = 'Muy caro'
    }

    if (post.price && !post.price.match(/^[0-9]*$/g)) {
      errors.price = 'Debe ser un numero'
    }

    if (!post.stock) {
      errors.stock = 'Ingresar stock'
    }

    if (post.stock > 999999999) {
      errors.stock = 'El numero es demasiado grande'
    }

    if (post.stock && !post.stock.match(/^[0-9]*$/g)) {
      errors.stock = 'Debe ser un numero'
    }

    if (!post.review) {
      errors.review = 'Ingresar una reseña/descripcion del libro'
    }

    if (post.review.length > 10000) {
      errors.review = 'Alcanzaste el limite de characteres'
    }

    if (!post.genres.length) {
      errors.genres = 'Ingresar al menos un genero'
    }

    return errors
  }

  useEffect(() => {
    setErrors(validate(post))
  }, [post])

  function handleChange(e) {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    })
  }

  function handleGenres(e) {
    setPost({
      ...post,
      genres: [...post.genres, e.target.value],
    })
  }

  function handleGenreDelete(genre) {
    setPost({
      ...post,
      genres: post.genres.filter((e) => e !== genre),
    })
  }

  function handleAuthorName(e) {
    setPost({
      ...post,
      authors: { ...post.authors, [e.target.name]: e.target.value },
    })
  }

  const [failedSubmit, setFailedSubmit] = useState(false)

  function handleSubmit(e) {
    e.preventDefault();
    if (Object.values(errors).length > 0){
     setFailedSubmit(true);
      return alert('Error, revisar formulario!')
    } else {
      dispatch(postBook(post))
      console.log('soy Post:', post)
      alert('¡Libro añadido!')
      setPost({
        title: '',
        cover: '',
        rating: '',
        year: '',
        pages: '',
        editorial: '',
        price: '',
        authors: { name: '', surname: '' },
        genres: [],
        stock: '',
        review: '',
      })
    }
  }

  return (
    <div className={style.form}>
      <h1 className={style.titleForm}>Add Book</h1>
      <form className={style.containerForm} onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Titulo:</label>
          <input
            type='text'
            value={post.title}
            name='title'
            onChange={(e) => handleChange(e)}
          />
          {(errors.title && failedSubmit) ||
          !errors.title?.split(' ').includes('Ingresar') ? (
            <p className={style.error}>{errors.title}</p>
          ) : null}
        </div>

        <div>
          <label>Nombre de Autor:</label>
          <input
            type='text'
            value={post.authors.name}
            name='name'
            onChange={(e) => handleAuthorName(e)}
          />
          {(errors.authorsName && failedSubmit) ||
          !errors.authorsName?.split(' ').includes('Ingresar') ? (
            <p className={style.error}>{errors.authorsName}</p>
          ) : null}
        </div>

        <div>
          <label>Apellido de Autor:</label>
          <input
            type='text'
            value={post.authors.surname}
            name='surname'
            onChange={(e) => handleAuthorName(e)}
          />
          {(errors.authorsSurname && failedSubmit) ||
          !errors.authorsSurname?.split(' ').includes('Ingresar') ? (
            <p className={style.error}>{errors.authorsSurname}</p>
          ) : null}
        </div>

        <div>
          <label>Editorial:</label>
          <input
            type='text'
            value={post.editorial}
            name='editorial'
            onChange={(e) => handleChange(e)}
          />
          {(errors.editorial && failedSubmit) ||
          !errors.editorial?.split(' ').includes('Ingresar') ? (
            <p className={style.error}>{errors.editorial}</p>
          ) : null}
        </div>

        <div>
          <label>Imagen:</label>
          <input
            type='text'
            value={post.cover}
            name='cover'
            onChange={(e) => handleChange(e)}
          />
          {(errors.cover && failedSubmit) ||
          !errors.cover?.split(' ').includes('Ingresar') ? (
            <p className={style.error}>{errors.cover}</p>
          ) : null}
        </div>

        <div>
          <label>Rating:</label>
          <input
            type='number'
            min='0'
            max='10'
            value={post.rating}
            name='rating'
            onChange={(e) => handleChange(e)}
          />
          {(errors.rating && failedSubmit) ||
          !errors.rating?.split(' ').includes('Ingresar') ? (
            <p className={style.error}>{errors.rating}</p>
          ) : null}
        </div>

        <div>
          <label>Año:</label>
          <input
            type='number'
            value={post.year}
            name='year'
            onChange={(e) => handleChange(e)}
          />
          {(errors.year && failedSubmit) ||
          !errors.year?.split(' ').includes('Ingresar') ? (
            <p className={style.error}>{errors.year}</p>
          ) : null}
        </div>

        <div>
          <label>Cantidad de paginas:</label>
          <input
            type='number'
            value={post.pages}
            name='pages'
            onChange={(e) => handleChange(e)}
          />
          {(errors.pages && failedSubmit) ||
          !errors.pages?.split(' ').includes('Ingresar') ? (
            <p className={style.error}>{errors.pages}</p>
          ) : null}
        </div>

        <div>
          <label>Precio:</label>
          <input
            type='number'
            value={post.price}
            name='price'
            onChange={(e) => handleChange(e)}
          />
          {(errors.price && failedSubmit) ||
          !errors.price?.split(' ').includes('Ingresar') ? (
            <p className={style.error}>{errors.price}</p>
          ) : null}
        </div>

        <div>
          <label>Stock:</label>
          <input
            type='number'
            value={post.stock}
            name='stock'
            onChange={(e) => handleChange(e)}
          />
          {(errors.stock && failedSubmit) ||
          !errors.stock?.split(' ').includes('Ingresar') ? (
            <p className={style.error}>{errors.stock}</p>
          ) : null}
        </div>

        <div>
          <label>Reseña</label>
          <textarea
            value={post.review}
            name='review'
            onChange={(e) => handleChange(e)}
          />
          {(errors.review && failedSubmit) ||
          !errors.review?.split(' ').includes('Ingresar') ? (
            <p className={style.error}>{errors.review}</p>
          ) : null}
        </div>

        <select
          className={style.select}
          onChange={(e) => handleGenres(e)}
          defaultValue='default'>
          <option value='default' disabled>
            Genres
          </option>
          {genres &&
            genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
        </select>
        {(errors.genres && failedSubmit) ||
        !errors.genres?.split(' ').includes('Ingresar') ? (
          <p className={style.error}>{errors.genres}</p>
        ) : null}
        {post.genres.map((genre) => (
          <div className={style.selectItems} key={genre}>
            <p className={style.selectGenre}>{genre}</p>
            <button
              className={style.selectButtonDelete}
              onClick={() => handleGenreDelete(genre)}>
              X
            </button>
          </div>
        ))}

        <button className={style.btn} type='submit'>
          Agregar Libro
        </button>
      </form>

      <Link to='/add'>
        <button className={style.btnAdmin}>↼ Back</button>
      </Link>
    </div>
  )
}
