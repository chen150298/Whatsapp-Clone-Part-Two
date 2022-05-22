import './App.css';
import LoginForm from './Components/LoginForms/LoginForm';
import RegisterForm from "./Components/LoginForms/RegisterForm";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import {TokenContext} from "./TokenContext"
import {useState} from "react";

function App() {
    const [token, setToken] = useState('');
    return (
        <TokenContext.Provider value={{token, setToken}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginForm/>}/>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/register" element={<RegisterForm/>}/>
                    <Route path="/homepage/*" element={<HomePage/>}/>
                </Routes>
            </BrowserRouter>
        </TokenContext.Provider>
    );
}

export default App;
