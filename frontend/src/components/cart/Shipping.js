import React, { Fragment, useState} from 'react'
import MetaData from '../layout/MetaData'
import {useDispatch,useSelector} from 'react-redux'
import { saveShippingInfo } from '../../actions/cartActions'
import { useNavigate } from 'react-router-dom'
import { countries } from 'countries-list'
import './shipping.css'
import CheckoutSteps from './CheckoutSteps'
const Shipping = () => {
    const navigate = useNavigate();
    const countriesList=Object.values(countries)

    const { shippingInfo}= useSelector(state=>state.cart)
    const [address,setAddress]=useState(shippingInfo.address)
    const [city, setCity]=useState(shippingInfo.city)
    const [postalCode,setPostalCode]=useState(shippingInfo.postalCode)
    const[phoneNo, setPhoneNo]=useState(shippingInfo.phoneNo);
    const [country,setCountry]=useState(shippingInfo.country);

    const dispatch=useDispatch();
    const submitHandler=(e)=>{
      dispatch(saveShippingInfo({address,city,phoneNo,postalCode,country}))

        e.preventDefault();
         navigate('/order/confirm');
    }
 
    return (
    <Fragment>
      <MetaData title={'Shipping Info'}></MetaData>
     <CheckoutSteps shipping/>
      <div className="row wrapper shipping">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <div className="form-group">
                            <label for="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e)=>setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label for="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e)=> setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phoneNo}
                                onChange={(e)=> setPhoneNo(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={postalCode}
                                onChange={(e)=>setPostalCode(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Country</label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={country}
                                onChange={(e)=>setCountry(e.target.value)}

                                required
                            >
                              {countriesList.map(country =>(
                                <option key={country.name} value={country.name}>
                                       {country.name} 
                                    </option>
                              ) )}
                                    

                         </select>
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            classNameName="btn btn-block py-3"
                        >
                            CONTINUE
                            </button>
                    </form>
                </div>
            </div>
    </Fragment>
  )
}

export default Shipping