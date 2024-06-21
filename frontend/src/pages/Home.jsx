import React, { Fragment, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/auth-context'
import TeamPanel from '../components/TeamPanel';
import axios from 'axios';

function Home() {
    const ctx = useContext(AuthContext);
    const [teams, setTeams] = useState([]);

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
                console.log(err)
                // alert(err.response.data.message);
            }
        }
        fetchteams();
    },[]);

  return (
    <Fragment>
        <div>
            <TeamPanel teamData={teams} />
        </div>
    </Fragment>
  )
}

export default Home