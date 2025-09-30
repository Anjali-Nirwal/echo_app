import express from "express";
import { createServer } from "node:http";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
const server=createServer(app);
const io=connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({limit:"50kb", extended: true }));
app.use("/api/users", userRoutes);


 async function  main(){
  try{
    const mongodb= await mongoose.connect("mongodb+srv://Chauhan:X9ISQLOIFIV0PzM1@cluster0.agldke8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log(`MongoDB is connected to ${mongodb.connection.host}`);
  }
  catch(err){
    console.log(err);
  }  
}
main();

app.get("/Home", (req, res) => {
  res.json({ status: "Hello" });
});

server.listen(app.get("port"), () => {
  console.log("Server is running on port 8000");
});
