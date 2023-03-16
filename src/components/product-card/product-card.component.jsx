import './product-card.styles.scss';
import Button, {Button_Type_Classes} from "../button/button.component";
import {useDispatch, useSelector} from "react-redux";
import {addItemToCart} from "../../store/cart/cart.action";
import {selectCartItems} from "../../store/cart/cart.selector";

const ProductCard = ({products}) => {
    const dispatch = useDispatch();

    const {name, price, imageUrl} = products;
    const cartItems = useSelector(selectCartItems);
    const addToCart = () => dispatch(addItemToCart(cartItems, products));

return(
    <div className="product-card-container">
        <img src={imageUrl} alt={name}/>
        <div className="footer">
            <span className="name">{name}</span>
            <span className="price">{price}</span>
        </div>
        <Button buttonType={Button_Type_Classes.inverted} onClick={addToCart}>Add to cart</Button>
    </div>
);
};

export default ProductCard;
