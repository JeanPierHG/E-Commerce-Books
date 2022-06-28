const initialState = {
  books: [],
  booksCopy: [],
  booksTop: [],
  booksAdmin:[],
  bookDetails: [], 
  authors: [],
  authorsAdmin:[],
  authorDetails: [],
  users:[],
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

      
    // case "GET_BOOKS":
      
    //   const allBooks = action.payload;
    //   let booksOrder =
    //     action.genres === "All"
    //       ? allBooks
    //       : allBooks.filter((element) =>
    //           element.genres.find((e) => e.genres === action.genres)
    //         );
      
    //   if (action.price !== undefined) {
    //     booksOrder =
    //       action.price === "Asc"
    //         ? booksOrder.sort(function (a, b) {
    //             if (a.price > b.price) {
    //               return 1;
    //             }
    //             if (b.price > a.price) {
    //               return -1;
    //             }
    //             return 0;
    //           })
    //         : booksOrder.sort(function (a, b) {
    //             if (a.price > b.price) {
    //               return -1;
    //             }
    //             if (b.price > a.price) {
    //               return 1;
    //             }
    //             return 0;
    //           });
    //   } else if (action.title !== undefined) {
    //     booksOrder =
    //       action.title === "Asc"
    //         ? booksOrder.sort(function (a, b) {
    //             if (a.title.toLowerCase() > b.title.toLowerCase()) {
    //               return 1;
    //             }
    //             if (b.title.toLowerCase() > a.title.toLowerCase()) {
    //               return -1;
    //             }
    //             return 0;
    //           })
    //         : booksOrder.sort(function (a, b) {
    //             if (a.title.toLowerCase() > b.title.toLowerCase()) {
    //               return -1;
    //             }
    //             if (b.title.toLowerCase() > a.title.toLowerCase()) {
    //               return 1;
    //             }
    //             return 0;
    //           });
    //   } /* else {
    //     action.rating === "Asc"
    //       ? rating.sort(function (a, b) {
    //           if (a.rating > b.rating) {
    //             return 1;
    //           }
    //           if (b.rating > a.rating) {
    //             return -1;
    //           }
    //           return 0;
    //         })
    //       : rating.sort(function (a, b) {
    //           if (a.rating > b.rating) {
    //             return -1;
    //           }
    //           if (b.rating > a.rating) {
    //             return 1;
    //           }
    //           return 0;
    //         });
    //   } */
      
    //   return {
    //     ...state,
    //     books: booksOrder,
    //     booksCopy: action.payload,
    //     booksTop: action.payload
    //   };
      
      
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

              const nameCopyAdmin = state.authorsAdmin;
              const nameAdmin  = nameCopyAdmin.filter(e => e.name.toLowerCase().includes(action.payload.toLowerCase()));
  
              return {
                  ...state,
                  authorsAdmin: nameAdmin
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
      books: booksAdminByOrderName


      
  };

  case "GET_USERS":
    return {
      ...state,
      users: action.payload,
  }  


    default:
      return state;
  }

}


export default rootReducer;
