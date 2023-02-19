import React from "react";
import { useRef, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import styles from './Login.module.css'
import { callApi } from "../api/apiCalls"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Login = ({ setToken }) => {
    const userRef = useRef();
    const errRef = useRef();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    async function loginHandler (e) {
        e.preventDefault()
    
        await callApi({
            url: "users/login", 
            method: "POST", 
            body: {username: username, password: password}
        }).then ((data) => {
            if (data) {
               alert(data.message)
               setToken(data.token)
               console.log(username, password);
               setUsername('');
               setPassword('');
               setSuccess(true);
            } else {
                alert("Username or password is incorrect")
            }
        }).catch ((error) => {
            alert(error.message)
        }) 
    }

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

return (
    <div className={styles.MainDiv}>
    {success ? (
        <section>
            <h1>You are Logged in!</h1>
            <br />
                <Link to = "/">
                <p>Go to Home</p>
                </Link>
        </section>
    ) : (
    <section className={styles.Cards}>
        <p ref={errRef} className={errMsg ? "errmsg" : 
        "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Sign In</h1>
        <form className = {styles.loginForm} onSubmit={loginHandler}>
            <label className = {styles.labels} htmlFor="username">Username: &nbsp;
            <TextField
                sx={{marginBottom: "10px"}} 
                size ="small"
                type="text" 
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={((e) => setUsername(e.target.value))}
                value={username}
                required
            />
            </label>
            <label className={styles.labels} htmlFor="password">Password:
            <TextField 
                sx={{marginLeft: "12px", marginBottom: "10px"}}
                size ="small"
                type="password" 
                id="password"
                ref={userRef}
                onChange={((e) => setPassword(e.target.value))}
                value={password}
                required
            />
            </label>
            <Button type = "submit" sx = {{ color: 'rgb(199, 190, 190)', background: 'rgb(90, 90, 90)'}} >Sign In</Button>
        </form>
        <p>
            Need an Account?<br />
            <span className="line">
                {/*put router link here*/}
                <Link to = "/register">
                <span className={styles.register}>Register here</span>
                </Link>
            </span>
        </p>
    </section>
    )}
    </div>
)
}

export default Login;