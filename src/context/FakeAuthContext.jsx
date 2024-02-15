import { createContext, useContext, useReducer } from "react";
import PropTypes from 'prop-types';


const AuthContext = createContext()
const initialState = {
    user: null,
    isAuthenticated: false
}

const reducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case 'login':
            return {
                ...state,
                user: payload,
                isAuthenticated: true
            };

        case 'logout':
            return {
                ...initialState
            };
        default: throw new Error('Uknown action..')
    }

}

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { user, isAuthenticated } = state

    const FAKE_USER = {
        name: "Jack",
        email: "jack@example.com",
        password: "qwerty",
        avatar: "https://i.pravatar.cc/100?u=zz",
    };

    const login = (email, password) => {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({ type: 'login', payload: FAKE_USER })
        }
    }


    const logout = () => {
        dispatch({ type: 'logout' })
    }

    return <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};


//custom hook
const useAuth = () => {
    return useContext(AuthContext)
}


export { AuthProvider, useAuth }