import ImageMessage from "./ImageMessage/ImageMessage";
import VideoMessage from "./VideoMessage/VideoMessage";

function AttachmentFilesMessage(props){
    const {sender, receiver, setMessages,user} = props;

    return(
    <div className="dropdown">
        <i className="fa fa-paperclip icon_footer clickable" id="dropdownMenuButton1"
                data-bs-toggle="dropdown" aria-expanded="false">
        </i>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li className="dropdown-item">
                <ImageMessage sender={sender} receiver={receiver} setMessages={setMessages} user={user}/>
            </li>
            <li className="dropdown-item">
                <VideoMessage sender={sender} receiver={receiver} setMessages={setMessages} user={user}/>
            </li>
        </ul>
    </div>
    );
}

export default AttachmentFilesMessage;

