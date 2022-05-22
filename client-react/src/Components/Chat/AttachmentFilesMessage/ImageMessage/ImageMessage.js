import "./ImageMessage.css"
import AddNewMessage from "../../../../ServerBefore/UserChats/AddNewMessage";
import GetMessages from "../../../../ServerBefore/UserChats/GetMessages";

function ImageMessage(props){
    const {sender, receiver, setMessages,user} = props;

    const sendImage = (e) => {
       let file = e.target.files[0];
       if (file.type.match("image.*")){
           let reader = new FileReader();
           reader.addEventListener("load", function() {
               // build msg
               const msg={
                   sender: sender,
                   receiver: receiver,
                   content: reader.result,
                   type: "image",
                   time: new Date().toLocaleString()
               };
               // send msg
               AddNewMessage(msg);
               setMessages([...GetMessages(user, receiver)]);
           }, false);
           if (file){
               reader.readAsDataURL(file);
           }
       }
    }

    return (
        <div>
            <label htmlFor="image_chat_footer">
                <i className="fa fa-image icon_footer"/> Send Image
            </label>
            <input id="image_chat_footer" type="file" accept="image/*" onChange={sendImage}/>
        </div>

    );

}

export default ImageMessage;