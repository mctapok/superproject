
import { createContext, useReducer, useEffect } from "react";
import { isVerify } from "../http/userApi";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload }
        case 'LOGOUT':
            return { ...state, user: null }
        case 'AUTH_IS_READY':
            return { user: action.payload,  authIsReady: true }
        default:
            return state
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false
    })



    useEffect(() => {
         isVerify().then(r => {console.log(r)
            dispatch({type:'AUTH_IS_READY', payload: r})
        })
        isVerify();
    }, [])

    console.log(state)

    return (<AuthContext.Provider value={{ ...state, dispatch }}>
        {children}
    </AuthContext.Provider>)
}