
import post from '../models/post.js';
import team from '../models/team.js'
// const redis = require('redis');
// const publisher = redis.createClient(); 



function watchTeamChanges(io) {
    // Set up the change stream
    const changeStream = team.watch();
  
    changeStream.on('change', async(change) => {
        if (change.operationType === 'insert' || change.operationType === 'update') {
            const teamId = change.documentKey._id.toString();
            const updatedFields = change.updateDescription?.updatedFields || change.fullDocument;

            //fetch post
            const new_post = await post.findById(updatedFields[Object.keys(updatedFields)[1]]);
    
            // Broadcast change notification to team's subscribers 
        
            console.log('triggereeee');
            console.log(teamId)
            try{
                io.to(teamId).emit('teamUpdate', new_post);
            }
            catch(err){
                console.log(err);
            }
            // console.log(`Broadcasting update to team ${teamId}`);
        }
    });
  
    changeStream.on('error', (error) => {
        console.error('Error in change stream:', error);
    });
  }
  

export default watchTeamChanges;