import './SubmitButton.css'

function SubmitButton(props){
    return(
        <button type="submit" className="login-btn">{props.text}</button>
    );
}

export default SubmitButton;