import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";

import './payment-form.styles';
import {FormContainer, PaymentButton, PaymentFormContainer} from "./payment-form.styles";
import {useSelector} from "react-redux";
import {selectCartTotal} from "../../store/cart/cart.selector";
import {selectCurrentUser} from "../../store/user/user.selector";
import {useState} from "react";
import {Button_Type_Classes} from "../button/button.component";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const paymentHandler = async (e) => {
        e.preventDefault();
        if(!stripe || !elements){
            return;
        }

        setIsProcessingPayment(true);
        //Request netlify function
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            //stripe use "." so 10000 is equal $100.00 so every amount is multiply with 100.
            body: JSON.stringify({amount: amount * 100})
        }).then(res => res.json());

        const {paymentIntent: {client_secret}} = response;

        //console.log(client_secret);

        const paymentResult = await stripe.confirmCardPayment(client_secret,{
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'Guest User'
                }
            }
        });
        setIsProcessingPayment(false);
        if (paymentResult.error){
            alert(paymentResult.error);
        }else {
            if (paymentResult.paymentIntent.status === "succeeded"){
                alert("Payment Successful");
            }
        }

    };
    return(
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment:</h2>
        <CardElement/>
         <PaymentButton isLoading={isProcessingPayment} buttonType={Button_Type_Classes.inverted}>Pay Now</PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    );
};

export default PaymentForm;
