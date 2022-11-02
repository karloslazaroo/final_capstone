import React from 'react';
import img1 from '../../assets/tiger_ust.jpg';
import './homepage.css';
import Post from '../../components/post/Post';
import { UserAuth } from '../../context/AuthContext';

const Homepage = () => {

  const { user } = UserAuth();
  return (
    <div className="body_homepage">
        
  
    <div className="contentadmin">
        <div className="textBox_contentadmin">
            <h2>HELLO, <br></br> <span>{user?.displayName}</span></h2>
            <p>Content Administrator / College of Information and Computing Sciences</p><br></br>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores reprehenderit, soluta quae magnam quas quos dignissimos totam, sequi cum iure fuga dolor placeat ipsum nisi consequuntur sit magni, ex deleniti?</p>
            <a href='/Chatbot_Content'>Edit your Chatbots</a>
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