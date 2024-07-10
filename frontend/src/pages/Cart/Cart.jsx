import React, { useContext } from 'react'
import "./Cart.css"
import { StoreContext } from '../../Components/Context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { cartItems, food_list, removeFromCart, addToCart, getTotalAmountCart,url } = useContext(StoreContext)
  const navigate = useNavigate()

  const subtotal = getTotalAmountCart()
  const deliveryFee = subtotal === 0 ? 0 : 20
  const total = subtotal + deliveryFee

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
          <p>Add</p>
        </div>
        <br />
        <hr />
        {
          food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={index}>
                  <div className="cart-items-title cart-items-item">
                    <img src={url+"/images/"+item.image} alt="" />
                    <p>{item.name}</p>
                    <p>₹{item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>₹{item.price * cartItems[item._id]}</p>
                    <p onClick={() => removeFromCart(item._id)} className='cross'>-</p>
                    <span onClick={() => addToCart(item._id)} className='plus'>+</span>
                  </div>
                  <hr />
                </div>
              )
            }
            return null
          })
        }
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalAmountCart()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{deliveryFee}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>₹{total}</p>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>Proceed to checkout</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, please enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='Promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
