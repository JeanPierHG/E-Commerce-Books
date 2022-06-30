import axios from "axios";



export function getBooks(){
  return async function (dispatch){
  var json = await axios.get("https://ecommercehenryx.herokuapp.com/books");
      return dispatch({
          type:"GET_BOOKS",
          payload: json.data
      })
  }    
}

export function getBooksAdmin(){
  return async function (dispatch){
  var json = await axios.get("https://ecommercehenryx.herokuapp.com/books");
      return dispatch({
          type:"GET_BOOKS_ADMIN",
          payload: json.data
      })
  }    
}

export function getAuthorsAdmin(){
  return async function (dispatch){
  var json = await axios.get('https://ecommercehenryx.herokuapp.com/authors');
      return dispatch({
          type:"GET_AUTHORS_ADMIN",
          payload: json.data
      })
  }    
}

export function getBookDetails(id){

    return async function (dispatch){
        var json=await axios.get('https://ecommercehenryx.herokuapp.com/books/'+id)
        
        return dispatch({
            type:'GET_BOOK_DETAILS',
            payload:json.data
        })
    }    
}

export function getBookTitle (payload) {

    return {
        type: 'GET_BOOK_TITLE',
        payload: payload
    }
    
}

export function getBookTitleAdmin (payload) {

  return {
      type: 'GET_BOOK_TITLE_ADMIN',
      payload: payload
  }
  
}

export function getAuthorNameAdmin (payload) {

  return {
      type: 'GET_AUTHOR_NAME_ADMIN',
      payload: payload
  }
  
}

export function getAuthorName (payload) {

  return {
      type: 'GET_AUTHOR_NAME',
      payload: payload
  }
  
}

export function getBookGenre (value) {

    return async function (dispatch) {
        const json = await axios.get('https://ecommercehenryx.herokuapp.com/books/genre/' + value);

        return dispatch ({
            type: 'GET_BOOK_GENRE',
            payload: json.data
        })
    }
};
    




export function getAuthors () {

    return async function (dispatch) {
        const json = await axios.get('https://ecommercehenryx.herokuapp.com/authors');

        return dispatch ({
            type: 'GET_AUTHORS',
            payload: json.data
        })
    }
}

export function getAuthorDetails (id) {

  return async function (dispatch) {
      const json = await axios.get('https://ecommercehenryx.herokuapp.com/authors/' + id);
     
      return dispatch ({
          type: 'GET_AUTHOR_DETAILS',
          payload: json.data
      })
  }
}

export function clearPageAuthorDetails () {

    return {
        type: 'CLEAR_PAGE_AUTHOR_DETAILS',
        
    }
    
}

export function clearPageBookDetails () {

  return {
    type: 'CLEAR_PAGE_BOOK_DETAILS',
      
  }
  
}

export function postBook (payload){
    return async function (dispatch){
       const json = await axios.post('https://ecommercehenryx.herokuapp.com/books/addBook',payload);
        return dispatch({
            type:'POST_BOOK',
            payload: payload
          })
    }
}


export function postAuthor (payload){
    return async function (dispatch){
       const json = await axios.post('https://ecommercehenryx.herokuapp.com/authors/addAuthor',payload);
        return dispatch({
            type:'POST_AUTHOR',
            payload: payload
          })
    }
  };

  export function deleteBook (id){
    return async function (dispatch){
       const json = await axios.delete(`https://ecommercehenryx.herokuapp.com/books/deleteBook/${id}`);
        return dispatch({
            type:'DELETE_BOOK',
          })
    }
  };

  export function showHideBook (id){
    return async function (dispatch){
       const json = await axios.delete(`${id}`);
        return dispatch({
            type:'SHOW_HIDE_BOOK',
          })
    }
  };

  export function deleteAuthor (id){
    return async function (dispatch){
       const json = await axios.delete(`http://ecommercehenryx.herokuapp.com/authors/deleteAuthor/${id}`);
        return dispatch({
            type:'DELETE_AUTHOR',
          })
    }
  };

  export function showHideAuthor (id){
    return async function (dispatch){
       const json = await axios.delete(`${id}`);
        return dispatch({
            type:'SHOW_HIDE_AUTHOR',
          })
    }
  };


  export function putAuthor (payload,id){
    return async function (dispatch){
       const json = await axios.post(`http://ecommercehenryx.herokuapp.com/authors/update/${id}`,payload);
        return dispatch({
            type:'PUT_AUTHOR',
          })
    }
  };


  export function putBook (payload,id){
    return async function (dispatch){
       const json = await axios.post(`http://ecommercehenryx.herokuapp.com/books/update/${id}`,payload);
        return dispatch({
            type:'PUT_BOOK',
          })
    }
  };

  export function orderByPrice(payload){
    console.log('////pay:',payload)
    return{
        type: 'ORDER_BY_PRICE',
        payload: payload
    }
}

