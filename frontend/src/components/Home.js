import React, { Fragment,useState } from 'react'
import MetaData from './layout/MetaData'
import { useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import { getProducts} from '../actions/productActions'
import Product from './product/Product.js'
import Loader from './layout/Loader';
import Pagination from 'react-js-pagination';
import { productsReducer } from '../reducers/productsReducer';
import { useParams } from 'react-router-dom';
import './home.css'
const Home = () => {
   const [currentPage,setCurrentPage]=useState(1);
    
    const dispatch= useDispatch();
    const { loading,products,error,productsCount,resPerPage}=useSelector(state=>state.products)// this enables us to read from the state
    const params=useParams();
    const keyword=params.keyword;
    useEffect(()=>{
      dispatch(getProducts(keyword,currentPage));

    },[dispatch,error,currentPage,keyword])
   
    function setCurrentPageNo(pageNumber){
      setCurrentPage(pageNumber)
    }
    return (

      <Fragment>
        {loading? <Loader/> :( 
           <Fragment className='home' >
             <MetaData title={'Buy Best Products'}/>
            
              <h1 id="products_heading">Latest Books</h1>
              <section id="products" className="container mt-5 ">
                     <div className="row products">


                   {products && products.map(product =>(
                   <Product key={product._id} product={product}/>
                   ) )}
                 </div>
                 </section>
                {resPerPage <= productsCount && (
                  <div className='d-flex justify-content-center mt-5'>
                  <Pagination /*pour ajouter ce qui nous permet de balayer entre les pages*/
                  activePage={currentPage}
                  itemsCountPerPage={resPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText={'>'}
                  prevPageText={'<'}
                  lastPageText={'Last'}
                  firstPageText={'First'}
                  itemClass="page-item"
                  linkClass="page-link"

                  />
             </div>  
                )}
           </Fragment>
             
        )}

      </Fragment>
  )
}

export default Home