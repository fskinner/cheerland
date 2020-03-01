const initialState = {
  loading: true,
  rooms: [],
  errorMessage: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ROOMS_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "ROOMS_SUCCESS":
      return {
        ...state,
        loading: false,
        rooms: action.payload
      };
    case "ROOMS_FAILURE":
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
