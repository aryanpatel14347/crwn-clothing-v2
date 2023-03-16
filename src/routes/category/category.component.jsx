import {useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import ProductCard from "../../components/product-card/product-card.component";

import './category.styles.scss';
import {useSelector} from "react-redux";
import {selectCategoriesIsLoading, selectCategoriesMap} from "../../store/categories/category.selector";
import Spinner from "../../components/spinner/spinner.component";
const Category = () => {
    const {category} = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const isCategoriesIsLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState([]);


    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return(
        <Fragment>
            <h2 className="category-title">{category.toUpperCase()}</h2>
            {isCategoriesIsLoading ? (<Spinner/>) : (
        <div className="category-container">

            {
               products && products.map((product) => <ProductCard key={product.id} products={product}/>)
            }
        </div>)
            }
        </Fragment>
    );

};

export default Category;
