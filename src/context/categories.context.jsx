import {createContext, useEffect, useState} from "react";
import {getCategoriesAndDocuments} from "../utils/firebase/firebase.util";

//import SHOP_DATA from '../shop-data.js';
//import {addCollectionAndDocuments} from "../utils/firebase/firebase.util";

export const CategoriesContext = createContext({
    categoriesMap: [],
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            //console.log(categoryMap);
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    },[]);

/*    useEffect(() =>{
        addCollectionAndDocuments('categories', SHOP_DATA);
    }, []);*/

    const value = {categoriesMap};
return (
    <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
);
};
