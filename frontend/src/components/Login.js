import React, {useState} from "react";
import { Link, useHistory} from 'react-router-dom';
import { login, register } from "../api";

async function loginUser(username, password, setToken, history){
    try{
        const result = await login(username, password);
        if(result.success === false){
            document.getElementById("errorMessage").innerHTML = result.error.message;
        }else{
            const token = result.token;
            setToken(token);
            localStorage.setItem("token", token);
            history.push("/");
        }
    }catch (error){
        console.error("Error Logging in Users", error)
    }
}

async function registerUser(username, password, confirmPassword, setToken, history){
    if(confirmPassword === password){  
        try{
            const result = await register(username, password);
            if(result.success === false){
                document.getElementById("errorMessage").innerHTML = result.error.message;
            }else{
                const token = result.token;
                setToken(token);
                localStorage.setItem("token", token);
                history.push("/");
            }
        }catch (error){
            console.error("Error Logging in Users", error)
        }
    }else{
        document.getElementById("errorMessage").innerHTML = "Passwords must match!";
    }     
}

const Login = ({setToken , match}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const history = useHistory();

    return(
        <form className="m-3 w-50 position-absolute top-50 start-50 translate-middle" 
            onSubmit={(event) => {
                event.preventDefault();
                if(match.url === "/register"){
                    registerUser(username, password, confirmPassword, setToken, history);
                }else {
                    loginUser(username, password, setToken, history);
                }
            }}
        >
            <div className="mb-3">
                <label htmlFor="usernameInput" className="form-label">Username (min 5 Characters)</label>
                <input type="text" className="form-control" id="usernameInput" placeholder="Username..." minLength="5"
                    onChange={({target: {value}}) => setUsername(value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="passwordInput" className="form-label">Password (min 8 Characters)</label>
                <input type="password" className="form-control" id="passwordInput" placeholder="Password..." minLength="5"
                    onChange={({target: {value}}) => setPassword(value)}/>
            </div>
            {(match.url === "/register" ? 
                <div className="mb-3">
                    <label htmlFor="confirmPasswordInput" className="form-label">Confirm Password (min 8 Characters)</label>
                    <div className="input-group has-validation">
                        <input type="password" className="form-control" id="confirmPasswordInput" placeholder="Confirm Password..." minLength="5"
                            onChange={
                                ({target: {value}}) => {
                                    setConfirmPassword(value)
                                }
                        }/>
                    </div>
                </div>
            : null)}
            <div id="errorMessage" className="danger m-3"> </div>
            <button type="submit" className="btn btn-primary">Login</button>
            <div className="mb-3">                
                {(match.url === "/register" ?
                    <Link to="/login">Already a user? Login Here! </Link> 
                    :
                    <Link to="/register">Not a User? Register Here! </Link>
                )}
            </div>
        </form>
    )
}

export default Login;