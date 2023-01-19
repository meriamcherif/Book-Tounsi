import { BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import './App.css'
import { useEffect } from 'react';
import ProductDetails from './components/product/ProductDetails';
import Login from './components/user/Login'
import Register from './components/user/Register'
import { loadUser} from './actions/userActions'
import store from './store'
import Cart from './components/cart/Cart'
import Aboutus from './components/layout/Aboutus'
import Contactus from './components/layout/Contactus'
import Shipping from './components/cart/Shipping'
import ConfirmOrder from './components/cart/ConfirmOrder'


function App() {
  useEffect(()=>{
    store.dispatch(loadUser())

  },[])
  return (
    <Router>

      <div className="App">
      <Header/>
        <Routes>
       
        <Route exact path='/' element={<div className='App container container-fluid'>
< Home /></div>}></Route> 

<Route path="/order/confirm" element={< ConfirmOrder />}/> 
         <Route path="/shipping" element={< Shipping />}/> 
        <Route exact path='/search/:keyword' element={<div className='App container container-fluid'> < Home /></div>}></Route>
        <Route exact path='/product/:id' element={< ProductDetails />}></Route>
        <Route exact path='/login' element={< Login />}></Route>
        <Route exact path='/register' element={< Register />}></Route>
        <Route exact path='/cart' element={< Cart />}></Route>
        <Route exact path='/AboutUs' element={< Aboutus/>} ></Route>
        <Route exact path='/ContactUs' element={< Contactus/>} ></Route>

        </Routes>

        <Footer/>

    </div>
    </Router>

  );
    
}

export default App;
