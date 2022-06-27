import axios from "axios";


/*export function getBooks () {

    return async function (dispatch) {
        const json = await axios.get('https://ecommercehenryx.herokuapp.com/books');
    
        return dispatch({
            type:'GET_BOOKS',
            payload: json.data
        })
    } 
}*/

export const getBooks = (title, price) => async (dispatch) => {
  try {
    var json = await axios.get("https://ecommercehenryx.herokuapp.com/books");
    dispatch({
      title: title,
      price: price,
      type: "GET_BOOKS",
      payload: json.data,
    });
  } catch (error) {
    dispatch({
      type: "ERROR_MESSAGE",
      payload: error,
    });
  }
};

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

  export function deleteAuthor (id){
    return async function (dispatch){
       const json = await axios.delete(`http://ecommercehenryx.herokuapp.com/authors/deleteAuthor/${id}`);
        return dispatch({
            type:'DELETE_AUTHOR',
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










