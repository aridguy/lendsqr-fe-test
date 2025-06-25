// src/pages/Login.jsx
import React from 'react'
import HeroImage from '../Asset/home_img.png'
import Logo from '../Asset/logo.svg'
// import './Login.scss';

const Login = () => {
  return (
    <div className='login-container container-fluid'>
      <div className='row min-vh-100'>
        {/* Left side with illustration */}
        <div className='col-md-6 left-pane'>
          <div className='mt-5 pt-5 mx-5 px-5'>
            <img src={Logo} alt='login illustration' className='img-fluid' />
          </div>
          <div className='text-center mt-5 pt-2'>
            <img
              src={HeroImage}
              alt='login illustration'
              className='login-hero-image img-fluid mt-5'
            />
          </div>
        </div>

        {/* Right side with form */}
        <div className='col-md-6 d-flex align-items-center justify-content-center right-pane'>
          <div className='w-75'>
            <h2 className='mb-3 welcome-text'>Welcome!</h2>
            <p>Enter details to login.</p>
            <form>
              <div className='mb-3'>
                <input
                  type='email'
                  className='form-control'
                  placeholder='Email'
                />
              </div>
              <div className='mb-3 position-relative'>
                <input
                  type='password'
                  className='form-control'
                  placeholder='Password'
                />
                <span className='show-password'>SHOW</span>
              </div>
              <div className='mb-3'>
                <a href='/' className='forgot-password'>
                  FORGOT PASSWORD?
                </a>
              </div>
              <button type='submit' className='btn btn-primary w-100'>
                LOG IN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
