import {createStore, applyMiddleware, compose} from "redux";
import {persistStore, persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import {rootReducer} from "./root-reducer";
// import thunk from "redux-thunk";
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "./root-saga";
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer)

//it will shows logg when you are in development mode on production mode all logs will be hide
// at the end.fitler(Boolen) means it will not show value as false instead it show empty array
const middleWares = [process.env.NODE_ENV !== 'production' && logger,
sagaMiddleware
].filter(Boolean);


//If redux devtool exist on crome use this compose..
//const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__);
const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


//const composedEnhancer = compose(applyMiddleware(...middleWares));
const composedEnhancer = composeEnhancer(applyMiddleware(...middleWares));
export const store = createStore(
    persistedReducer,
    undefined,
    composedEnhancer
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

