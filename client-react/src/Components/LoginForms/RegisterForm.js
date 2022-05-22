import './LoginForm.css'
import TextInput from "../LoginInputs/TextInput";
import PasswordInput from "../LoginInputs/PasswordInput";
import SubmitButton from "../SubmitButton/SubmitButton";
import ImageInput from "../LoginInputs/ImageInput";
import {Link, Navigate} from "react-router-dom";
import {useState} from "react";
import {Register} from "../../Server/UserRequests";

function RegisterForm(){
    const [values, setValues] = useState({
        username:"",
        nickname:"",
        password:"",
        confirmPassword:"",
        image: "",
    });

    const [user,setUser]=useState(null);
    if (user) { // check if user already registered
        return <Navigate to="/login"/>;
    }


    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    };

    const handleChangeImage = (e) => {
        let file = e.target.files[0];
        if (file.type.match("image.*")){
            let reader = new FileReader();
            reader.addEventListener("load", function() {
                setValues({...values, [e.target.name]: reader.result});
            }, false);
            if (file){
                reader.readAsDataURL(file);
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await Register(values, setUser);
    }

    return(
        <div className='form-box' id="register">
            <div id="alert"/>
            <h1>Register</h1>
            <form method="post" onSubmit={handleSubmit}>
                <TextInput icon='fa fa-user' id='username' placeholder='User Name' name='username' value={values['username']} onChange={handleChange} errorMessage="Username should be 3-16 characters and should only include letters!" required pattern="^[A-Za-z]{3,16}"/>
                <TextInput icon='fa fa-masks-theater' id='nickname' placeholder='Nickname' name='nickname' value={values['nickname']} onChange={handleChange} errorMessage="Nickname should be at least 3 characters!" required pattern="^.{3,}"/>
                <PasswordInput icon='fa fa-key' id='password' placeholder='Password' name='password' value={values['password']} onChange={handleChange} errorMessage="Password should be 8-20 characters ant should include at least 1 letter, 1 number and 1 special character!" required pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"/>
                <PasswordInput icon='fa fa-key' id='confirmPassword' placeholder='Confirm Password' name='confirmPassword' value={values['confirmPassword']} onChange={handleChange} errorMessage="Passwords don't match!" required pattern={values.password}/>
                <ImageInput id='image' placeholder='Choose An Image' name='image' onChange={handleChangeImage} errorMessage="Image is required!" required/>
                <SubmitButton text='REGISTER'/>
            </form>
            <div className="message">
                Already registered? <Link to="/login">click here</Link> to login.
            </div>
        </div>
    );
}
export default RegisterForm;