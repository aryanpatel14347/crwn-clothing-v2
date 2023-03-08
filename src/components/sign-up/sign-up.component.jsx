import {useState} from "react";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.util";
import FormInput from "../form-input/form-input.component";
import './sign-up.styles.scss';
import Button from "../button/button.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password:'',
    confirmPassword: ''
};
const SignUp = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;


    const resetFormFields = () => {
      setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword){
            alert("password do not match")
            return;
        }

        try{
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            );
            await createUserDocumentFromAuth(user, { displayName });
            //setCurrentUser(user);
         resetFormFields();
        }catch(error){
            if(error.code === "auth/email-already-in-use"){
                alert('Cannot create user, email already in use');
            }else{
                console.log('Something wrong while signup', error);
            }

        }

    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    };
return(
    <div className="sign-up-container">
        <h2>Don't have an account?</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={handleSubmit}>
            <FormInput label="Display Name" type="text" name="displayName" id="displayName" onChange={handleChange} value={displayName} required/>

            <FormInput label="Email" type="email" name="email" id="email" onChange={handleChange} value={email} required/>

            <FormInput label="Password" type="password" name="password" id="password" onChange={handleChange} value={password} required/>

            <FormInput label="Confirm Password" type="password" name="confirmPassword" id="confirmPassword" onChange={handleChange} value={confirmPassword} required/>

            <Button type="submit">Sign Up</Button>
        </form>
    </div>
);
};

export default SignUp;