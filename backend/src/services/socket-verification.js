import mongoose from 'mongoose';
import user from '../models/user.js';
import jwt from 'jsonwebtoken';
import Cryptr from 'cryptr';

export async function verifySubscriptions(token) {
    try{
        const verifiedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        const cryptr = new Cryptr(process.env.CRYPTR_SECRET);
        const userId = cryptr.decrypt(verifiedToken.id);
        const verifiedUser = await user.findById({_id: userId});
        const validTeams = verifiedUser.subscription.map(subs => subs.teamId);
        return validTeams;
    }
    catch(err){
        console.error('error while verifying user subscription in socket connection.');
    }
}
