import {Outlet} from "react-router-dom";
//import './navigation.styles.scss';
import {Fragment, useContext} from "react";
import {ReactComponent as CrownLogo} from "../../assets/crown.svg";
import {UserContext} from "../../context/user.context";
import {signOutUser} from "../../utils/firebase/firebase.util";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {CartContext} from "../../context/cart.context";

import {NavigationContainer, LogoContainer, NavLinks, NavLinksContainer} from "./navigation.styles";

const Navigation = () => {
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);
    return(
        <Fragment>
            <NavigationContainer>
                    <LogoContainer to="/">
                        <CrownLogo  className="logo"/>
                    </LogoContainer>
                <NavLinksContainer>
                    <NavLinks to='/shop'>Shop</NavLinks>
                    {
                        currentUser ? (
                            <NavLinks as="span" onClick={signOutUser}>Sign Out</NavLinks>)
                            : (<NavLinks className="nav-link" to='/auth'>
                            Sign-In
                            </NavLinks>
                        ) }
                    <NavLinks to="#"><CartIcon/></NavLinks>
                </NavLinksContainer>
                {isCartOpen && <CartDropdown/>}
            </NavigationContainer>
            <Outlet/>
        </Fragment>
    );

};
export default Navigation;
