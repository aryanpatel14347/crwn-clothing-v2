import './checkout-tem.styles.scss';
import {useDispatch, useSelector} from "react-redux";
import {selectCartItems} from "../../store/cart/cart.selector";
import {addItemToCart,removeItemToCart,clearItemFromCart} from "../../store/cart/cart.action";

const CheckoutItem = ({checkoutItem}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const {name,imageUrl, price, quantity} = checkoutItem;
    return(
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={`${name}`}/>
            </div>
            <span className="name">{name}</span>
            <span className="quantity"> <div className="arrow" onClick={() => dispatch(removeItemToCart(cartItems, checkoutItem))}>&#10094;</div> <span className="value">{quantity}</span> <div className="arrow" onClick={() => dispatch(addItemToCart(cartItems, checkoutItem))}>&#10095;</div></span>
            <span className="price">{price}</span>
            <span className="remove-button" onClick={() => dispatch(clearItemFromCart(cartItems, checkoutItem))}>&#10005;</span>
        </div>
    );
}

export default CheckoutItem;
