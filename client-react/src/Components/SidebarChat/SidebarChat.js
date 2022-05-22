import "./SidebarChat.css"
import {Link} from "react-router-dom";

function SidebarChat(props){
    const{chat}=props;

    return(
        <Link to={`chats/${chat.id}`} id="sidebar_chat_link">
            <div className="sidebar_chat">
                {/*<img src={GetImageById(id)} alt="avatar" className="user_picture"/>*/}
                <div className="sidebar_chat_info">
                    <h4>{chat?.name}</h4>
                    <div>
                        <div id="sidebar_message_content">{chat?.last} </div>
                        <span className="time_stamp ">
                        {chat?.lastDate}
                     </span>
                    </div>

                </div>
            </div>
        </Link>

    )
}
export default SidebarChat;