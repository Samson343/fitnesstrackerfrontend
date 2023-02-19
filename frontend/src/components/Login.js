import React from "react";
import { useRef, useEffect, useState } from "react"
import styles from './Login.module.css'
import { callApi } from "../api/apiCalls"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';





const Login = () => {
    const userRef = userRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user, password);
        setUser('');
        setPassword('');
        setSuccess(true);
    }

return (
    <>
    {success ? (
        <section>
            <h1>You are Logged in!</h1>
            <br />
            <p>
                <a href="#">Go to Home</a>
            </p>
        </section>
    ) : (
    <section>
        <p ref={errRef} className={errMsg ? "errmsg" : 
        "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input 
                type="text" 
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={((e) => setUser(e.target.value))}
                value={user}
                required
            />
            <label htmlFor="password">Password:</label>
            <input 
                type="password" 
                id="password"
                ref={userRef}
                onChange={((e) => setPassword(e.target.value))}
                value={password}
                required
            />
            <button>Sign In</button>
        </form>
        <p>
            Need an Account?<br />
            <span className="line">
                {/*put router link here*/}
                <a href="#">Sign Up</a>
            </span>
        </p>
    </section>
    )}
    </>
)
}

export default Login;