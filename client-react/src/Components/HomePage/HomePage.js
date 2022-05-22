import "./HomePage.css"
import {useContext} from "react";
import {TokenContext} from "../../TokenContext";
import {Route, Routes, Navigate} from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Chat from "../Chat/Chat";

function HomePage() {
    const {token} = useContext(TokenContext);
    if (!token) { // check if user not logged in
        return <Navigate to="/login"/>;
    }
    return (
        <div className="app">
            <div className="app_body">
                <Sidebar/>
                <Routes>
                    <Route path="/chats/:chatId" element={<Chat/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default HomePage;