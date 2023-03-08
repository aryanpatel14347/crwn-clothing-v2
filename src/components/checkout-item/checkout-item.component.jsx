import './checkout-tem.styles.scss';
import {useContext} from "react";
import {CartContext} from "../../context/cart.context";

const CheckoutItem = ({checkoutItem}) => {
    const {addItemToCart, removeItemToCart ,clearItemFromCart} = useContext(CartContext);
    const {name,imageUrl, price, quantity} = checkoutItem;
    return(
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={`${name}`}/>
            </div>
            <span className="name">{name}</span>
            <span className="quantity"> <div className="arrow" onClick={() => removeItemToCart(checkoutItem)}>&#10094;</div> <span className="value">{quantity}</span> <div className="arrow" onClick={() => addItemToCart(checkoutItem)}>&#10095;</div></span>
            <span className="price">{price}</span>
            <span className="remove-button" onClick={() => clearItemFromCart(checkoutItem)}>&#10005;</span>
        </div>
    );
}

export default CheckoutItem;
