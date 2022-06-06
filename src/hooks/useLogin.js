import { useState, useEffect } from "react";
import { login } from "../http/userApi";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const userLogin = async (email, password) => {
        try {
            const res = await login(email, password)
            if(!res){
                throw new Error('wrong password or email')
            }
            dispatch({type: 'LOGIN', payload: res})
        
        if (!isCancelled) {
            setIsPending(false)
            setError(null)
          }
        } catch (err) {
            if (!isCancelled) {
                setError(err.message)
                setIsPending(false)
            }
        }
    }
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])
    return {userLogin, error, isPending}
};
