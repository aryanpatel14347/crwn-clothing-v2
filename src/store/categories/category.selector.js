import {createSelector} from "reselect";


//Memoization - selector
const selectCategoryReducer = (state) => state.categories;

//Memoization - selector
export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
);

//Memoization - selector
export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => {
        return categories.reduce((acc, category) => {
        const {title, items} = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})}
);

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading);
