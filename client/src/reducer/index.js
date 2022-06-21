const initialState = {
    books: [],
    booksCopy: [],
}

function rootReducer (state = initialState, action){
    switch(action.type){
        case 'GET_BOOKS':
            return{
                ...state,
                books: action.payload,
                booksCopy: action.payload,
            }

        case 'GET_BOOK_TITLE':
            return {
                ...state,
                books: action.payload
            }


        default:
            return state;
    }
}

export default rootReducer;