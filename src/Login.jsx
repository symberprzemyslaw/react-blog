import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const auth = getAuth();


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const login = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigate('/create')
            })
            .catch((error) => {
                setError(error.message);
            });
    }
    return (
        <div className="login-container">
            <form className="login">
                <label htmlFor="email">Email:</label>
                <input
                name="email"
                placeholder="email@example.com"
                type="email"
                required
                value={email}
                onChange={ e => setEmail(e.target.value)}
                ></input>
                <label htmlFor="password">Password:</label>
                <input
                placeholder="******"
                name="password"
                type="password"
                required
                value={password}
                onChange={ e => setPassword(e.target.value)}
                ></input>
                <button onClick={(e) => {
                    e.preventDefault()
                    login()
                }
                }>Log in</button>
                {error && <p>{error}</p>}

            </form>
        </div>
    )
}

export default Login;