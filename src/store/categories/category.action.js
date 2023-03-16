import {createAction} from "../../utils/reducer/recuder.util";
import {CATEGORIES_ACTION_TYPE} from "./category-types";
// import {getCategoriesAndDocuments} from "../../utils/firebase/firebase.util";

export const fetchCategoriesStart = () => {
    return createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START);
};

export const fetchCategoriesSuccess = (categoriesArray) => {
    return createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS, categoriesArray);
};
export const fetchCategoriesFailed = (error) => {
    return createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED, error);
};
