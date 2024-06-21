import React, { useContext, useEffect, useState } from 'react';
import { Form, FormLabel, FormSelect } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../contexts/auth-context';

// const teams = ["Kolkata Knight Riders", "Rajasthan Royals", "Sunrisers Hyderabad", "Royal Challengers Bangalore", "Chennai Super Kings", "Delhi Capitals", "Lucknow Super Giants", "Gujrat Titans", "Punjab Kings", "Mumbai Indians"];

const addPost = async(token, teamId, title, content)=>{
    try{
        const result = await axios.post(`${import.meta.env.VITE_URL}/admin/team/${teamId}/posts`,{
            title: title,
            content: content,
        },{
            "headers": {
                "Authorization": token
            }
        });
        alert(result.data.message);
    }
    catch(err){
        alert(err.response.data.message);
    }
}


const AdminPage = () => {
   const ctx = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [teams, setTeams] = useState([]);
  const [content, setContent] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    const cnf = confirm('please confirm submission');
    if(cnf){
        await addPost(ctx.user, selectedTeam ,title, content);
    }
    setTitle('');
    setContent('');
    setSelectedTeam('');
  };

  useEffect(()=>{
    const fetchteams = async()=>{
        try{
            const result = await axios.get(`${import.meta.env.VITE_URL}/team`,{
                "headers": {
                    "Authorization": ctx.user
                }
            });
            // const teamIds = result.data.map(team=>team._id);
            setTeams(result.data);
        }
        catch(err){
            alert(err.response.data.message);
        }
    }
    fetchteams();
  },[]);
  return (
    <div className='d-flex flex-column align-items-center justify-content-center '>
      <h1>Admin Page</h1>
      <h2>Add Post</h2>
      <Form onSubmit={handleSubmit}>
        <div className='d-flex flex-column '>
          <FormLabel className='me-auto'>Title:</FormLabel>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className='d-flex flex-column '>
          <FormLabel className='me-auto'>Content:</FormLabel>
          <Form.Control as="textarea" rows={3} value={content} onChange={(e) => setContent(e.target.value)}required/>
        </div>
        <div className='d-flex'>
          <FormLabel>Select IPL Team:</FormLabel>
          <FormSelect className='overflow-y-scroll' value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}required>
            <option key={0} value={''}>{''}</option>
            {teams.map(team=><option key={team._id} value={team._id}>{team.name}</option>)}
          </FormSelect>
        </div>
        <button className='btn btn-primary rounded-2' type="submit">Submit</button>
      </Form>
    </div>
  );
};

export default AdminPage;
