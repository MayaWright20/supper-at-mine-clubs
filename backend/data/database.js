
import mongoose from "mongoose";

export const connectDB = async () => {
    console.log('in connectDB')
    try{
        const {connection } = await mongoose.connect(`${process.env.MONGO_URI}`, {
            dbName: "identity-circle",
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000
        });
        
        console.log(`Server connected to database ${connection.host}`);

    }catch(error){
        console.log("Error occurred", error.message);

        process.exit(1);
    }
}