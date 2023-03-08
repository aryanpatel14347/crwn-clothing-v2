import './cart-icon.styles.scss';
import {useContext} from "react";
import {CartContext} from "../../context/cart.context";

import {CartIconContainer,ItemCount, ShoppingIcon} from "./cart-icon.styles";

const CartIcon = () =>{
    const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);

    //open the cart if not open & close the cart if open
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return(<CartIconContainer onClick={toggleIsCartOpen}>
        <ShoppingIcon />
        <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>);
}

export default CartIcon;
