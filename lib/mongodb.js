import mongoose from "mongoose";
export const connectMongoDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
    }catch(error){
        console.log("Error conecting to MongoDB: ",error)
    }
}