
import express from 'express';
import {signin, signup} from '../controllers/user.js';
import { validateSignup, validateSignin } from '../middlewares/validate-input.js';
import {addSubscription, removeSubsrciption} from '../controllers/subscription.js';
import authenticate from '../middlewares/authentication.js'
import { validateSubscription } from '../middlewares/validate-input.js';

const userRoute = express.Router();

userRoute.post('/signin', validateSignin, signin);
userRoute.post('/signup', validateSignup, signup);

// userRoute.post('subscribe/:teamId/fields', authenticate, validateSubscription, addSubscription);
// userRoute.delete('subscribe/:teamId/fields/:field', authenticate, validateSubscription, removeSubsrciption);

userRoute.post('/subscribe/:teamId', authenticate, validateSubscription, addSubscription);
userRoute.delete('/subscribe/:teamId', authenticate, validateSubscription, removeSubsrciption);

export default userRoute;