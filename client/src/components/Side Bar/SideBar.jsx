import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from '../../Styles/SideBar.module.css'
import { WiStars } from 'react-icons/wi'
export default function SideBar() {
  const allBooks = useSelector((state) => state.booksTop)

  const topBooks = [...allBooks]

  const orderBooksByRating = topBooks.sort((a, b) => {
    if (a.rating > b.rating) return -1
    if (b.rating > a.rating) return 1
    return 0
  })

  const top5Rating = orderBooksByRating.slice(0, 5)

  const orderBooksBySold = topBooks.sort((a, b) => {
    if (a.soldCount > b.soldCount) return -1
    if (b.soldCount > a.soldCount) return 1
    return 0
  })

  const top5Sold = orderBooksBySold.slice(0, 5)

  return (
    <div className={styles.container}>
      <div className={styles.containerTitle}>
        <h3 className={styles.title}>Top 5 Rating</h3>
      </div>
      <div>
        {top5Rating.length ? (
          <div className={styles.top}>
            {top5Rating.map((book, i) => {
              return (
                <Link className={styles.link} to={'/book/' + book._id}>
                  <div className={styles.card}>
                    <div className={`${styles.face} ${styles.face_front}`}>
                      <h3>#{i + 1}</h3>
                      <img src={book.cover} className={styles.img}></img>
                    </div>
                    <div className={`${styles.face} ${styles.face_back}`}>
                      <p> {book.title} </p>
                      <p>Páginas: {book.pages}</p>
                      <div className={styles.cardRating}>
                        <WiStars color='yellow' fontSize={'48px'} />{' '}
                        <p>{book.rating}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          'No'
        )}
      </div>
      <div className={styles.containerTitle}>
        <h3 className={styles.title}>Top 5 Sold</h3>
      </div>
      <div>
        {top5Sold.length ? (
          <div className={styles.top}>
            {top5Sold.map((book, i) => {
              return (
                <Link className={styles.link} to={'/book/' + book._id}>
                  <div className={styles.card}>
                    <div className={`${styles.face} ${styles.face_front}`}>
                      <h3>#{i + 1}</h3>
                      <img src={book.cover} className={styles.img}></img>
                    </div>
                    <div className={`${styles.face} ${styles.face_back}`}>
                      <p> {book.title} </p>
                      <p>Páginas: {book.pages}</p>
                      <div className={styles.cardRating}>
                        <WiStars color='yellow' fontSize={'48px'} />{' '}
                        <p>{book.rating}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          'No'
        )}
      </div>
    </div>
  )
}
