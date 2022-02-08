import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const logout = async () => {
        setError(null)
        setIsPending(true)

        try {
            await signout()
            dispatch({ type: 'LOGOUT' })
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        } catch (err) {
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
        }
    };
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])
    return { logout, error, isPending }

};
