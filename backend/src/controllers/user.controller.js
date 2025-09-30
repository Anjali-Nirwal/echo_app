import { User } from "../models/user.model.js";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import crypto from "crypto";



export const login = async (req, res) => { 
    const { username, password } = req.body;
    if(!username || !password){
        return res.status(httpStatus.BAD_REQUEST).json({message:"Username and password are required"});
    }
    try{
        const user=await User.findOne({username});
        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({message:"User not found"});
        }

        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(httpStatus.UNAUTHORIZED).json({message:"Invalid password"});
        }

        let token=crypto.randomBytes(16).toString("hex");
        user.token=token;
        await user.save();
        res.status(httpStatus.OK).json({message:"Login successful",token})

    }
    catch(error){    
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message:`Server error ${error}`});
}
}

export const register = async (req, res) => {
  const { username, name, password, email } = req.body;

  try {
    const existinguser = await User.findOne({ username });
    if (existinguser) {
      return res
        .status(httpStatus.CONFLICT)
        .json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      name: name,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    res
      .status(httpStatus.CREATED)
      .json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: `Server error ${error.message}` });
  }
};
