import team from "../models/team.js"


export const getTeams = async(req, res, next) => {
    try{
        const result = await team.find({}).select('name city coach captain');
        res.status(200).json(result);
    }   
    catch(err){
        res.status(500).json({message: "Internal server error."})
    }
}