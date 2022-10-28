import React, { useEffect  } from 'react';
import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './login.css';
import chathead from '../../assets/chathead.png';
import logo from '../../assets/logo.png'



function Signin (){
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, []);
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
      try{
          await googleSignIn();
      } catch (error){
          console.log(error);
      }
  };

  useEffect(() => {
    if(user != null){
      
      const email = user.email;
      
    
      if(email == "karlosandrew.lazaro.cics@ust.edu.ph"){
          navigate('/super');
      } else  {
        Axios.get(`http://localhost:3001/readAdminLogin/${email}`).then((response) => {
        if(response.data == "") {
          navigate('/user');
        } else {
          navigate('/content');
        }
      }); 
      } 
    } else if (user == null) {
      navigate('/');
    }
  }, [user])

  return (
    <div className='bodyLogin' >
      
      <df-messenger
  intent="WELCOME"
  chat-title="TOM"
  agent-id="beb564f0-4454-458b-bb19-8af15b20608b"
  language-code="en"
  chat-icon= {chathead}
></df-messenger>
    <div className='login'>
      <div className='formLogin'>
        <div className="picture">
      <img src= {logo} className='login_logo'></img>
      </div>
        <a>
        <GoogleButton className='google' onClick={handleGoogleSignIn} />
       </a>
      </div>
      
    </div>
    </div>
    
  )
}

export default Signin;


