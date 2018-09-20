const booksReducer = (state = {}, action) => {
  let newState;
  Object.freeze(state);

  switch (action.type) {
    case "RECEIVE_ALL_BOOKS":
      newState = Object.assign({}, state, action.books);
      return newState;
    default:
      return state;
  }
};

export default booksReducer;
