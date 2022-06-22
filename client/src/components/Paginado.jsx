export default function Paginado({ bookPerPage, books1, paginado, page }) {
  const pageNum = [];

  for (let i = 1; i <= Math.ceil(books1 / bookPerPage); i++) {
    console.log("Entre aca:");
    pageNum.push(i);
  }
  return (
    <div>
      {pageNum &&
        pageNum.map((num) => (
          <div key={num}>
            <button onClick={() => paginado(num)}>{num}</button>
          </div>
        ))}
    </div>
  );
}
