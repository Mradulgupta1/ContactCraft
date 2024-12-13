                                                    // ॥ श्री गणेशाय नमः ॥ 



import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async() => {

    mongoose.set('strictQuery', true)

    if(isConnected){
        console.log("Mongoose is already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "contact-management",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;

        console.log("Mongoose is connected successfully");
        
    } catch (error) {
        console.log(error)
    }
}