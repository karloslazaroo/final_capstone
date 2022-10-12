import React, { useEffect  } from 'react';
import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './login.css';


function Signin (){

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


