import React from 'react'
import ust from '../../assets/ust.png'
import './sidebar.css'
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';



function App() {

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
            <div class="nav-links_user">
                <li><a href="/user"><i class="fa-solid fa-house-user"></i><p>Dashboard</p></a></li>
                <li><a href="/Announcements_User"><i class="fa-solid fa-bullhorn"></i><p>Announcements</p></a></li>
                
                <li><a href="/Talktous_User"><i class="fa-solid fa-address-book"></i><p>Talk To Us!</p></a></li>
                
                <li><a href="/Ratings_User"><i class="fa-solid fa-star"></i><p>Rate Us!</p></a></li>
                <li><a href="#" onClick={handleSignOut}><i class="fa-solid fa-right-from-bracket"></i><p>Logout</p></a></li>
                <div class="active"></div>
            </div>
            
        </div>
    </div>
     
    
  )
}

export default App;
