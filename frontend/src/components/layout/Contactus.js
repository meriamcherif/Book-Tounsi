import React from 'react'
import './contactus.css'

function Contactus() {
  return (
    <div className='contactus'>
      <div className='content'>
        <h2>Contact Us</h2>
        <p>Are you passionate about reading? Can't wait to read your favorite Tunisian writer's book? Hurry and contact us!</p>
      </div>
      <div className='containerr'>
        <div className='contactInfo'>
           <div className='box'>
            <div className='icon'><i class="fa-solid fa-location-dot"></i></div>
            <div className='text'>
              <p>CENTRE URBAIN NORD 1082 TUNIS</p>
            </div>
          </div>
           <div className='box'>
               <div className='icon'><i class="fa-solid fa-phone"></i></div>
               <div className='text'>
                <p>71 216 308</p>
               </div>
           </div>
           <div className='box'>
               <div className='icon'><i class="fa-sharp fa-solid fa-envelope"></i></div>
               <div className='text'>
                <p>BookTounsi@gmail.com</p>
               </div>
           </div>
 
        </div>
        
      </div>
    </div>

  )
}

export default Contactus