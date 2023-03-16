import {Route, Routes} from "react-router-dom";
import CategoriesPreview from '../categories-preview/categories-preview.component';
import './shop.styles.scss';
import Category from "../category/category.component";
import {useEffect} from "react";
// import {getCategoriesAndDocuments} from "../../utils/firebase/firebase.util";
import {fetchCategoriesStart} from "../../store/categories/category.action";
import {useDispatch} from "react-redux";

const Shop = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const getCategoriesMap = () => {
            // const categoriesArray = await getCategoriesAndDocuments('categories');
            //console.log(categoriesArray);
            //console.log(categoryMap);
           // dispatch(setCategoriesMap(categoryMap));
            dispatch(fetchCategoriesStart());
        }
        getCategoriesMap();
    },[dispatch]);

    return (
        <Routes>
            <Route index element={<CategoriesPreview/>} />
            <Route path=":category"  element={<Category/>}/>
        </Routes>
        );
};

export default Shop;
