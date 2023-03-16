import {Outlet} from "react-router-dom";
//import './navigation.styles.scss';
import {Fragment} from "react";
import {ReactComponent as CrownLogo} from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {NavigationContainer, LogoContainer, NavLinks, NavLinksContainer} from "./navigation.styles";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser} from "../../store/user/user.selector";
import {selectIsCartOpen} from "../../store/cart/cart.selector";
import {signOutStart} from "../../store/user/user.action";

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);
    const dispatch = useDispatch();

    const signOutUser = () =>  dispatch(signOutStart());

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
