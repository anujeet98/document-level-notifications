import { config } from 'dotenv';
config();
import express from 'express';
import http from 'http';
import cors from 'cors';
import dbConfig from './config/db.js';
import userRoutes from './routes/user.js';
import adminRoutes from './routes/admin.js';
import initSocket from './sockets/socket.js';
import teamRoute from './routes/team.js';
import { Server } from 'socket.io';
import watchTeamChanges from './services/document-listener.js';



const app = express();
const server = http.createServer(app);
// const io = initSocket(server);
const io = new Server(server, { cors: { origin: '*' } });
initSocket(io);
watchTeamChanges(io);


app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/team', teamRoute);


async function serverInit(){
    try{
        const PORT = process.env.PORT || 8000;
        await dbConfig();
        server.listen(PORT, ()=>{
            console.info(`Server is running on PORT :: ${PORT}`);
        });
    }
    catch(err){
        console.info(`Server not initialized...`);
        console.error(err);
        process.exit(1);
    }
}
await serverInit();



