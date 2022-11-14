import React, { useEffect, useState } from 'react';
import img1 from '../../assets/tiger_ust.jpg';
import './homepage.css';
import Post from '../../components/post/Post';
import { UserAuth } from '../../context/AuthContext';
import axios from 'axios';
import autotable from 'jspdf-autotable';
import jsPDF from 'jspdf';

function Homepage() {

  const { user } = UserAuth();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const email = user.email;
    axios.get(`https://aust-chatbot.herokuapp.com/readLogsUse/${email}`).then((response) => {
      setLogs(response.data);
    });
  }, [logs]);

  const generatePDF = () =>{
    const data = logs;
    const logcontainer = [];

    for(var i = 0 ; i < data.length; i++){
      logcontainer.push([data[i].date, data[i].email, data[i].description])
    }
    console.log(logcontainer);

    const date = new Date(Date.now()).toLocaleDateString();
    const doctitle = 'ChatbotLog '+date;
   
    var doc = new jsPDF('portrait', 'px', 'a4', 'false');

    autotable(doc, {
      head: [['Date & Time', 'Email', 'Description']],
      body: 
        logcontainer
      
    }
      
      )

    doc.save(doctitle);
  }

  return (
    <div className="body_homepage">
        
  
    <div className="contentadmin">
        <div className="textBox_user">
            <h2>Hello, <br></br> <span>{user?.displayName}</span></h2>
            <p>Content Administrator / {user?.email}</p><br></br>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores reprehenderit, soluta quae magnam quas quos dignissimos totam, sequi cum iure fuga dolor placeat ipsum nisi consequuntur sit magni, ex deleniti?</p>
            <a href='/Chatbot_Content'>Edit your Chatbots</a>
            </div>
            <div class="imgBox">
            <img src= {img1} className='school'></img>
        </div>
        
    </div>
    <Post/>
    <div className="textBox">
        <h2>System Logs<br></br></h2>
        </div>
        <div className='divider'></div>
        <div className='button_container' >
            <button onClick={() => generatePDF()} >Download pdf</button>
          </div>
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
    
  )
}

export default Homepage;