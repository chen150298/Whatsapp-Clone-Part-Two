import './LoginInput.css'
import {useState} from "react";
function ImageInput(props){
    const {errorMessage, icon, onChange, ...inputProps} = props;
    const [leaved, setLeave] = useState("false");
    const handleLeave = () => {
        setLeave("true")
    };
    return(
        <>
            <div className="input-box">
                <i className="fa fa-camera" />
                <input className="form-control form-control-sm loginInput" type="file" accept="image/*" {...inputProps} onChange={onChange} onBlur={handleLeave} leaved={leaved}/>
                <div id="err-msg">{errorMessage}</div>
            </div>
        </>
    );
}
export default ImageInput;