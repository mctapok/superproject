import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

// styles
import './Login.css'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {userLogin, error, isPending} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
       await userLogin(email, password)
    }

    return (
        <form onSubmit={handleSubmit} className='signin-form'>
            <h2>login</h2>
            <label>
                <span>email:</span>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>password:</span>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            {!isPending && <button className="btn">Login</button>}
            {isPending && <button className="btn" disabled>Loading...</button>}
            {error && <p>{error}</p>}
        </form>
    )
}