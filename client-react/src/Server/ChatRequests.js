import {localServer} from "../Shared";

async function GetChats(token) {
    try {
        let response = await
            fetch('https://' + localServer + '/api/contacts', {
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

async function AddChat(token, id, name, server) {
    try {
        await fetch('https://' + localServer + '/api/contacts', {
            method: 'POST',
            headers: {
                'accept': '*!/!*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                'id': id,
                'name': name,
                'server': server
            })
        });
    } catch (error) {
        console.log(error);
    }
}

async function ChatDetails(token, chatId){
    try {
        let response = await
            fetch('https://' + localServer + '/api/contacts/' + chatId, {
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

async function EditChat(token, chatId, name, server) {
    try {
        await fetch('https://' + localServer + '/api/contacts/' + chatId, {
            method: 'PUT',
            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                'id': chatId,           // ignores anyway
                'name': name,
                'server': server
            })
        });
    } catch (error) {
        console.log(error);
    }
}

async function DeleteChat(token, chatId){
    try {
        await fetch('https://' + localServer + '/api/contacts/' + chatId, {
            method: 'DELETE',
            headers: {
                'accept': '*/*',
                'Authorization': 'Bearer ' + token
            }
        });
    } catch (error) {
        console.log(error);
    }
}

async function Invite(otherServer, fromId, toId, server) {
    try {
        await fetch('https://' + otherServer + '/api/invitations', {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'from': fromId,         // our id
                'to': toId,             // to who (id)
                'server': server        // 'server': server    // our server
            })
        });
    } catch (error) {
        console.log(error);
    }
}

export {GetChats, AddChat, ChatDetails, EditChat, DeleteChat, Invite};