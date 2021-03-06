import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import { Route, Routes } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';

const App = () => {
  return (
      <>
        <Navbar />
        <Routes>
        <Route exact path = "/" element={<Home />} />
        <Route exact path = "/about" element={<About />} />
        <Route exact path = "/contact" element={<Contact />} />
        <Route exact path = "/login" element={<Login />} />
        <Route exact path = "/signup" element={<Signup />} />
        <Route path = "*" element={<ErrorPage />} />

        </Routes>
      </>
  )
}

export default App;