const initialState = {
  books: [],
  booksCopy: [],
  booksTop: [],
  booksAdmin: [],
  booksAdminCopy: [],
  bookDetails: [],
  comments:[],
  authors: [],
  authorsCopy: [],
  authorsAdmin: [],
  authorsAdminCopy: [],
  authorDetails: [],
  users: [],
  usersCopy: [],
  userLogged: [],
  usersFavAll:[],
  usersFavShowed:[],
  userLoggedFavsBooksShowed:[],
  cart: [],
  cartAmount:0,
  render: [],
  carousel: [],
  purchaseOrder: [],
  orders:[],
  ordersCopy:[]
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_BOOKS":
      const showBooks = action.payload.filter(
        (book) => book.isHidden === false
      );
      return {
        ...state,
        books: showBooks,

        booksCopy: showBooks,
        booksTop: showBooks,
      };

    case "GET_BOOKS_ADMIN":
      return {
        ...state,
        booksAdminCopy: action.payload,
        booksAdmin: action.payload,
      };

    case "GET_AUTHORS_ADMIN":
      return {
        ...state,

        authorsAdmin: action.payload,
        authorsAdminCopy: action.payload,
      };

    case "GET_BOOK_TITLE":
      const titleCopy = state.booksCopy;
      const title = titleCopy.filter((e) =>
        e.title.toLowerCase().includes(action.payload.toLowerCase())
      );

      return {
        ...state,
        books: title,
      };

    case "GET_BOOK_TITLE_ADMIN":
      const titleCopyAdmin = state.booksAdminCopy;
      const titleAdmin = titleCopyAdmin.filter((e) =>
        e.title.toLowerCase().includes(action.payload.toLowerCase())
      );

      return {
        ...state,
        booksAdmin: titleAdmin,
      };

    case "GET_AUTHOR_NAME_ADMIN":
      const nameCopyAdmin = state.authorsAdminCopy;
      const nameAdmin = nameCopyAdmin.filter(
        (e) =>
          e.name.toLowerCase().includes(action.payload.toLowerCase()) ||
          e.surname.toLowerCase().includes(action.payload.toLowerCase())
      );

      return {
        ...state,
        authorsAdmin: nameAdmin,
      };

    case "GET_AUTHOR_NAME":
      const nameCopy = state.authorsCopy;
      const name = nameCopy.filter(
        (e) =>
          e.name.toLowerCase().includes(action.payload.toLowerCase()) ||
          e.surname.toLowerCase().includes(action.payload.toLowerCase())
      );

      return {
        ...state,
        authors: name,
      };

    case "GET_BOOK_DETAILS":
      return {
        ...state,
        bookDetails: action.payload,
      };
    
    case "GET_BOOK_COMMENTS":
      return {
        ...state,
        comments:action.payload
      }
    case "CLEAR_COMMENTS":
      return {
        ...state,
        comments:[]
      }

    case "GET_BOOK_GENRE":
      return {
        ...state,
        books: action.payload,
      };

    case "GET_AUTHORS":
      const showAuthors = action.payload.filter(
        (author) => author.isHidden === false
      );

      return {
        ...state,
        authors: showAuthors,
        authorsCopy: showAuthors,
      };

    case "GET_AUTHOR_DETAILS":
      return {
        ...state,
        authorDetails: action.payload,
      };

    case "POST_BOOK":
      console.log("reducer book:", action.payload);

      return {
        ...state,
        books: [...state.books, action.payload],
        booksCopy: [...state.booksCopy, action.payload],
      };

    case "POST_AUTHOR":
      const escritor = action.payload;
      console.log("REDUCER:", escritor);
      return {
        ...state,
        authors: [...state.authors, action.payload],
      };

    case "CLEAR_PAGE_AUTHOR_DETAILS":
      return {
        ...state,
        authorDetails: {},
      };

    case "CLEAR_PAGE_BOOK_DETAILS":
      return {
        ...state,
        bookDetails: {},
      };

    case "ORDER_BY_NAME":
      let booksByOrderName =
        action.payload === "Asc"
          ? state.books.sort((a, b) => {
              if (a.title > b.title) return 1;
              if (b.title > a.title) return -1;
              return 0;
            })
          : state.books.sort((a, b) => {
              if (a.title > b.title) return -1;
              if (b.title > a.title) return 1;
              return 0;
            });
      return {
        ...state,
        books: booksByOrderName,
      };

    case "ORDER_BY_PRICE":
      let booksOrderByPrice =
        action.payload === "desc"
          ? state.books.sort((a, b) => {
              if (a.price > b.price) return 1;
              if (b.price > a.price) return -1;
              return 0;
            })
          : state.books.sort((a, b) => {
              if (a.price > b.price) return -1;
              if (b.price > a.price) return 1;
              return 0;
            });
      return {
        ...state,
        books: booksOrderByPrice,
      };

    case "ORDER_BY_RATING":
      let booksOrderByRating =
        action.payload === "desc"
          ? state.books.sort((a, b) => {
              if (a.rating > b.rating) return 1;
              if (b.rating > a.rating) return -1;
              return 0;
            })
          : state.books.sort((a, b) => {
              if (a.rating > b.rating) return -1;
              if (b.rating > a.rating) return 1;
              return 0;
            });
      return {
        ...state,
        books: booksOrderByRating,
      };

    case "ORDER_BY_NAME_AUTHOR":
      let authorsOrderByName =
        action.payload === "Asc"
          ? state.authors.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : state.authors.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });
      return {
        ...state,
        authors: authorsOrderByName,
      };

    case "ORDER_BY_NAME_ADMIN_AUTHOR":
      let authorsAdminOrderByName =
        action.payload === "Asc"
          ? state.authorsAdmin.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : state.authorsAdmin.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });
      return {
        ...state,
        authorsAdmin: authorsAdminOrderByName,
      };

    case "ORDER_BY_NAME_ADMIN_BOOKS":
      let booksAdminByOrderName =
        action.payload === "Asc"
          ? state.booksAdmin.sort((a, b) => {
              if (a.title > b.title) return 1;
              if (b.title > a.title) return -1;
              return 0;
            })
          : state.booksAdmin.sort((a, b) => {
              if (a.title > b.title) return -1;
              if (b.title > a.title) return 1;
              return 0;
            });
      return {
        ...state,
        booksAdmin: booksAdminByOrderName,
      };

    case "ORDER_BY_STOCK_ADMIN_BOOKS":
      let booksAdminOrderByStock =
        action.payload === "Asc"
          ? state.booksAdmin.sort((a, b) => {
              if (a.stock > b.stock) return 1;
              if (b.stock > a.stock) return -1;
              return 0;
            })
          : state.booksAdmin.sort((a, b) => {
              if (a.stock > b.stock) return -1;
              if (b.stock > a.stock) return 1;
              return 0;
            });
      return {
        ...state,
        booksAdmin: booksAdminOrderByStock,
      };

    case "GET_USERS":
      
      
      return {
        ...state,
        users: action.payload,
        usersCopy: action.payload,
        usersFavAll: action.payload,
        usersFavShowed: action.payload
        
      };

    case "POST_USER":
      const loggedFavBooks = action.payload[0].favouritesBooks
      const loggedFavBooksShowed = loggedFavBooks.filter(book=>book.isHidden===false)
      

      return {
        ...state,
        userLogged: action.payload,
        userLoggedFavsBooksShowed: loggedFavBooksShowed
      };

    case "GET_USER_NAME":
      const nameUCopy = state.usersCopy;
      const nameU = nameUCopy.filter(
        (e) =>
          e.name.toLowerCase().includes(action.payload.toLowerCase()) ||
          e.nickname.toLowerCase().includes(action.payload.toLowerCase()) ||
          e.email.toLowerCase().includes(action.payload.toLowerCase())
      );

      return {
        ...state,
        users: nameU,
      };

      case "GET_USER_NAME_ORDERS":
      const nameUOrderCopy = state.ordersCopy;
      const nameUOrder = nameUOrderCopy.filter(
        (order) =>
          order.usuario[0].email.toLowerCase().includes(action.payload.toLowerCase())
      );

      return {
        ...state,
        orders: nameUOrder,
      };

    case 'PURCHASE_ORDER':

      return {
        ...state,
        purchaseOrder: [...state.purchaseOrder, action.payload]
      }

    case "ADD_TO_CART":
      let newCart = state.cart;
      let repeats = false;
      let index = "";
      newCart.map((e, i) => {
        if (e._id === action.payload._id) {
          repeats = true;
          index = i;
        }
      });
      if (repeats) {
        //console.log("Repetido");
        newCart[index].amount++;
      } else {
        newCart.push(action.payload);
        newCart[newCart.length - 1].amount = 1;
        //console.log("No repetido");
      }
      return {
        ...state,
        cart: newCart,
        render: Math.random(),
      };

    case 'ADD_TO_CART_PURCHASE_ORDER':
      let newCart4 = state.purchaseOrder;
      let newCart5 = state.cart;
      let rep = false;
      let index4 = '';
      let titleId = '';
      
      newCart5.map((e, i) => {
        if (e._id === action.payload) {
          titleId = e.title;
        }
      })
      
      newCart4.map((e, i) => {
        if (e.title === titleId) {
          rep = true;
          index4 = i;
        }
      })
      
      if (rep) {
        newCart4[index4].quantity++;
      } 
      return {
        ...state, 
        purchaseOrder: newCart4,
      }

    case "REMOVE_ONE_FROM_CART":
      let newCart2 = state.cart;
      let index2 = "";
      newCart2.map((e, i) => {
        if (e._id === action.payload) {
          index2 = i;
        }
      });
      if (newCart2[index2].amount === 1) {
        newCart2.splice(index2, 1);
      } else {
        newCart2[index2].amount--;
      }
      return {
        ...state,
        cart: newCart2,
        render: Math.random(),
      };

    case 'REMOVE_ONE_FROM_CART_PURCHASE_ORDER':
      let newCart6 = state.purchaseOrder;
      let newCart7 = state.cart;
      let index5 = '';
      let titleId1 = '';

      newCart7.map((e, i) => {
        if (e._id === action.payload) {
          titleId1 = e.title;
        }
      })

      newCart6.map((e, i) => {
        if (e.title === titleId1) {
          index5 = i;
        }
      })

      if (newCart6[index5].quantity === 1) {
        newCart6.splice(index5, 1);
      } else {
        newCart6[index5].quantity--;
      }

      return {
        ...state,
        purchaseOrder: newCart6,
      }

    case "REMOVE_ALL_FROM_CART":
      let newCart3 = state.cart;
      console.log("id :", action.payload);
      newCart3 = newCart3.filter((e) => e._id !== action.payload);
      return {
        ...state,
        cart: newCart3,
      };
    case 'UPDATE_AMOUNT':
      return{
        ...state,
        cartAmount:action.payload
      }

    case 'REMOVE_ALL_FROM_CART_PURCHASE_ORDER':
      let newCart8 = state.purchaseOrder;
      let newCart9 = state.cart;
      let titleId2 = '';

      newCart9.map((e, i) => {
        if (e._id === action.payload) {
          titleId2 = e.title;
        }
      })

      const newCart10 = newCart8.filter(e => e.title !== titleId2);

      return {
        ...state,
        purchaseOrder: newCart10,
      }

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
        purchaseOrder: [],
      };

    case "ADD_FAV":

      const loggedFavBooks2 = action.payload[0].favouritesBooks    
      const loggedFavBooksShowed2 = loggedFavBooks2.filter(book=>book.isHidden===false)
      
      return {
        ...state,
        userLogged: action.payload,
        userLoggedFavsBooksShowed: loggedFavBooksShowed2
      };
     

    case "DELETE_BOOK_FAV":
      const loggedFavBooks3 = action.payload[0].favouritesBooks
      const loggedFavBooksShowed3 = loggedFavBooks3.filter(book=>book.isHidden===false)

      return {
        ...state,
        userLogged: action.payload,
        userLoggedFavsBooksShowed: loggedFavBooksShowed3
      };

    case "POST_USER_DATA":
      return {
        ...state,
      };

    case "PUT_RATING":
      return {
        ...state,
        books: state.books.map((book) => {
          if (book._id === action.payload.book._id) {
            return action.payload.book;
          } else {
            return book;
          }
        }),
        userLogged: [action.payload.user],
      };

    case "GET_CAROUSEL_IMAGES":
      return {
        ...state,
        carousel: action.payload,
      };


   
          case "GET_ALL_ORDERS":
          
            return {
              ...state,
             orders:action.payload,
             ordersCopy:action.payload
            };


      case "GET_STATUS_ORDERS":
      const nameStatusOrderCopy = state.ordersCopy;
      const nameStatusOrder = nameStatusOrderCopy.filter(
        (order) =>
          order.status_order.toLowerCase().includes(action.payload.toLowerCase())
      );

      return {
        ...state,
        orders: nameStatusOrder,
      };

      
      case "GET_PAYMENT_STATUS":
      const namePaymentStatusCopy = state.ordersCopy;
      const namePaymentStatus = namePaymentStatusCopy.filter(
        (order) =>
          order.status.toLowerCase().includes(action.payload.toLowerCase())
      );

      return {
        ...state,
        orders: namePaymentStatus,
      };

      

    default:
      return state;
  }
}
export default rootReducer;
