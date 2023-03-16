import {CartIconContainer,ItemCount, ShoppingIcon} from "./cart-icon.styles";
import {useDispatch, useSelector} from "react-redux";
import {selectCartCount, selectIsCartOpen} from "../../store/cart/cart.selector";
import {setCartIsOpen} from "../../store/cart/cart.action";
import './cart-icon.styles.scss';

const CartIcon = () =>{
    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);

    //open the cart if not open & close the cart if open
    const toggleIsCartOpen = () => dispatch(setCartIsOpen(!isCartOpen));

    return(<CartIconContainer onClick={toggleIsCartOpen}>
        <ShoppingIcon />
        <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>);
}

export default CartIcon;
