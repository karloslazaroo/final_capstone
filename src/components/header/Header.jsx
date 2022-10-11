import React from 'react';
import './header.css';
import logo from '../../assets/header.jpg';
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
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
    <div>
      <div class="topnav">
      <img src={logo} className='logo2' width={40} />
      <center>
            <button onClick={handleSignOut}> Logout </button>
            
  </center>
</div>
    </div>
  )
}

export default Header
