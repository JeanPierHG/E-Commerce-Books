import React from 'react'
import DataTable from 'react-data-table-component'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'
import AdminSearchBarBooks from '../../SearchBars/AdminSearchBarBooks'
import AdminRefreshBooks from '../../RefreshButtons/AdminRefreshBooks'
import { Link } from 'react-router-dom'

import styledButton from '../../../../Styles/Button.module.css'

export default function StockTable() {
  const books = useSelector((state) => state.booksAdmin)

  const tabla = books.map((book) => {
    return {
      title: book.title,
      editorial: book.editorial,
      stock: book.stock,
    }
  })

  const columnas = [
    {
      name: 'Titulo',
      selector: 'title',
      sortable: true,
    },
    {
      name: 'Editorial',
      selector: 'editorial',
      sortable: true,
    },
    {
      name: 'Stock',
      selector: 'stock',
      sortable: true,
    },
  ]

  const paginacionOpciones = {
    rowsPerPageText: 'Filas Por Pagina',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'todos',
  }

  return (
    <div>
      <Link to='/stock'>
        <button className={styledButton.button}>Formato Cartas</button>
      </Link>

      <div>
        <AdminSearchBarBooks />
        <AdminRefreshBooks />
        <DataTable
          columns={columnas}
          data={tabla}
          title='Stock Libros'
          pagination
          paginationComponentOptions={paginacionOpciones}
          fixedHeader
          fixedHeaderScrollHeight='600px'
        />
      </div>
    </div>
  )
}
