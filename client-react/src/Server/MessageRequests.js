import {localServer} from "../Shared";

async function GetMessages(token, chatId) {
    try {
        let response = await
        fetch('https://' + localServer + '/api/contacts/'+chatId+'/messages', {
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

async function AddMessage(token, chatId, content) {
    try {
        await fetch('https://' + localServer + '/api/contacts/' + chatId + '/messages', {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                'content': content,
                'created': 'null',      // ignores anyway
                'sent': true
            })
        });
    } catch (error) {
        console.log(error);
    }
}

async function MessageDetails(token, chatId, messageId) {
    try {
        let response = await
            fetch('https://' + localServer + '/api/contacts/' + chatId + '/messages/' + messageId, {
                headers: {
                    'accept': '*/*',
                    'Authorization': 'Bearer ' + token
                }
            });
        let data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function EditMessage(token, chatId, messageId, content){
    try {
        await fetch('https://' + localServer + '/api/contacts/' + chatId + '/messages/' + messageId, {
                method: 'PUT',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    'content': content,
                    'created': 'date',      // ignores anyway
                    'sent': true            // ignore anyway
                })
            });
    } catch (error) {
        console.log(error);
    }
}

async function DeleteMessage(token, chatId, messageId){
    try {
        await fetch('https://' + localServer + '/api/contacts/' + chatId + '/messages/' + messageId, {
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

async function Transfer(otherServer, fromId, toId, content) {
    try {
        await fetch('https://' + otherServer + '/api/transfer', {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'from': fromId,     // our id
                    'to': toId,         // to who (id)
                    'content': content
                })
            });
    } catch (error) {
        console.log(error);
    }
}

export {GetMessages, AddMessage, MessageDetails, EditMessage, DeleteMessage, Transfer};