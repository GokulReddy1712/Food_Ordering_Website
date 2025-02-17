import React from 'react'
import NavBar from './Components/NavBar/NavBar'
import SideBar from './Components/SideBar/SideBar'
import { Routes,Route } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const url = "https://food-ordering-websitee.onrender.com"
  return (
    <div>
      <ToastContainer/>
      <NavBar/>
      <hr/>
      <div className="app-content">
        <SideBar/>
        <Routes>
          <Route path='/add' element = {<Add url={url}/>}></Route>
          <Route path='/list' element = {<List url={url} />}></Route>
          <Route path='/orders' element = {<Orders url={url} />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
