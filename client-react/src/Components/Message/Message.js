import "./Message.css"

function Message(props) {
    const {message} = props;

    /*let msg;
    if(message.type==="text"){
        msg=message.content;
    }
    else if(message.type==="audio")
    {
        msg= <audio controls>
                <source src={message.content} type="video/webm"/>
            </audio>;
    }
    else if(message.type==="image")
    {
        msg= <img src={message.content} className="img-fluid" alt="image..."/>;
    }
    else if(message.type==="video")
    {
       msg= <video width="640" height="360" controls>
            <source src={message.content} type="video/mp4" />
            <source src={message.content} type="video/ogg" />
            <source src={message.content} type="video/webm" />
        </video>
    }*/

    if (message?.sent) {
        return (
            <p className={"chat_message sender"}>
                {message?.content}
                <span className="time_stamp ">
                    {message?.created}
                </span>
            </p>
        );
    } else {
        return (
            <p className={"chat_message"}>
                {message?.content}
                <span className="time_stamp ">
                    {message?.created}
                </span>
            </p>
        );
    }

}
export default Message;