import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Dashboard from "./components/Dashboard";
import Finance from "./components/Finance";
import Uiinterface from "./components/Uiinterface";
import Reportgeneration from "./components/Reportgeneration";
import Productlist from "./components/Productlist";
import SignLoginContainer from "./components/SignLoginContainer";
import Userlist from "./components/Userlist";
const App = () => {
  const loginAuth = useSelector((state) => state.login)
  let userLoginAuth = loginAuth.login
  const [loginState, setLoginState] = useState(false)
  useEffect(() => {
    setLoginState(userLoginAuth)
  })
  return (
    loginState ?
      <BrowserRouter>
        <Dashboard />
        <Routes>
          <Route>
            <Route exact path='/' element={<Finance />} />
            <Route exact path='/finance' element={<Finance />} />
            <Route exact path='/uiinterface' element={<Uiinterface />} />
            <Route exact path='/reportgeneration' element={<Reportgeneration />} />
            <Route exact path='/productlist' element={<Productlist />} />
            <Route exact path='/userlist' element={<Userlist />} />
          </Route>
        </Routes>
      </BrowserRouter> :
      <div className='App'>
        <SignLoginContainer />
      </div>
  )
}

export default App