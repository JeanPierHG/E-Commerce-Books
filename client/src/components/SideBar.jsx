import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from '../Styles/SideBar.module.css'

export default function SideBar() {
  const allBooks = useSelector((state) => state.booksTop)

  const orderBooksByRating = allBooks.sort((a, b) => {
    if (a.rating > b.rating) return -1
    if (b.rating > a.rating) return 1
    return 0
  })

  const top5Rating = orderBooksByRating.slice(0, 5)

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
                    <h3>#{i + 1}</h3>
                    <img src={book.cover} className={styles.img}></img>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          'No'
        )}
      </div>
      <div>
        <h3 className={styles.title}>Top 5 Sold</h3>
        <h5>Soon...</h5>
      </div>
    </div>
  )
}
