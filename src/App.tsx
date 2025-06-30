import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Login from './routes/Login';
import Dashboard from './routes/Dashboard';
import NoPage from './routes/NoPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
          <Route index element={<Login />} />
         <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
