import "./Sidebar.css"
import SidebarChat from "../SidebarChat/SidebarChat";
import AddNewChat from "../SidebarChat/AddNewChat";
import {useContext, useEffect, useRef, useState} from "react";
import {TokenContext} from "../../TokenContext";
import {GetChats} from "../../Server/ChatRequests";
import {GetLoggedUserId} from "../../Server/UserRequests";
import {HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {hubServer} from "../../Shared";

function Sidebar() {
    const {token, setToken} = useContext(TokenContext);
    const [chats,setChats]=useState([]);
    const [userId,setUserId]=useState('');
    const searchBox = useRef('');
    const [connection, setConnection] = useState(null);

    useEffect(()=>{
        const loadConnection = async () => {
            try {
                const connection = new HubConnectionBuilder()
                    .withUrl(hubServer)
                    .configureLogging(LogLevel.Information)
                    .build();
                await connection.on("LoadChats", async ()=>{ loadChat().catch(console.error); });
                await connection.on("LoadMessages", async ()=>{ loadChat().catch(console.error); });
                await connection.start();
                setConnection(connection);
            } catch (e) {
                console.log(e);
            }
        }
        loadConnection().catch(console.error);
    }, []);

    const loadChat = async () => {
        const allChats = await GetChats(token);
        setChats(allChats.filter((chat)=> chat?.name?.toUpperCase().includes(searchBox?.current?.value?.toUpperCase())));
    }

    const delInput = async () => {
        const input = document.getElementById("search_chats");
        input.value = '';
        await loadChat();
    }

    useEffect(  () => {
        loadChat().catch(console.error);
    }, []);

    useEffect(  () => {
        const GetUserId = async () => {
            setUserId(await GetLoggedUserId(token));
        }
        GetUserId().catch(console.error);
    }, []);

    const logout = () => {
      setToken('');

      /// logout function
    }

    return (
        <div className="sidebar">
            <div className="sidebar_header">
                {/*<img src={user.image} alt="avatar" className="user_picture"/>*/}
                <h3> Welcome {userId}! </h3>
                <div className="sidebar_header_right">
                    <i className="fa fa-power-off clickable" onClick={logout}/>
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_search_container">
                    <i className="fa fa-magnifying-glass"/>
                    <input placeholder="Search for chats here" id="search_chats" type="text" name="name" tabIndex="1" onKeyUp={loadChat} ref={searchBox} onBlur={delInput}/>
                </div>
            </div>
            <div className="sidebar_chats">
                <AddNewChat userId={userId} connection={connection}/>
                {chats.map((chat,key)=>(<SidebarChat key={key} chat={chat}/>))}
            </div>
        </div>
    )
}

export default Sidebar;