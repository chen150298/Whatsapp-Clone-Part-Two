import AddNewMessage from "../../../../ServerBefore/UserChats/AddNewMessage";
import GetMessages from "../../../../ServerBefore/UserChats/GetMessages";
import "./VideoMessage.css"



function VideoMessage(props) {
    const {sender, receiver, setMessages,user} = props;

    const sendVideo = (e) => {
        let file = e.target.files[0];
        if (file.type.match("video.mp4")|| file.type.match("video.ogg")||file.type.match("video.webm")){
            let reader = new FileReader();
            reader.addEventListener("load", function() {
                // build msg
                const msg={
                    sender: sender,
                    receiver: receiver,
                    content: reader.result,
                    type: "video",
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
            <label htmlFor="video_chat_footer">
                <i className="fa fa-video icon_footer"/> Send Video
            </label>
            <input id="video_chat_footer" type="file" accept="video/ogg, video/mp4, video/webm" onChange={sendVideo}/>
        </div>

    );

}
export default VideoMessage;