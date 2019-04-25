import * as actionTypes from 'store/actions/actionTypes';
import jwt_decode from 'jwt-decode';
import { handleErrors } from 'utility';
import history from 'history.js';

import { Auth } from 'aws-amplify';

export const signupStart = () => {
    return {
        type: actionTypes.SIGNUP_START
    };
};

export const signupSuccess = (userId) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        userId: userId,
    };
};

export const signupFail = (signupError) => {
    return {
        type: actionTypes.SIGNUP_FAIL,
        signupError: signupError
    };
};

export const signup = ( email, password ) => {
    return dispatch => {
      dispatch(signupStart());
      Auth.signUp({
        username: email,
        password: password
        })
        .then(data => console.log(data))
        .catch(err => console.log(err));
      };
  }

export const loginStart = () => {
  return {
      type: actionTypes.LOGIN_START
  };
};

export const loginSuccess = (token, id) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        token: token,
        id: id
    };
};

export const loginFail = (error) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error: error
    };
};

export const login = (email, password) => {

    return dispatch => {
      dispatch(loginStart());
      const authData = {
          auth: {
            email: email,
            password: password
          }
      };
      let url = 'http://localhost:3001/api/user_token';
      fetch(url, {
              method: "POST",
              mode: "cors",
              credentials: "same-origin",
              headers: {
                  "Content-Type": "application/json; charset=utf-8",
              },
              body: JSON.stringify(authData),
          })
          .then(response => {if(!response.ok) {throw Error(response.status)}
              return response
            })
          .then( response => {
            return response.json()
          })
          .then(json =>
            {
              const decodedJWT = jwt_decode(json.jwt);
              const expirationDate = new Date(decodedJWT.exp * 1000);
              localStorage.setItem('token', json.jwt);
              localStorage.setItem('expirationDate', expirationDate);
              localStorage.setItem('userId', decodedJWT.sub)
              dispatch(loginSuccess(json.jwt, decodedJWT.sub));
              dispatch(checkAuthTimeout(decodedJWT.exp))
          })
            .catch(err => {
              if(err.message === "404"){
                dispatch(loginFail("Not Found"))
              }
              if(err.message === "Failed to fetch"){
                dispatch(loginFail("No Connection"))
                history.push('/page-not-found');
              }

            });
          };
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, 1000 * 60 * 60 * 25);
    };
};

export const authCheckState = () => {
  return dispatch => {
      const token = localStorage.getItem('token');
      if (!token) {
          dispatch(logout());
      } else {
          const expirationDate = new Date(localStorage.getItem('expirationDate'));
          if (expirationDate <= new Date()) {
              dispatch(logout());
          } else {
              const userId = localStorage.getItem('userId');
              dispatch(loginSuccess(token, userId));
              dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ))
          }
      }
  };
};
