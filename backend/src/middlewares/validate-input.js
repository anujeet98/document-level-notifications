// import { check, validationResult } from 'express-validator';
// import team from '../models/team.js';

export const validateSignup = (req, res, next) => {
    var validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const {email, password} = req.body;
    if(!email || !validRegex.test(email))
        return res.status(400).json({message: 'EmailID must be non-empty and valid', error:'Invalid email input'});
    if(!password || password.length < 6)
        return res.status(400).json({message: 'Password must be non-empty and more than 6 characters long', error: 'Invalid password input'});

    next();
}

export const validateSignin = (req, res, next) => {
    var validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const {email, password} = req.body;
    if(!email || !validRegex.test(email))
        return res.status(400).json({message: 'EmailID must be non-empty and valid', error:'Invalid email input'});
    if(!password)
        return res.status(400).json({message: 'Password must be non-empty', error: 'Invalid password input'});

    next();
}


// export const validateSubscription = async(req, res, next) => {
//     const {teamId} = req.params;
//     const field = req.params.field || req.body.field;

//     if(!field || !['players', 'posts'].includes(field))
//         return res.status(400).json({message: 'Invalid subscription selection', error:'Invalid subscription'});
//     if(!teamId)
//         return res.status(400).json({message: 'Invalid teamId recieved', error: 'Invalid teamId'});

//     next();
// }

export const validateSubscription = async(req, res, next) => {
        const {teamId} = req.params;
        // const field = req.params.field || req.body.field;
    
        // if(!field || !['players', 'posts'].includes(field))
        //     return res.status(400).json({message: 'Invalid subscription selection', error:'Invalid subscription'});
        if(!teamId)
            return res.status(400).json({message: 'Invalid teamId recieved', error: 'Invalid teamId'});
    
        next();
    }


export const validatePlayers= async(req, res, next) => {
    const {teamId} = req.params;
    const field = req.params.field || req.body.field;

    if(!field || !['players', 'posts'].includes(field))
        return res.status(400).json({message: 'Invalid subscription selection', error:'Invalid subscription'});
    if(!teamId)
        return res.status(400).json({message: 'Invalid teamId recieved', error: 'Invalid teamId'});

    next();
}


export const validatePosts = async(req, res, next) => {
    const {teamId} = req.params;
    const field = req.params.field || req.body.field;

    if(!field || !['players', 'posts'].includes(field))
        return res.status(400).json({message: 'Invalid subscription selection', error:'Invalid subscription'});
    if(!teamId)
        return res.status(400).json({message: 'Invalid teamId recieved', error: 'Invalid teamId'});

    next();
}

export const validateAddPost = async(req, res, next) => {
    const { teamId } = req.params;
    const { title, content } = req.body;


    if(!title)
        return res.status(400).json({message: 'Invalid title recieved', error:'Invalid title'});
    if(!content)
        return res.status(400).json({message: 'Invalid content recieved', error: 'Invalid content'});

    next();
}

