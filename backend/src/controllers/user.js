import User from "../models/user.js";
import { generateToken } from "../util/jwt.js";
import { hashPassword, verifyPassword } from '../util/password-hash.js';

export const signin = async(req, res, next) => {
    try{
        const { email, password } = req.body;

        //checking user exixts
        const user = await User.findOne({email});
        if(!user)
            return res.status(400).json({ message: 'EmailID used for authentication doesn\'t exists', error: 'Invalid user credentials' });
        
        const passwordMatch = await verifyPassword(password, user.password);
        if(!passwordMatch)
            return res.status(400).json({ message: 'Password doesn\'t match', error: 'Invalid user credentials'});

        const userToken = generateToken(user);
        return res.status(200).json({message: 'User signin success.', token: userToken, subscription: user.subscription});
    }
    catch(err){
        console.log("signin error: ",err);
        res.status(500).json({error: 'Internal server error while signin'});
    }
}

export const signup = async(req, res, next) => {
    try{
        const { email, password } = req.body;
  
        //checking existing user
        const existingUser = await User.findOne({email});

        if(existingUser)
            return res.status(400).json({ message: 'EmailID used for authentication already exists', error: 'User already exists' });

        //hash the password and create the new user
        const hashedPassword = await hashPassword(password);
        const newUser = new User({email: email, password: hashedPassword});
        await newUser.save();
        
        return res.status(200).json({message: 'User created succesfully'});
    }
    catch(err){
        console.log("signup error: ",err);
        res.status(500).json({error: 'Internal server error while signup'});
    }
}