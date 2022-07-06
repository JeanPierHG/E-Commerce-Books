import React from "react";
import DataTable from 'react-data-table-component'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";



export default function AdminUsers(){

    const usuarios= useSelector(state=>state.users)

    //const[tableData, setTableData]= useState(columns)

    const [selectedRows,setSelectedRows]=useState([])

   

    // function onSelectionChange(){
    //     cosole.log('//""',select)
    // }

    
    function onSelectionChange(){
        console.log('AA')
    }
   
    

    
    

    const tablaUsers = usuarios.map(usuario=>
        {
        return(
        {
       id:usuario._id,
       name : usuario.name,
       email  : usuario.email,
       isAdmin : usuario.isAdmin,
       isPremiun: usuario.isPremiun,
       isBanned: usuario.isBanned
    }
    )})
    
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'Nombre',
        width: 150,
        editable: true,
      
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 150,
        editable: true,
      
    },
    {
        field: 'isAdmin',
        headerName: 'IsAdmin',
        width: 150,
        editable: true,
      
    },
    {
        field: 'isPremiun',
        headerName: 'isPremiun',
        width: 150,
        editable: true,
      
    },
    {
        field: 'isBanned',
        headerName: 'isBanned',
        width: 150,
        editable: true,
      
    }
   ]

//    function getRowId(e){
//     console.log(e.target.value)
//    }

//    function setSelectedRows(rows){
//     console.log('RR:',rows)
//    }


    // const paginacionOpciones = {
    //     rowsPerPageText: 'Filas Por Pagina',
    //     rangeSeparatorText: 'de',
    //     selectAllRowsItem: true,
    //     selectAllRowsItemText: 'todos'

    // }



    return(
        <div>
            <Box sx={{ height:600, width: '100%' }}>
           <DataGrid
            rows={tablaUsers}
            columns={columns}
            //data={tablaUsers}
            checkboxSelection
            //disableSelectionOnClick
            //title='Stock Libros'
            //pagination
            //onCellClick={e=>getRowId(e)}
            pageSize={8}
            rowsPerPageOptions={[5]}
           // paginationComponentOptions={paginacionOpciones}
            fixedHeader
            fixedHeaderScrollHeight="600px"
             onSelectionChange={(rows) => {setSelectedRows(rows)}}
             options={{ selection : true, }}
           
            />
            </Box>
        </div>
    )
}

