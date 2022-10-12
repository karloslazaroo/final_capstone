import React, { useEffect  } from 'react';
import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './login.css';


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
      
      /*switch (email) {
        case "geromeeleubert.rosal.cics@ust.edu.ph":
          navigate('/super');
          break;
        default:
          navigate('/content');
          break;
      }*/
      if(email == "geromeeleubert.rosal.cics@ust.edu.ph"){
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
      //navigate('/content');
      //navigate('/super');
  }
  }, [user])

  return (
    <div className='bodyLogin'>
      <df-messenger
  intent="WELCOME"
  chat-title="Heart"
  agent-id="beb564f0-4454-458b-bb19-8af15b20608b"
  language-code="en"
></df-messenger>
    <div className='login'>
      <div className='formLogin'>
        <h1>Welcome</h1>
        <a>
        <GoogleButton onClick={handleGoogleSignIn} />
       </a>
      </div>
      
    </div>
    </div>
  )
}

export default Signin;


