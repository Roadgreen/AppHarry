import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SignUp from './components/inscription/SignUp';
import Loader from './components/loader/Loader'
import Home from './components/Home/Home'
import reportWebVitals from './reportWebVitals';
import HouseTest from './components/inscription/House/HouseTest';
import HouseResult from './components/inscription/House/HouseResult';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>
        <Route index element={<App />} />
          <Route path="SignUp" element={<SignUp/>} />
          <Route path="Home" element={<Home/>} />
          <Route path="AccountCreation" element={<HouseTest/>} />
          <Route path="Loader" element={<Loader/>} />
          <Route path="Ordre" element={<HouseResult/>}/>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
