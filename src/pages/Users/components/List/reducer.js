const initialState = {
  loading: true,
  users: [],
  errorMessage: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "USERS_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "USERS_SUCCESS":
      return {
        ...state,
        loading: false,
        users: action.payload
      };
    case "USERS_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};

export { initialState, reducer };
