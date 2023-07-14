import React, { useEffect, useState } from "";
import img1 from '../../assets/tiger_ust.jpg';
import Axios from 'axios';
import './homepage.css';
import Post from '../../components/post/Post';
import { UserAuth } from '../../context/AuthContext';

function Homepage()  {
  const [logs, setLogs] = useState([]);

  const { user } = UserAuth();
  const name = user.displayName;

  useEffect(() => {
    const email = user.email;
    Axios.get(`https://aust-chatbot.herokuapp.com/readLogsUse/${email}`).then((response) => {
      setLogs(response.data);
    });
  }, [logs]);


  return (
    <div className="body_homepage">
        
  
    <div className="content">
        <div className="textBox_user">
            <h2>Hello, <br></br> <span>{name}</span></h2>
            <p>User / {user?.email}</p><br></br>
            <a href='/Talktous_User'>Message Us Now!</a>
            </div>
            <div class="imgBox">
            <img src= {img1} className='school'></img>
        </div>
        
    </div>
    <Post/>
  <div className="Logs"> 
<div className="systemlogs">
        <h2>System Logs<br></br></h2>
        </div>
        <div className='divider_user'></div>
        <div className="table" id='my-table'>
       
        {logs.map((data, index) =>{

return ( 
  
<div key={index} >
  

    
  <tr>
    <td>{data.date}</td>
    <td>{data.email}</td>
    <td>{data.description}</td>
    
    </tr>
  
   
 
</div>

)

})}
         
           
         
        </div>
        </div> 

       
    </div>
    
  )
}

export default Homepage