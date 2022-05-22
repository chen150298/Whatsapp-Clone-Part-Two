import Alert from "../Components/Alert/Alert";
import $ from "jquery";
import {localServer} from "../Shared";


async function Login(username, password, setToken) {
    $.ajax({
        url: 'https://localhost:7097/api/Login?username=' + username + '&password=' + password,
        type: 'POST',
        contentType: "application/json",
        success: (data) => {
            setToken(data)
        },
        error: () => {
            Alert("User Name or Password incorrect!", "danger");
        }
    });
}

async function Register(values, setUser){
    try {
        let response = await fetch('https://localhost:7097/api/Register', {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'username': values.username,
                    'nickname': values.nickname,
                    'password': values.password
                })
            });
        if (response.status === 201){
            setUser(values);
        }
        if (response.status === 400){
            Alert("This Username is already taken","danger");
        }
    } catch (error) {
        console.log(error);
    }
}

async function GetLoggedUserId(token){
    try {
        let response = await
            fetch('https://'+localServer+'/api/Users/UserId', {
                headers: {
                    'accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
        let data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export {Login, Register, GetLoggedUserId};