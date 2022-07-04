import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from '../Styles/Carousel.module.css'
import style from '../Styles/CarrouselBooks.module.css'
import Fav from './Fav'

export default function CarrouselBookEnAuthor({ booksEscritor }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentBook, setcurrentBook] = useState(booksEscritor[0])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      next()
    }, 5000)
    return () => clearInterval(interval)
  })

  const previus = () => {
    setLoaded(false)
    setTimeout(() => {
      if (currentIndex !== 0) {
        setCurrentIndex(currentIndex - 1)
        setcurrentBook(booksEscritor[currentIndex - 1])
      } else {
        setCurrentIndex(booksEscritor.length - 1)
        setcurrentBook(booksEscritor[booksEscritor.length - 1])
      }
    }, 500)
  }
  const next = () => {
    setLoaded(false)
    setTimeout(() => {
      if (currentIndex !== booksEscritor.length - 1) {
        setCurrentIndex(currentIndex + 1)
        setcurrentBook(booksEscritor[currentIndex + 1])
      } else {
        setCurrentIndex(0)
        setcurrentBook(booksEscritor[0])
      }
    }, 500)
  }
  return (
    <div className={styles.all}>
      <div className={styles.container}>
        <Link to={'/book/' + currentBook?._id}>
          <img
            src={currentBook?.cover}
            alt='Cover'
            className={loaded ? styles.loaded : styles.img}
            onLoad={() => {
              setLoaded(true)
            }}
          />
        </Link>
        <button className={style.btn}>Comprar</button>

        <Fav book={currentBook._id} />

        <div>
          <button onClick={previus} className={styles.buttons}>
            {'<'}
          </button>
          <button onClick={next} className={styles.buttons}>
            {'>'}
          </button>
        </div>
      </div>
    </div>
  )
}
