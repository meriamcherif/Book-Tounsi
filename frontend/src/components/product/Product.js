import React from 'react'
import './product.css'
import {Link} from 'react-router-dom' //Link doesnt load unlike <a> tag
const Product = ({product}) => {
  return (
<div key={product._id} className="col-sm-12 col-md-6 col-lg-3 my-3">
 <div className="card p-3 rounded">
 <img
   className="card-img-top mx-auto"
   src={product.images[0].url}
   alt='produit'
 />
 <div className="card-body d-flex flex-column">
   <h5 className="card-title">
     <Link style={{textDecoration:'none'}}to={`/product/${product._id}`}>{product.name}</Link>
   </h5>
 
   <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
 </div>
</div>
</div>  )
}

export default Product