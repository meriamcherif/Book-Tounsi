import React from 'react'
import '../../App.css'
import  { Fragment,useState,useEffect } from 'react'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useDispatch,useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom'
import { login, clearErrors} from '../../actions/userActions'
import './login.css'
const Login = (location) => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const dispatch=useDispatch();
    const navigate = useNavigate();

    const {isAuthenticated,error,loading}=useSelector(state => state.auth);
    const redirect=location.search ? location.search.split('=')[1] : '/'
    useEffect(()=>{
        if(isAuthenticated){
           navigate(redirect);
        }
        if(error){
            dispatch(clearErrors());
        }
    },[dispatch, isAuthenticated, error,navigate])
     const submitHandler=(e)=>{
      e.preventDefault();
      dispatch(login(email,password))
     }

  return (
<Fragment >
    {loading ? <Loader/> : (
        <Fragment>
            <MetaData title={'Login'}/>
            <div className=" wrapper loginclass"> 
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
        <h1 >Login</h1>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}   
/>
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
              />
            </div>

           <Link to="/password/forgot" id="linkpassword" className="float-right mb-4" >Forgot Password?</Link>

            <button
             
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
            >
              LOGIN
            </button>

            <Link to="/register" id="newUser"className="float-right mt-3">New User?</Link>
          </form>
		  </div>
    </div>
        </Fragment>
    )}
</Fragment>  )
}

export default Login