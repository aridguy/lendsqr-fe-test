import React, { useState } from 'react';
import HeroImage from '../Asset/home_img.png';
import Logo from '../Asset/logo.svg';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // NEW

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert('Email and password are required');
      return;
    }

    const token = Math.random().toString(36).substring(2);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('token', token);
    navigate('/dashboard');
  };

  return (
    <div className='login-container container-fluid'>
      <div className='row min-vh-100'>
        {/* Left side */}
        <div className='col-md-6 left-pane'>
          <div className='mt-5 pt-5 mx-5 px-5'>
            <img src={Logo} alt='logo' className='img-fluid' />
          </div>
          <div className='text-center mt-5 pt-2'>
            <img
              src={HeroImage}
              alt='hero'
              className='login-hero-image img-fluid mt-5'
            />
          </div>
        </div>

        {/* Right side */}
        <div className='col-md-6 d-flex align-items-center justify-content-center right-pane'>
          <div className='w-75'>
            <h2 className='mb-3 welcome-text'>Welcome!</h2>
            <p>Enter details to login.</p>
            <form onSubmit={handleLogin}>
              <div className='mb-3'>
                <input
                  type='email'
                  className='form-control'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='mb-3 position-relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className='form-control'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className='show-password'
                  onClick={() => setShowPassword((prev) => !prev)}
                  // style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer', color: '#007bff', fontSize: '14px' }}
                >
                  {showPassword ? 'HIDE' : 'SHOW'}
                </span>
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
  );
};

export default Login;
