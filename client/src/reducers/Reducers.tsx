export const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") ? true : false,
  user: null,
};
export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "USER":
      return initialState;
    case "LOGGED_IN":
      return {
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user,
      };
    case "LOGGED_OUT":
      return { isLoggedIn: action.payload.isLoggedIn };

    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
};
