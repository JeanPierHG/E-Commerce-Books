import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAuthors } from '../actions'
import CardAuthor from './CardAuthor'
import { animateScroll as scroll } from 'react-scroll'
import SearchBarAuthor from './SearchBarAuthor'
import { useState } from 'react'
import { orderByNameAuthor } from '../actions'
import styles from '../Styles/author.module.css'
import styledButton from '../Styles/Button.module.css'

const Author = () => {
  const dispatch = useDispatch()
  const authors = useSelector((state) => state.authors)
  const [order, setOrder] = useState(true)
  // const orderedAuthors = authors.sort(function (a, b) {
  //     if (a.name.toLowerCase() > b.name.toLowerCase()) {
  //       return 1;
  //     }
  //     if (b.name.toLowerCase() > a.name.toLowerCase()) {
  //       return -1;
  //     }
  //     return 0;
  // })
  useEffect(() => {
    dispatch(getAuthors())
    console.log('HOOOOOME');
  }, []);

  useEffect(() => {
    scroll.scrollToTop()
  }, [])

  const handleClickAuthors = (e) => {
    e.preventDefault()
    dispatch(getAuthors())
    navigate('/admin/')
    scroll.scrollTo('gaston')
  }

  function handleOrderByName(e) {
    dispatch(orderByNameAuthor(e.target.value))
    setOrder(`Ordenado ${e.target.value}`)
  }

  return (
    <div className={styles.authors}>
      <div className={styles.containerActions}>
        <Link to='/admin'>
          <button className={styledButton.button} onClick={handleClickAuthors}>
            Todos los Autores
          </button>
        </Link>

        <SearchBarAuthor />

        <div>
          <select
            className={styles.selectOrder}
            onChange={(e) => handleOrderByName(e)}
            defaultValue='default'
          >
            <option value='default' disabled>
              Orden alfabético
            </option>
            <option value='Asc'>Nombre Ascendente</option>
            <option value='desc'>Nombre Descendente</option>
          </select>
        </div>
      </div>

      <ol className={styles.container}>
        {authors.length
          ? authors.map((e) => (
              <Link to={'/author/' + e._id} className={styles.Link}>
                <CardAuthor
                  name={e.name}
                  surname={e.surname}
                  picture={e.picture}
                />
              </Link>
            ))
          : 'No se encontro el Escritor'}
      </ol>
    </div>
  )
}

export default Author
