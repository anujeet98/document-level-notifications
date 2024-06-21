
import express from 'express';
import { addPost, updatePlayers } from '../controllers/admin.js';
import { validateSubscription , validateAddPost} from '../middlewares/validate-input.js';

import authenticate from '../middlewares/authentication.js'
import adminMiddleware from '../middlewares/adminMiddleware.js'; 

const adminRoute = express.Router();

adminRoute.put('/team/:teamId', authenticate, adminMiddleware, updatePlayers);
adminRoute.post('/team/:teamId/posts', authenticate, adminMiddleware, validateAddPost, addPost);



export default adminRoute;




// async (req, res) => {
//   try {
//     const { teamId } = req.params;
//     const updateData = req.body;

//     const team = await Team.findByIdAndUpdate(teamId, updateData, { new: true });
//     if (!team) {
//       return res.status(404).json({ error: 'Team not found' });
//     }

//     res.status(200).json({ message: 'Team updated successfully', team });
//   } catch (error) {
//     console.error('Error updating team:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// // Route to add a new post for a team
// async (req, res) => {
//   try {
//     const { teamId } = req.params;
//     const { content } = req.body;

//     const post = new Post({ team: teamId, content });
//     await post.save();

//     // Add the post to the team's posts array
//     const team = await Team.findById(teamId);
//     team.posts.push(post._id);
//     await team.save();

//     res.status(201).json({ message: 'Post added successfully', post });
//   } catch (error) {
//     console.error('Error adding post:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// module.exports = router;