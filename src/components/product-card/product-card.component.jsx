import './product-card.styles.scss';
import Button, {Button_Type_Classes} from "../button/button.component";
import {useContext} from "react";
import {CartContext} from "../../context/cart.context";
const ProductCard = ({products}) => {
    const {addItemToCart} = useContext(CartContext);

    const {name, price, imageUrl} = products;

    const addToCart = () => addItemToCart(products);

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
