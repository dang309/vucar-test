import { createContext, useEffect, useReducer } from "react";
// utils
import Cookies from "js-cookie";
import PropTypes from "prop-types";

import { AuthAPI, UserAPI } from "src/api";
import { SFACE_JWT_COOKIE } from "src/utils/constant";
import { isValidToken, setSession } from "src/utils/jwt";

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  UPDATE: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  method: "jwt",
  signIn: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
  changePassword: () => Promise.resolve(),
  updateProfile: () => Promise.resolve(),
});

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const jwt = Cookies.get(SFACE_JWT_COOKIE);

        if (jwt && isValidToken(jwt)) {
          setSession(jwt);

          const res = await UserAPI.me();
          if (res.status === 200) {
            const user = res.data.data;

            dispatch({
              type: "INITIALIZE",
              payload: {
                isAuthenticated: true,
                user,
              },
            });
          }
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const signIn = async (email, password) => {
    try {
      const res = await AuthAPI.login(email, password);
      if (res.status === 201) {
        const user = res.data.data;

        setSession(user?.jwt);
        dispatch({
          type: "LOGIN",
          payload: {
            user,
          },
        });
      }
    } catch (err) {
      return err;
    }
  };

  const signOut = async () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
    Cookies.remove(SFACE_JWT_COOKIE);
  };

  const changePassword = () => {};

  const updateProfile = async (id, data) => {
    return UserAPI.update(id, data).then((res) => {
      if (res.status === 200) {
        const user = res.data.data;
        dispatch({
          type: "UPDATE",
          payload: {
            user,
          },
        });
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        signIn,
        signOut,
        changePassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export { AuthContext, AuthProvider };
