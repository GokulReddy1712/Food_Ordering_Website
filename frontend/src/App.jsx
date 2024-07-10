import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./Components/Footer/Footer";
import { useState } from "react";
import LoginPopUp from "./Components/LoginPopUp/LoginPopUp";
import MyOrders from "./pages/MyOrders/MyOrders.jsx";



function App() {
  const[showLogin,setShowLogin] = useState(false)
  return (
    <>
      {
        showLogin?<LoginPopUp setShowLogin={setShowLogin}/>:<></>
      }
      <div className="app">
        <NavBar showLogin = {showLogin} setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element = {<Home/>}/>
          <Route path="cart" element = {<Cart/>}/>
          <Route path="order" element = {<PlaceOrder/>}/>
          <Route path="/myorders" element = {<MyOrders/>} />
        </Routes>
      </div>
      <Footer/>
    </>
  );
}

export default App;
