import './LoginForm.css'
import TextInput from "../LoginInputs/TextInput";
import PasswordInput from "../LoginInputs/PasswordInput";
import SubmitButton from "../SubmitButton/SubmitButton";
import {Link, Navigate} from "react-router-dom";
import {useContext} from "react";
import {TokenContext} from "../../TokenContext";
import {Login} from "../../Server/UserRequests";
import {ratingServer} from "../../Shared";

function LoginForm() {
    const {token,setToken} = useContext(TokenContext);

    if (token) { // check if user already logged in
        return <Navigate to="/homepage"/>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const pwd = document.getElementById('password').value;
        await Login(username,pwd,setToken);
    };

    return (
        <div className="form-box">
            <h1>Login Here</h1>
            <div id="alert"/>
            <form method="post" onSubmit={handleSubmit}>
                <TextInput icon='fa fa-user' id='username' placeholder='User Name' name='username' errorMessage="Username is required!" required/>
                <PasswordInput icon='fa fa-key' id='password' placeholder='Password' name='password' errorMessage="Password is required!" required/>
                <SubmitButton text='LOGIN'/>
            </form>
                <div className="message">
                    Not registered? <Link to="/register">click here</Link> to register.
                </div>
            <div className="message">
                Rate our app <a href={ratingServer}>here</a>.
            </div>
        </div>
    );
}

export default LoginForm;