import { connect } from 'mongoose';
import team from '../models/team.js';

export const populateInitialTeamData = async() =>{
    const teams = [
        {
            name: "Kolkata Knight Riders",
            city: "Kolkata",
            coach: "Chandrakant Pandit",
            captain: "Shreyas Iyer",
            players: ["Phil Salt", "Andre Russell"]
        },
        {
            name: "Rajasthan Royals",
            city: "Jaipur",
            coach: "Kumar Sangakara",
            captain: "Sanju Samson",
            players: ["Jos Butler", "Yashasvi Jaiswal"]
        },
        {
            name: "Sunrisers Hyderabad",
            city: "Hyderabad",
            coach: "Daniel Vettori",
            captain: "Pat Cummins",
            players: ["Travis Head", "Henrich Klassen"]
        },
        {
            name: "Royal Challengers Bangalore",
            city: "Bangalore",
            coach: "Andy Flower",
            captain: "Faf Duplesis",
            players: ["Virat Kohli", "Dinesh Karthik"]
        },
        {
            name: "Channai Super Kings",
            city: "Chennai",
            coach: "Stephen Fleming",
            captain: "Rituraj Gaikwad",
            players: ["MS Dhoni", "Shivam Dube"]
        },
        {
            name: "Delhi Capitals",
            city: "Delhi",
            coach: "Ricky Ponting",
            captain: "Rishabh Pant",
            players: ["David Warner", "Kuldeep Yadav"]
        },
        {
            name: "Lucknow Super Giants",
            city: "Lucknow",
            coach: "Justin Langer",
            captain: "KL Rahul",
            players: ["Marcus Stoinis", "Nicholas Pooran"]
        },
        {
            name: "Gujrat Titans",
            city: "Ahemdabad",
            coach: "Ashish Nehra",
            captain: "Shubhman Gill",
            players: ["Mathew Wade", "Rashid Khan"]
        },
        {
            name: "Punjab Kings",
            city: "Mohali",
            coach: "Trevor Bayliss",
            captain: "Shikhar Dhawan",
            players: ["Sam Curran", "Liam Livingston"]
        },
        {
            name: "Mumbai Indians",
            city: "Mumbai",
            coach: "Mark Boucher",
            captain: "Hardik Pandya",
            players: ["Rohit Sharma", "Jasprit Bumrah"]
        },
    ];
    try{
        await team.insertMany(teams);
    }
    catch(err){
        console.error('Error while loading initial data to MongoDB');
        throw new Error('LOAD_ERROR');
    }
}

const dbConfig = async () =>{
    try{
        await connect(`${process.env.DB_CONN}`);
        console.log('MongoDB connection establised.');

        //to load initial team data to DB
        const result = await team.find();
        if(result.length===0){
            await populateInitialTeamData();
            console.log('Initial data load success...');
        }
    }
    catch(err){
        if(err.message === 'LOAD_ERROR')
            throw err;
        throw new Error(`MongoDB connection not established...\n${err}`);
    }
}

export default dbConfig;