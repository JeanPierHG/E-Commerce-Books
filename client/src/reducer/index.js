const initialState = {
  books: [],
  booksCopy: [],
  booksTop: [],
  booksAdmin:[],
  bookDetails: [], 
  authors: [],
  authorsCopy: [],
  authorsAdmin:[],
  authorDetails: [],
  users:[],
  usersCpoy:[],
  userLogged:[],
  cart:[],
  render:[],
};


function rootReducer(state = initialState, action) {
  
  switch (action.type) {

    case "GET_BOOKS":
    return {
      ...state,
      books: action.payload,
      booksCopy: action.payload,
      booksTop: action.payload,
      booksAdmin: action.payload
  }   

  case "GET_BOOKS_ADMIN":
    return {
      ...state,
      booksCopy: action.payload,
      booksAdmin: action.payload
  } 

  case "GET_AUTHORS_ADMIN":
    return {
      ...state,
     
      authorsAdmin: action.payload
  } 
    
   case 'GET_BOOK_TITLE':

    const titleCopy = state.booksCopy;
    const title = titleCopy.filter(e => e.title.toLowerCase().includes(action.payload.toLowerCase()));

    return {
      ...state,
      books: title
    };

  case 'GET_BOOK_TITLE_ADMIN':

    const titleCopyAdmin = state.booksCopy;
    const titleAdmin  = titleCopyAdmin.filter(e => e.title.toLowerCase().includes(action.payload.toLowerCase()));

    return {
      ...state,
      booksAdmin: titleAdmin
    };

  case 'GET_AUTHOR_NAME_ADMIN':

    const nameCopyAdmin = state.authorsCopy;
    const nameAdmin  = nameCopyAdmin.filter(e => e.name.toLowerCase().includes(action.payload.toLowerCase()));
  
    return {
      ...state,
      authorsAdmin: nameAdmin
    };

  case 'GET_AUTHOR_NAME':

    const nameCopy = state.authorsCopy;
    const name = nameCopy.filter(e => e.name.toLowerCase().includes(action.payload.toLowerCase()));
    
    return {
      ...state,
      authors: name
    };
      
      
    case "GET_BOOK_DETAILS":
      
      return {
        ...state,
        bookDetails: action.payload,
      };

      
    case "GET_BOOK_GENRE":
      
      return {
        ...state,
        books: action.payload,
      };
      
      
    case 'GET_AUTHORS':

      return {
        ...state,
        authors: action.payload,
        authorsCopy: action.payload,
        authorsAdmin: action.payload
     }

     
     case 'GET_AUTHOR_DETAILS':

          return {
              ...state,
              authorDetails: action.payload
          }
      
      case 'POST_BOOK':
        console.log('reducer book:',action.payload)

        return({
            ...state,
            books:[...state.books,action.payload],
            booksCopy:[...state.booksCopy,action.payload]                        
        })
    
      case 'POST_AUTHOR':
          const escritor = action.payload
          console.log('REDUCER:',escritor)
          return({
            ...state,
            authors:[...state.authors,action.payload],
                               
      })

      case 'CLEAR_PAGE_AUTHOR_DETAILS':

        return{
          ...state,
          authorDetails: {}
        }

      case 'CLEAR_PAGE_BOOK_DETAILS':

        return{
          ...state,
          bookDetails: {}
        }


        
case 'ORDER_BY_NAME':
  let booksByOrderName = action.payload === 'Asc' ?
  state.books.sort((a,b)=>{
      if (a.title > b.title)return 1;               
      if(b.title > a.title)return -1;
      return 0
  }) :
  state.books.sort((a,b)=>{
      if(a.title>b.title)return -1;
      if(b.title>a.title)return 1;
      return 0
  })
  return {
      ...state,
      books: booksByOrderName
  };

  case 'ORDER_BY_PRICE':
  let booksOrderByPrice = action.payload === 'desc' ?
  state.books.sort((a,b)=>{
      if (a.price > b.price)return 1;               
      if(b.price > a.price)return -1;
      return 0
  }) :
  state.books.sort((a,b)=>{
      if(a.price>b.price)return -1;
      if(b.price>a.price)return 1;
      return 0
  })
  return {
      ...state,
      books: booksOrderByPrice
  };
      

  case 'ORDER_BY_NAME_ADMIN_AUTHOR':
  let authorsAdminOrderByName = action.payload === 'Asc' ?
  state.authorsAdmin.sort((a,b)=>{
      if (a.name > b.name)return 1;               
      if(b.name > a.name)return -1;
      return 0
  }) :
  state.authorsAdmin.sort((a,b)=>{
      if(a.name>b.name)return -1;
      if(b.name>a.name)return 1;
      return 0
  })
  return {
      ...state,
      authorsAdmin: authorsAdminOrderByName
  };

  case 'ORDER_BY_NAME_ADMIN_BOOKS':
  let booksAdminByOrderName = action.payload === 'Asc' ?
  state.booksAdmin.sort((a,b)=>{
      if (a.title > b.title)return 1;               
      if(b.title > a.title)return -1;
      return 0
  }) :
  state.booksAdmin.sort((a,b)=>{
      if(a.title>b.title)return -1;
      if(b.title>a.title)return 1;
      return 0
  })
  return {
      ...state,
      booksAdmin: booksAdminByOrderName


      
  };

  case 'ORDER_BY_STOCK_ADMIN_BOOKS':
    let booksAdminOrderByStock = action.payload === 'Asc' ?
    state.booksAdmin.sort((a,b)=>{
        if (a.stock > b.stock)return 1;               
        if(b.stock > a.stock)return -1;
        return 0
    }) :
    state.booksAdmin.sort((a,b)=>{
        if(a.stock>b.stock)return -1;
        if(b.stock>a.stock)return 1;
        return 0
    })
    return {
        ...state,
        booksAdmin: booksAdminOrderByStock
  
  
        
    };

  case "GET_USERS":
    return {
      ...state,
      users: action.payload,
      usersCpoy: action.payload
  }  ;

  case "POST_USER":
    //console.log('reducerPost:',action.payload)
    return {
      ...state,
      userLogged: [ action.payload ]
  }  
  case 'ADD_TO_CART':
    
    let newCart=state.cart;
    let repeats=false;
    let index=''
    newCart.map((e,i)=>{
      if (e._id===action.payload._id){
        repeats=true
        index=i
      }
    })
    if (repeats){
      console.log('Repetido')
      newCart[index].amount++
    }
    else{
      newCart.push(action.payload)
      newCart[newCart.length-1].amount=1
      console.log('No repetido')
    }
    return{
      ...state,
      cart:newCart,
      render:Math.random()
    }
  
  case 'REMOVE_ONE_FROM_CART':
    let newCart2=state.cart;
    let index2='';
    newCart2.map((e,i)=>{
      if (e._id===action.payload){
        index2=i;
      }
    })
    if (newCart2[index2].amount===1){
      newCart2.splice(index2,1)
    }
    else {
      newCart2[index2].amount--
    }
    return{
      ...state,
      cart:newCart2,
      render:Math.random()
    }

  case 'REMOVE_ALL_FROM_CART':
    let newCart3=state.cart;
    console.log('id :',action.payload)
    newCart3=newCart3.filter(e=>e._id!==action.payload)
    return{
      ...state,
      cart:newCart3
    }

  case 'CLEAR_CART':
    return{
      ...state,
      cart:[]
    }
    
  case 'ADD_FAV':
    
      return({
        ...state,
        userLogged: [action.payload]
      })
  
  case 'DELETE_BOOK_FAV':
    
    return({
      ...state,
      userLogged: [action.payload]
    })

    default:
      return state;
  }

}


export default rootReducer;
