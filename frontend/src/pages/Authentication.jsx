import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/auth-context';
import { Button, Form,  } from 'react-bootstrap';
import axios from 'axios';

const signup = async(email, password)=>{
    try{
        const res = await axios.post(`${import.meta.env.VITE_URL}/user/signup`,{email: email, password: password});
        alert(res.data.message);
    }
    catch(err){
        throw err;
    }
}

const signin = async(email, password)=>{
    try{
        const res = await axios.post(`${import.meta.env.VITE_URL}/user/signin`,{email: email, password: password});
        alert(res.data.message);
        return res.data;
    }
    catch(err){
        throw err;
    }
}

const Authentication = () => {
    const { login, updateSubscription } = useContext(AuthContext);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '', role: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            if(isSignUp){
                await signup(formData.email, formData.password);
                setIsSignUp(false);
            }
            else{
                const data = await signin(formData.email, formData.password);
                login(data.token);
                updateSubscription(data.subscription.map(team=>team.teamId));
            }
        }
        catch(err){
            alert(err.response.data.message || err.response.data.error);
        }
    };

    return (
        <div className="">
            <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
            <Form onSubmit={handleSubmit} className='d-flex flex-column border border-2 px-5 py-3  rounded-2 gap-2  '>
                <Form.Control type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <Form.Control type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required/>
                {isSignUp && (<Form.Control type="text" name="role" placeholder="Role (user/admin)" value={formData.role} onChange={handleChange}/>)}
                <Button className="btn btn-primary mt-2" type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
            </Form>
            <Button className='bg-transparent text-dark-emphasis border-0 ' onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </Button>
        </div>
    );
};

export default Authentication;
