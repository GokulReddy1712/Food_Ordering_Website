import React, { useEffect, useState, useContext } from 'react';
import "./LoginPopUp.css";
import { assets } from '../../assets/assets';
import { StoreContext } from '../Context/StoreContext';
import axios from "axios";

const LoginPopUp = ({ setShowLogin }) => {
    const [currentState, setCurrentState] = useState("Login");
    const { url, token, setToken } = useContext(StoreContext);

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    useEffect(() => {
        console.log('LoginPopUp component mounted');  // Debugging line
    }, []);

    const onLogin = async (event) => {
        event.preventDefault();
        console.log('Form submitted');  // Debugging line
        let newUrl = url;
        if (currentState === "Login") {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }
        console.log('Sending request to:', newUrl);  // Debugging line
        console.log('Data being sent:', data);  // Debugging line

        try {
            const response = await axios.post(newUrl, data);
            console.log('Response:', response.data);  // Debugging line
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error:', error);  // Debugging line
            alert('An error occurred while processing your request.');
        }
    };

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({
            ...data, [name]: value
        }));
    };

    return (
        <div className="login-popup">
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currentState === "Sign Up" && (
                        <input
                            name="name"
                            onChange={onChangeHandler}
                            value={data.name}
                            type="text"
                            placeholder="Your Name"
                            required
                        />
                    )}
                    <input
                        name="email"
                        onChange={onChangeHandler}
                        value={data.email}
                        type="email"
                        placeholder="Your Email"
                        required
                    />
                    <input
                        name="password"
                        onChange={onChangeHandler}
                        value={data.password}
                        type="password"
                        placeholder="Your Password"
                        required
                    />
                </div>
                <button type="submit" >{currentState === "Sign Up" ? "Create Account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By Continuing, I agree to the terms of use and privacy policy</p>
                </div>
                {currentState === "Login" ? (
                    <p>Create a new account <span onClick={() => setCurrentState("Sign Up")}>Click Here</span></p>
                ) : (
                    <p>Already have an account <span onClick={() => setCurrentState("Login")}>Login Here</span></p>
                )}
            </form>
            
        </div>
    );
};

export default LoginPopUp;
