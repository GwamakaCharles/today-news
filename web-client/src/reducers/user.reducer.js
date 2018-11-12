import actionTypes from "@/actionTypes";
import localStore from "@/util/localStore";
import sessionStore from "@/util/sessionStore";

const initialState = {
  isUserLoggedIn: false,
  currentUser: {},
  isLoading: false
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case actionTypes.USER_FETCH_TRY_AUTO_LOGIN:
      newState.currentUser = action.payload.user;
      sessionStore.setUserLoggedIn();
      newState.isUserLoggedIn = sessionStore.getLoginStatus();
      return newState;

    case actionTypes.USER_FETCH_LOGIN:
      newState.isLoading = true;
      return newState;

    case actionTypes.USER_FETCH_LOGIN_SUCCESS:
      newState.isLoading = false;
      localStore.authenticateUser(action.payload);
      newState.currentUser = action.payload.user;
      sessionStore.setUserLoggedIn();
      newState.isUserLoggedIn = sessionStore.getLoginStatus();
      return newState;

    case actionTypes.ERROR_USER:
      newState.isLoading = false;
      return newState;

    case actionTypes.USER_LOGOUT:
      localStore.deauthenticateUser();
      sessionStore.setUserLoggedOut();
      return initialState;

    default:
      return state;
  }
};
