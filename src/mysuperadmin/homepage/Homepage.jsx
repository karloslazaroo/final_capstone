import React from 'react';
import img1 from '../../assets/tiger_ust.jpg';
import './homepage.css';
import Post from '../../components/post/Post';
import { UserAuth } from '../../context/AuthContext';

const Homepage = () => {

  const { user } = UserAuth();
  return (
    <div className="body_homepage">
        
  
    <div className="content">
        <div className="textBox_superadmin">
            <h2>Hello, <br></br> <span>{user?.displayName}</span></h2>
            <p>Super Administrator / {user?.email}</p><br></br>
            <a href='/Chatbot_Admin'>Edit your Chatbots</a>
            </div>
            <div class="imgBox">
            <img src= {img1} className='school'></img>
        </div>
        
    </div>
    <Post/>
    </div>
    
  )
}

export default Homepage