
import express from 'express';
import { getTeams } from '../controllers/team.js';

import authenticate from '../middlewares/authentication.js';

const teamRoute = express.Router();

teamRoute.get('/', authenticate, getTeams);



export default teamRoute;

