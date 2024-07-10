import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://gokulReddy:Gokul1201@cluster0.0srhea9.mongodb.net/food_del').then(()=>console.log("DB Connected"))
}