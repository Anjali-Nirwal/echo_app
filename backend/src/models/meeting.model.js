import mongoose from "mongoose";

const meetingSchema=new mongoose.Schema({
    user_id:{type:String,required:true},
    meetingcode:{type:String},  
    date:{type:Date,required:true},
});

const Meeting= mongoose.model('Meeting',meetingSchema);
export  {Meeting};