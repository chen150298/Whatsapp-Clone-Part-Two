import AddNewMessage from "../../../ServerBefore/UserChats/AddNewMessage";
import GetMessages from "../../../ServerBefore/UserChats/GetMessages";
import "./AudioMessage.css";
function AudioMessage(props) {
    const {sender, receiver, setMessages,user} = props;
    let items = [];
    let recorder;
    const handleClick=()=>{
        const start=document.getElementById("audio_chat_footer_start");
        const stop=document.getElementById("audio_chat_footer_stop");
        let device = navigator.mediaDevices.getUserMedia({audio: true});
        device.then(stream => {
            if(recorder===undefined){
                recorder = new MediaRecorder(stream);
                recorder.ondataavailable = e => {
                    items.push(e.data);
                    if (recorder.state === 'inactive'){
                        let blob = new Blob(items,{type: 'audio/webm'});
                        let reader = new FileReader();
                        reader.addEventListener("load", function() {
                            // build msg
                            const msg={
                                sender: sender,
                                receiver: receiver,
                                content: reader.result,
                                type: "audio",
                                time: new Date().toLocaleString()
                            };
                            // send msg
                            AddNewMessage(msg);
                            setMessages([...GetMessages(user, receiver)]);
                        }, false);
                        reader.readAsDataURL(blob);
                    }
                }
                recorder.start();
                stop.style.display="block";
                start.style.display="none";
            }

        })
        if(recorder!==undefined){
            if (stop.style.display==="block"){
                recorder.stop();
                stop.style.display="none";
                start.style.display="block";
            }
            else{
                items=[];
                recorder.start();
                stop.style.display="block";
                start.style.display="none";

            }
        }
    }
    return(
        <div>
            <span className="audio" onClick={handleClick}>
                <i id="audio_chat_footer_start" className="fa fa-microphone icon_footer clickable" />
                <i id="audio_chat_footer_stop" className="fa fa-circle-stop icon_footer clickable"/>
            </span>
        </div>

    );
}

export default AudioMessage;