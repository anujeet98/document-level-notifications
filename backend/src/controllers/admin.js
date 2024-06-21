import team from '../models/team.js';
import post from '../models/post.js';
import { Types } from 'mongoose';

export const updatePlayers = (req, res, next) => {
    try{

    }
    catch(err){
        if(err.name==='BSONError')
          res.status(400).json({message: "Invalid teamId recieved", error: "Invalid teamId"});
      console.error('AddPostError:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}


export const addPost = async(req, res, next) => {
    try {
        const { teamId } = req.params;
        const { title, content } = req.body;
    
        const newpost = new post({ title: title, content: content, team: new Types.ObjectId(teamId)});

        await newpost.save();
    
        // Add the postid to the team's posts 
        const teamRes = await team.findById(teamId);
        teamRes.posts.push(newpost._id);
        await teamRes.save();
    
        res.status(201).json({ message: 'Post added successfully', newpost });
      } catch (error) {
        if(error.name==='BSONError')
            return res.status(400).json({message: "Invalid teamId recieved", error: "Invalid teamId"});
        console.error('AddPostError:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
}

