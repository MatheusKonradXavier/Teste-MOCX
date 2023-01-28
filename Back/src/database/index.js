import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.set('strictQuery', true)
mongoose.connect(
  process.env.CONNECTION_STRING,
  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  }),
  (err) => {
    if(err){
      console.log(err);
    }else{
      console.log("Connected to MongoDB")
    }
  } 
