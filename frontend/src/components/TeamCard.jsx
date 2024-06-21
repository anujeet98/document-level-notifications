import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { AuthContext } from '../contexts/auth-context';
import axios from 'axios';
import {socket} from '../socket';


export const TeamCard = ({ team }) => {
  const ctx = useContext(AuthContext);
  let isSubscribed = false;
  if(ctx.subscription.includes(team._id))
    isSubscribed=true;

  const handleSubscriptions = async() => {
    if(isSubscribed){
      const cnf = confirm('Please confirm before unsubscribing!');
      if(cnf){
          try{

              const res = await axios.delete(`${import.meta.env.VITE_URL}/user/subscribe/${team._id}`,{
                'headers':{
                  'Authorization': ctx.user
                }
              });
              socket.emit('update-subscription', ctx.user);
              alert(res.data.message);
              ctx.updateSubscription(ctx.subscription.filter(teamid=>teamid!=team._id));
          }
          catch(err){
            console.error(err);
            alert(err.response.data.message || err.response.data.error);
          }
      }
    }
    else{
      const cnf = confirm('Please confirm before subscribing!');
      if(cnf){
          try{
              const res = await axios.post(`${import.meta.env.VITE_URL}/user/subscribe/${team._id}`,{},{
                'headers':{
                  'Authorization': ctx.user
                }
              });
              socket.emit('update-subscription', ctx.user);
              alert(res.data.message);
              ctx.updateSubscription([...ctx.subscription, team._id]);
          }
          catch(err){
            console.error(err);
            alert(err.response.data.message || err.response.data.error);
          }
      }
    }
  }


  return (
    <Card style={{ width: '18rem', backgroundColor: team.color, margin: '1rem' }}>
      <Card.Body>
        <Card.Title>{team.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Captain: {team.captain}</Card.Subtitle>
        <Button variant={isSubscribed ? 'secondary' : 'primary'} onClick={handleSubscriptions} >Subscribe</Button>
      </Card.Body>
    </Card>
  );
};


