import { generateToken } from '../lib/util.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        if (!fullName || !email || !password) 
        {
            return res.status(400).json({message:"All fields are required"})
        }

        if (password.length < 6) 
        {
            return res.status(400).json({message:"Password must be at least 6 characters long"})
        }

        if (!/\S+@\S+\.\S+/.test(email)) 
        {
            return res.status(400).json({message:"Invalid email address"})
        }

         const user = await User.findOne({ email: email});
         if(user) return res.status(400).json({message:"Email is already registered"})

         //123 - > 2345tfvgy6uj
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password, salt);

         const newUser = new User({
            fullName,
            email,
            password: hashedPassword
         });

         if(newUser){
            generateToken(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            });
         }

         // todo: send a welcome email to user
         else 
         {
            res.status(400).json({message:"Invalid user data"})
         }

    } catch (error)  {
        console.log("Error in signup:", error);
        res.status(500).json({message:" Internal server error"});

    }
};