import {useContext} from "react";
import {TokenContext} from "../../TokenContext";
import {Navigate} from "react-router-dom";
import {AddChat, ChatDetails, DeleteChat, EditChat, GetChats, Invite} from "../../Server/ChatRequests";
import {
    AddMessage,
    DeleteMessage,
    EditMessage,
    GetMessages,
    MessageDetails,
    Transfer
} from "../../Server/MessageRequests";
import {GetLoggedUserId} from "../../Server/UserRequests";

function Test() {
    const {token} = useContext(TokenContext);
    if (!token) { // check if user not logged in
        return <Navigate to="/login"/>;
    }

    console.log(token);
    const chatId = "elad";

    const server = "localhost:7097";

    const getContacts = async () => {
        const data = await GetChats(token);
        console.log(data);
    }

    const addContact = async () => {
        await AddChat(token,'elad','elad',server);
    }

    const contactDetails = async () => {
        let data = await ChatDetails(token, 'elad');
        console.log(data);
    }

    const editContact = async () => {
        await EditChat(token,'elad','now not elad','locool');
    }

    const deleteContact = async () => {

        await DeleteChat(token, 'elad');
    }

    const getMessages = async () => {
        let data = await GetMessages(token,'elad');
        console.log(data);
    }

    const createMessage = async () => {
       await AddMessage(token, 'elad', 'hi');
    }

    const messageId = 1;
    const getMessageById = async () => {
        let data = await MessageDetails(token, 'elad', 1);
        console.log(data);
    }

    const editMessage = async () => {
        await EditMessage(token, 'elad', 1, 'hello');
    }

    const deleteMessage = async () => {
       await DeleteMessage(token, 'elad', 1);
    }

    const otherServer = "localhost:7097";
    const invite = async () => {
        await Invite("localhost:7097", 'alice', 'Lion', 'locool');
    }

    const transferMessage = async () => {
        await Transfer("localhost:7097", 'alice', 'Lion', 'what');
    }
    
    const getUserId = async () => {
        let data = await GetLoggedUserId(token);
        console.log(data);
    }

    return (
        <div>
            <div>
                <button className="btn btn-lg btn-primary" onClick={getContacts}>get contacts</button>
            </div>
            <div>
                <button className="btn btn-lg btn-primary" onClick={addContact}>add contact</button>
            </div>
            <div>
                <button className="btn btn-lg btn-primary" onClick={contactDetails}>contact Details</button>
            </div>
            <div>
                <button className="btn btn-lg btn-primary" onClick={editContact}>edit contact</button>
            </div>
            <div>
                <button className="btn btn-lg btn-primary" onClick={deleteContact}>delete contact</button>
            </div>
            <div>
                <button className="btn btn-lg btn-primary" onClick={getMessages}>get messages</button>
            </div>
            <div>
                <button className="btn btn-lg btn-primary" onClick={createMessage}>create message</button>
            </div>
            <div>
                <button className="btn btn-lg btn-primary" onClick={getMessageById}>get message by id</button>
            </div>
            <div>
                <button className="btn btn-lg btn-primary" onClick={editMessage}>edit message</button>
            </div>
            <div>
                <button className="btn btn-lg btn-primary" onClick={deleteMessage}>delete message</button>
            </div>
            <div>
                <button className="btn btn-lg btn-primary" onClick={invite}>invitations</button>
            </div>
            <div>
                <button className="btn btn-lg btn-primary" onClick={transferMessage}>transfer</button>
            </div>
            <div>
                <button className="btn btn-lg btn-primary" onClick={getUserId}>Get User Id</button>
            </div>
        </div>
    )
}

export default Test;