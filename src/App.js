import Home from "./routes/home/home.component";
import {Routes, Route} from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/auth/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {checkUserSession} from "./store/user/user.action";


const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkUserSession());
    },[dispatch]);

    return (
        <Routes>
            <Route path="/" element={<Navigation/>}>
                {/*if you use index attribute it means it will consider as home page on parental route where you mention '/' */}
                <Route index element={<Home/>}/>
                <Route path="shop/*" element={<Shop/>}/>
                <Route path="auth" element={<Authentication/>}/>
                <Route path="checkout" element={<Checkout/>}/>
            </Route>

        </Routes>
    );
};

export default App;
