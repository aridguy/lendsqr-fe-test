import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NoPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Start countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Redirect after 5 seconds
    const redirectTimer = setTimeout(() => {
      navigate('/dashboard'); // Replace with your dashboard route
    }, 5000);

    // Cleanup timers to avoid memory leaks
    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div>
      <h1>Page not found!</h1>
      <p>Redirecting to dashboard in {countdown} seconds...</p>
    </div>
  );
};

export default NoPage;