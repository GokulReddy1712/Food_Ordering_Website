import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className="footer" id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ea expedita est libero atque quia excepturi repudiandae, ratione nisi iste rem vel similique odio molestiae nemo impedit! Harum, recusandae? Tempora.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>Get In Touch</h2>
                <ul>
                    <li>9940552783</li>
                    <li>gokul17122001@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2024 @ Tomato.com - All Right Reserved</p>
    </div>
  )
}

export default Footer