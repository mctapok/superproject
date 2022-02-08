import { useState, useEffect } from "react";
import { registration } from "../http/userApi";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (name, email, password) => {
        try {
            const res = await registration(name, email, password)
            if (!res) {
                throw new Error('no response')
            }

            dispatch({ type: 'LOGIN', payload: res})

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

    return { signup, error, isPending }
}