export function orderByName(payload){
  return{
      type: 'ORDER_BY_NAME',
      payload: payload
  }
}

export function orderByNameAdminAuthor(payload){
  return{
      type: 'ORDER_BY_NAME_ADMIN_AUTHOR',
      payload: payload
  }
}

export function orderByNameAdminBooks(payload){
  return{
      type: 'ORDER_BY_NAME_ADMIN_BOOKS',
      payload: payload
  }
}

export function orderByStockAdminBooks(payload){
  return{
      type: 'ORDER_BY_STOCK_ADMIN_BOOKS',
      payload: payload
  }
}


export function postUser (payload){
  return async function (dispatch){
     const json = await axios.post('https://ecommercehenryx.herokuapp.com/users/addUser',payload);
      return dispatch({
          type:'POST_USER',
          payload: json.data
        })
  }
};

export function getUsers (){
  return async function (dispatch){
     const json = await axios.get('https://ecommercehenryx.herokuapp.com/users');
     //console.log('///users:',json.data)
      return dispatch({
          type:'GET_USERS',
          payload: json.data
        })
  }
};

export function addToCart(id){
  console.log('id en action :',id)
  return async (dispatch)=>{
    const book=await axios.get('https://ecommercehenryx.herokuapp.com/books/'+id)
    console.log('book en action :',book)
    return dispatch({
      type:'ADD_TO_CART',
      payload:book.data
    })
  }
}
export function removeOneFromCart(id){
  return (dispatch)=>{
    return dispatch({
      type:'REMOVE_ONE_FROM_CART',
      payload:id
    })
  }
}
export function removeAllFromCart(id){
  return (dispatch)=>{
    return dispatch({
      type:'REMOVE_ALL_FROM_CART',
      payload:id
    })
  }
}
export function clearCart(){
  return (dispatch)=>{
    return dispatch({
      type:'CLEAR_CART',
      payload:'nada'
    })
  }
}



export function setToAdmin (id){
  return async function (dispatch){
     const json = await axios.post('https://ecommercehenryx.herokuapp.com/users/toggleAdmin/'+id);
     //console.log('///users:',json.data)
      return dispatch({
          type:'SET_TO_ADMIN',
          
        })
  }
};

export function setToUser (){
  return async function (dispatch){
     const json = await axios.put('https://ecommercehenryx.herokuapp.com/users/setAdmin/:id');
     //console.log('///users:',json.data)
      return dispatch({
          type:'SET_TO_USER',
          
        })
  }
};

export function addFav (payload, id){
  return async function (dispatch){
     const json = await axios.post(`https://ecommercehenryx.herokuapp.com/users/addDesiredBooks/${payload}/${id}`);
     
      return dispatch({
        type:'ADD_FAV',
        payload: json.data
      })
  }
};

export function deleteBookFav (payload, id){
  return async function (dispatch){
     const json = await axios.post(`https://ecommercehenryx.herokuapp.com/users/deleteDesiredBooks/${payload}/${id}`);
     
      return dispatch({
        type:'DELETE_BOOK_FAV',
        payload: json.data
      })
  }
};

  






