import React, { useEffect  } from 'react';
import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './login.css';
import chathead from '../../assets/chathead.png';
import logo from '../../assets/logo2.png'



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
      
      if(email == "karlosandrew.lazaro.cics@ust.edu.ph") {
          navigate('/super');
      } else  {
        Axios.get(`https://aust-chatbot.herokuapp.com/readAdminLogin/${email}`).then((response) => {
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
  agent-id="ceefe9bb-13a3-4f75-976b-b312b79ab17f"
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
    <div class="custom-shape-divider-bottom-1667119216">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
    </svg>
</div>
    </div>
    
  )
}

export default Signin;


