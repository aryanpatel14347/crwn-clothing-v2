import {useEffect, useState} from "react";
import FormInput from "../form-input/form-input.component";
import './sign-in.styles.scss';
import Button, {Button_Type_Classes} from "../button/button.component";
import {
    auth,
    createUserDocumentFromAuth
} from "../../utils/firebase/firebase.util";
import {getRedirectResult} from "firebase/auth";
import {useDispatch} from "react-redux";
import {emailSignInStart, googleSignInStartPop, googleSignInStartredi} from "../../store/user/user.action";

const defaultFormFields = {
    email: '',
    password:'',
};
const SignIn = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    useEffect(() => {
        async function logWithRedirect() {
            const response = await getRedirectResult(auth);
            if (response) {
                await createUserDocumentFromAuth(response.user);
            }
        }
        logWithRedirect();
    }, []);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            dispatch(emailSignInStart(email,password));
            resetFormFields();
        }catch (error){
            if (error.code === "auth/user-not-found"){
                alert("You are not register with us!");
            }
            if (error.code === "auth/wrong-password"){
                alert("Incorrect Password!");
            }
            //console.log(error);
        }

    };

    const signInWithGoogle = async () => {
        dispatch(googleSignInStartPop());
    };

    const signInWithGoogleRedirect = async () => {
        dispatch(googleSignInStartredi());
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    };
    return(
        <div className="sign-up-container">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label="Email" type="email" name="email" id="email" onChange={handleChange} value={email} required/>

                <FormInput label="Password" type="password" name="password" id="password" onChange={handleChange} value={password} required/>
                <Button type="submit">Sign In</Button>
            </form>
            <div className="google-button-container">
                {/*if you put this buttons inside form you need to add type as button in order to prevent form value submitting on google */}
                <Button type="button" onClick={signInWithGoogle}>G - Popup</Button>
                <Button type="button" onClick={signInWithGoogleRedirect} buttonType={Button_Type_Classes.google}>G - Redirect</Button>
            </div>
        </div>
    );
};

export default SignIn;
