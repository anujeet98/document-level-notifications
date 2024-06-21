import {Server} from 'socket.io';
import { verifySubscriptions } from '../services/socket-verification.js';


function initSocket(io) {
    // const io = new Server(server, { cors: { origin: '*' } });
    console.log('socket server established...');

    io.on('connection', (socket) => {
        console.log('New client connected....');

        socket.on('update-subscription', async(token) => {
            try{
                //verify user and authenticate its subscription
                const validTeams = await verifySubscriptions(token);
                validTeams.forEach((teamId) => {
                    socket.join(teamId.toString());
                });
                socket.emit('subscriptionResult', { validTeams });
            }
            catch (error) {
                console.error('Error in subscription:', error);
                socket.emit('subscriptionError', { message: 'Failed to update subscription' });
            }
        });
    });
    return io;
    
}

export default initSocket;
