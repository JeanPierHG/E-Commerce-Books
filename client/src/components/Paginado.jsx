import styles from "../Styles/Paginado.module.css";

export default function Paginado({ bookPerPage, books1, paginado, page }) {
  const pageNum = [];

  for (let i = 1; i <= Math.ceil(books1 / bookPerPage); i++) {
    pageNum.push(i);
  }
  return (
    <div className={styles.nav}>
      {pageNum &&
        pageNum.map((num) => (
          <div key={num}>
            <button
              className={num === page ? styles.btnSel : styles.btnNav}
              onClick={() => paginado(num)}
            >
              {num}
            </button>
          </div>
        ))}
    </div>
  );
}
