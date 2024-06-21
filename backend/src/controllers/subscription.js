


export const addSubscription = async(req, res, next) => {
    try{
        const {user} = req;
        const { teamId } = req.params;
        // const { field } = req.body;

        let subscription = user.subscription.find(sub => sub.teamId.toString()===teamId);
        if(!subscription){
            //team subscription not present
            user.subscription.push({
                teamId: teamId,
                fields: ['posts']
                // fields: [field]
            });
            await user.save();
            return res.status(200).json({message: 'User subscription added successfully'});
        }
        return res.status(400).json({ error: 'duplicate subscription found', message: 'Subscription already exists' });


        //if subscription to team already present, Check for the field subscription
        // if (!subscription.fields.includes(field)) {
        //     subscription.fields.push(field);
        //     await user.save();
        //     res.status(200).json({ message: 'Field added to subscription successfully' });
        //   } else {
        //     res.status(400).json({ error: 'Field already exists in user\'s subscription' });
        //   }
        
    }
    catch(err){
        if(err.name==='ValidationError')
            return res.status(404).json({ error: 'Invalid teamId recieved' });
        console.error('addSubscriptionError:', err.message);
        return res.status(500).json({ error: 'Internal server error while adding subscription' });
    }
}


export const removeSubsrciption = async(req, res, next) => {
    try{
        const {user} = req;
        // const { teamId, field } = req.params;
        const { teamId } = req.params;

        let subscription = user.subscription.find(sub => sub.teamId.toString()===teamId);
        if(!subscription){
            //team subscription not present
            return res.status(400).json({message: 'User not subscribed to the team'});
        }

        user.subscription = user.subscription.filter(sub => sub.teamId.toString()!==teamId);
        await user.save();
        res.status(200).json({ message: 'User subscription updated successfully' });

        //if subscription to team already present, Check for the field subscription
        // if (subscription.fields.includes(field)) {
        //     subscription.fields = subscription.fields.filter(sub_field => sub_field!==field);
        //     if(subscription.fields.length === 0){
        //         user.subscription = user.subscription.filter(sub => sub.teamId.toString()!==teamId);
        //     }
        //     else{
        //         user.subscription = user.subscription.map(sub => {
        //             if(sub.teamId.toString()===teamId)
        //                 return {...sub, fields: updatedSubscriptionFields};
        //             return sub;
        //         });
        //     }
        //     await user.save();
        //     res.status(200).json({ message: 'User subscription updated successfully' });
        // } else {
        //     res.status(400).json({ error: 'Field doesn\'t exists in user\'s subscription' });
        // }
        
    }
    catch(err){
        if(err.name==='ValidationError')
            return res.status(404).json({ error: 'Invalid teamId recieved' });
        console.error('addSubscriptionError:', err.message);
        return res.status(500).json({ error: 'Internal server error while removing subscription' });
    }
}