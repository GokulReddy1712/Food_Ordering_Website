import React, { useEffect } from 'react';
import "./Verify.css";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../../Components/Context/StoreContext'; // Adjust the import path as needed
import axios from 'axios';

const Verify = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);

  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${url}/api/order/verify`, { orderId, success });
      console.log(response);
      if (response.data.success) {
        navigate("/myorders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []); // Only run on mount

  return (
    <div className="verify">
      <div className="spinner">
        {/* Spinner or loading indicator */}
      </div>
    </div>
  );
};

export default Verify;
