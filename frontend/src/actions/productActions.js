import axios from 'axios';
import {
    ALL_PRODUCTS_FAIL,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstants.js'

// Get Products
export const getProducts=(keyword='',currentPage=1)=>async (dispatch)=>{
    try{

        dispatch({ type: ALL_PRODUCTS_REQUEST})
        const {data}= await axios.get(`/api/v1/products?keyword=${keyword}&page=${currentPage}`) 
        console.log(data);
        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload:data
        })
}catch(error){      
       console.log(error)
        dispatch({ 
            type:ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}
//Get the details of a product
export const getProductDetails=(id)=>async (dispatch)=>{
    try{
        dispatch({ type: PRODUCT_DETAILS_REQUEST})
        const {data}= await axios.get(`/api/v1/product/${id}`)
        console.log(data.product);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })
}catch(error){      
       console.log(error)
        dispatch({ 
            type:PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}
// Clear errors
export const clearErrors=()=> async (dispatch)=>{
dispatch({
    type:CLEAR_ERRORS
})
}
