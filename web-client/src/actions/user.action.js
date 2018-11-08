import actionTypes from "@/actionTypes";
import { userService } from "./services";

export default {
  tryAutoSignIn: () => async dispatch => {
    const response = await userService.tryAutoSignIn();
    const { data } = response;
    dispatch({
      type: actionTypes.USER_FETCH_TRY_AUTO_LOGIN,
      payload: data
    });
  },

  fetchSignUpUser: credentials => async dispatch => {
    dispatch({
      type: actionTypes.USER_FETCH_LOGIN
    });
    try {
      const response = await userService.fetchSignUpUser(credentials);
      const { data } = response;
      dispatch({
        type: actionTypes.USER_FETCH_LOGIN_SUCCESS,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: actionTypes.ERROR_USER,
        payload: data.meta.message
      });
    }
  },

  fetchSignInUser: credentials => async dispatch => {
    dispatch({
      type: actionTypes.USER_FETCH_LOGIN
    });
    try {
      const response = await userService.fetchSignInUser(credentials);
      const { data } = response;
      dispatch({
        type: actionTypes.USER_FETCH_LOGIN_SUCCESS,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: actionTypes.ERROR_USER,
        payload: data.meta.message
      });
    }
  },

  signOutUser: () => dispatch => {
    dispatch({
      type: actionTypes.USER_LOGOUT
    });
  },
  fetchClickLog: newsDigestId => dispatch => {
    userService.fetchClickLog(newsDigestId);
    dispatch({
      type: actionTypes.USER_FETCH_CLICK_LOG
    });
  }
};
