import React, { Fragment } from 'react'
import {useParams} from 'react-router-dom';
import '../../App.css'
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import { useDispatch,useSelector} from 'react-redux'
import { useEffect ,useState} from 'react';
import { getProductDetails,clearErrors } from '../../actions/productActions';
import { Carousel } from 'react-bootstrap';
import {addItemToCart} from '../../actions/cartActions.js'
const ProductDetails = () => {
    const[quantity,setQuantity]= useState(1);
    const dispatch=useDispatch();
    let {id} = useParams();//instead of match
    console.log(id);
    const {product,loading,error}=useSelector(state => state.productDetails)

    useEffect(() => {

    dispatch(getProductDetails(id)) ;
    if(error){
        dispatch(clearErrors())
    }
    }, [dispatch,id,error])
   const addToCart=()=>{
    dispatch(addItemToCart(id,quantity));
    alert("added to the cart")
   }
   const increaseQty=()=>{
          const count=document.querySelector('.count')
          if(count.valueAsNumber >= product.stock){
            return;
          }
          const qty= count.valueAsNumber + 1;
          setQuantity(qty);

   }
   const decreaseQty=()=>{
    const count=document.querySelector('.count')
    if(count.valueAsNumber <= 1){
      return;
    }
    const qty= count.valueAsNumber - 1;
    setQuantity(qty);
}
    return (
    <Fragment>
        
        {loading ? <Loader/> : (
        <Fragment>
           <MetaData title={product.name}/>
            <div>
            <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
             <Carousel pause='hover'>
                {product.images && product.images.map(image =>(
                    <Carousel.Item key={image.public_id}>
                        <img className="d-block w-100"src={image.url} alt={product.title}/>
                    </Carousel.Item>
                ))}
             </Carousel>
            </div>

            <div className="col-12 col-lg-5 mt-5">
                <h3>{product.name}</h3>
                <p id="product_id">Product # {product._id}</p>

                <hr/>

                <div className="rating-outer">
                    <div className="rating-inner" style={{ width: `${(product.ratings / 5)*100}%`}}></div> 
                </div>
                <span id="no_of_reviews">({product.numOfReviews})</span>

                <hr/>

                <p id="product_price">{product.price}</p>
                <div className="stockCounter d-inline">
                </div>
                 <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" disabled={product.stock===0} onClick={addToCart} >Add to Cart</button>

                <hr/>



                <h4 className="mt-2">Description:</h4>
                <p>{product.description}</p>
                <p id="product_seller mb-3">Written by: <strong>{product.seller}</strong></p>
				
				<button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                            Submit Your Review
                </button>
				
				<div className="row mt-2 mb-5">
                    <div className="rating w-50">

                        <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">

                                        <ul className="stars" >
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                        </ul>

                                        <textarea name="review" id="review" className="form-control mt-3">

                                        </textarea>

                                        <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
						
            </div>

        </div>
        </div>
        </div>

        </Fragment>) }
   
    </Fragment>
    
)  };
export default ProductDetails;