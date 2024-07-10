import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"
import { loginUser } from "./userController.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const frontend_url = "https://food-ordering-website-frontend-anem.onrender.com"

const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        
        if (amount < 50) {
            throw new Error('The total amount must be at least ₹50.');
        }

        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        const line_items = items.map(item => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "delivery charges",
                },
                unit_amount: 20 * 100,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const verifyOrder = async (req,res) => {
    const{orderId,success} = req.body
    try {
        if(success == "true"){
            await orderModel.findByIdAndUpdate(orderId,{paymentMode:true})
            res.json({success:true,message:"Paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false,message:"Not Paid"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// user orders for frontend

const userOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const listOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const updateStatus = async (req,res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"status updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}
