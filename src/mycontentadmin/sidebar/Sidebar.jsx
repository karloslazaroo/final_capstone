import React from 'react'
import ust from '../../assets/ust.png'
import './sidebar.css'
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';




const sidebar = () => {
  const {logOut} = UserAuth()
  const navigate = useNavigate();

    const handleSignOut = async () => {
        try{
            await logOut();
            navigate('/');
        } catch (error){
            console.log(error);
        }
    }
  return (
      <div class="header">
        <div class="side-nav">
            <a href="#" class="logo">
                <img src={ust} class="logo-img"/>
            </a>
            <div class="nav-links">
                <li><a href="/content"><i class="fa-solid fa-house-user"></i><p>Dashboard</p></a></li>
                <li><a href="/Announcements_Content"><i class="fa-solid fa-bullhorn"></i><p>Announcements</p></a></li>
                <li><a href="Chatbot_Content"><i class="fa-solid fa-headset"></i><p>Chatbot Interface</p></a></li>
                <li><a href="/Unanswered_Content"><i class="fa-solid fa-address-book"></i><p>Questions</p></a></li>
                <li><a href="/Analytics_Content"><i class="fa-solid fa-chart-line"></i><p>Analytics</p></a></li>
                <li><a href="/Ratings_Content"><i class="fa-solid fa-star"></i><p>Ratings & Reviews</p></a></li>
                <li><a href="/" onClick={handleSignOut}><i class="fa-solid fa-right-from-bracket"></i><p>Logout</p></a></li>
                <div class="active"></div>
            </div>
            
        </div>
    </div>
     
    
  )
}

export default sidebar
