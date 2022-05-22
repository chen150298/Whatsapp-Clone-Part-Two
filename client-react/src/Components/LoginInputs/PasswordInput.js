import './LoginInput.css'
import {useState} from "react";

function PasswordInput(props) {
    const {errorMessage, icon, onChange, ...inputProps} = props;
    const [leaved, setLeave] = useState("false");
    const handleLeave = () => {
        setLeave("true")
    };
    const hideShow = () => {
        let pwd = document.getElementById(props.id);
        let s = document.getElementById("show-" + props.id);
        let h = document.getElementById("hide-" + props.id);
        if (pwd.type === "password") {
            pwd.type = "text";
            s.style.display = "block";
            h.style.display = "none";
        } else {
            pwd.type = "password";
            s.style.display = "none";
            h.style.display = "block";
        }
    }
    return (
        <div className="input-box">
            <i className={props.icon}/>
            <input type="password" {...inputProps} onChange={onChange} onBlur={handleLeave} leaved={leaved} className="loginInput"/>
            <span className="eye" onClick={hideShow}>
                <i className="fa fa-eye show" id={"show-" + props.id}/>
                <i className="fa fa-eye-slash hide" id={"hide-" + props.id}/>
            </span>
            <div id="err-msg">{errorMessage}</div>
        </div>
    );
}

export default PasswordInput;