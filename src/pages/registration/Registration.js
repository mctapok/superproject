import './Registration.css'
import { useState } from 'react';
import {useSignup} from '../../hooks/useSignup'


export default function Registration() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const {signup, error, isPending} = useSignup();


    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(name,email,password)
        console.log(email, password)
    }
    return (
        <form onSubmit={handleSubmit} className='signin-form'>
            <h2>sign up</h2>
            <label>
                <span>name:</span>
                <input
                    type="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
            </label>
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
            {/* <label> */}
                {/* <span>confirm password:</span>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label> */}
            <button className="btn">Sign in</button>
        </form>
    )
};
