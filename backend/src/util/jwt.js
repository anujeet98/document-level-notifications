import Cryptr from 'cryptr';
import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    try{
        const expirationTimeInSeconds = 3600;
        const tokenExpiry = Math.floor(Date.now() / 1000) + expirationTimeInSeconds;
        if(!process.env.JWT_TOKEN_SECRET)
            throw new Error('JWT_TOKEN_SECRET missing in the environment variables');
        if(!process.env.CRYPTR_SECRET)
            throw new Error('CRYPTR_SECRET missing in the environment variables');
    
        const cryptr = new Cryptr(process.env.CRYPTR_SECRET);
        const payload = {
            email: user.email,
            subscription: user.subscription,
            tokenExpiry: tokenExpiry,
            id: cryptr.encrypt(user._id),
        }
        
        return jwt.sign(payload, process.env.JWT_TOKEN_SECRET);
    }
    catch(err){
        throw err;
    }
}