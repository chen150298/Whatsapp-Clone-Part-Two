import "./SidebarChat.css"
import {useContext, useRef} from "react";
import {AddChat, Invite} from "../../Server/ChatRequests";
import {TokenContext} from "../../TokenContext";
import {localServer} from "../../Shared";

function AddNewChat(props) {
    const {userId, connection} = props;
    const {token} = useContext(TokenContext);
    const username = useRef('');
    const nickname = useRef('');
    const server = useRef('');

    const handleAdd = async () => {
        await AddChat(token, username.current.value, nickname.current.value, server.current.value);
        await Invite(server.current.value, userId, username.current.value, localServer);
        await connection?.invoke("UpdateChats");
        username.current.value = '';
        nickname.current.value = '';
        server.current.value = '';
    }

    return (
        <>
            <div className="sidebar_chat" data-bs-toggle="modal" data-bs-target="#addNewChatModal">
                {/*<div id="alert"/>*/}
                <h4>Add New Chat</h4>
            </div>
            <div className="modal fade" id="addNewChatModal" tabIndex="-1" aria-labelledby="modalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalLabel">Add New Chat</h5>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="username">User Name</label>
                                    <input ref={username} type="text" className="form-control" id="username" placeholder="User Name"/>
                                    <small id="emailHelp" className="form-text text-muted">Notice! The User Name must be typed accurately.</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nickname">Nickname</label>
                                    <input ref={nickname} type="text" className="form-control" id="nickname" placeholder="Nickname"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="server_address">Server address</label>
                                    <input ref={server} type="text" className="form-control" id="server_address" placeholder="Enter server address"/>
                                    <small id="emailHelp" className="form-text text-muted">Example: localhost:7097</small>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleAdd} >Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddNewChat;