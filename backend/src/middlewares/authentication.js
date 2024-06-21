import jwt from 'jsonwebtoken';
import Cryptr from 'cryptr';
import User from '../models/user.js';

const authenticate = async(req, res, next) => {
    try{
        const token = req.headers.authorization;
        if(!process.env.JWT_TOKEN_SECRET)
            throw new Error('JWT_TOKEN_SECRET_NOT_FOUND in env');
        if(!process.env.CRYPTR_SECRET)
            throw new Error('CRYPTR_SECRET_NOT_FOUND in env');
            
        const verifiedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        const cryptr = new Cryptr(process.env.CRYPTR_SECRET);
        const userId = cryptr.decrypt(verifiedToken.id);
        const verifiedUser = await User.findById({_id: userId});

        if(verifiedUser){
            req.user = verifiedUser;
            next();
        }
        else
            return res.status(401).json({error: "User not verified", message: "User not verified. \nPlease sign-in again"});
    }
    catch(err){
        if(err.name === 'JsonWebTokenError')
            return res.status(401).json({ error: 'User unauthorized', message: 'User unauthorized. \nPlease sign-in again'});
        if(err.name === 'TokenExpiredError')
            return res.status(401).json({error: 'Token expired', message: 'Authentication token expired. \nPlease sign in again'});

        console.error('authenticationError: ', err);
        res.status(500).json({message: "Internal server error"});
    }
}

export default authenticate;