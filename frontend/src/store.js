import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import {productsReducer,productDetailsReducer} from './reducers/productsReducer.js'
import { authReducer } from './reducers/userReducers.js';
import { cartReducer } from './reducers/cartReducer.js';
const reducer= combineReducers({
products: productsReducer,
productDetails: productDetailsReducer,
auth:authReducer,
cart: cartReducer
})
let initialState= {
    cart: {
        cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
       :[],
       shippingInfo: localStorage.getItem('shippingInfo')
              ? JSON.parse(localStorage.getItem('shippingInfo'))
              : {}
    }
}
const middleware=[thunk];
const store= createStore(reducer, initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;