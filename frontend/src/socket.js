import { io } from 'socket.io-client';


const URL = import.meta.env.VITE_URL;

export const socket = io(URL);


socket.on('subscriptionResult', (validTeams)=>{
    console.log(validTeams)
});


socket.on('teamUpdate', (new_post)=>{
    console.log('aaaaaaa', new_post)
    alert(new_post.title);
});