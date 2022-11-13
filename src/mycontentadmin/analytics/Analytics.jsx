import React from 'react'
import './analytics.css'
import axios from 'axios';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement} from 'chart.js';
import autotable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import {Line} from 'react-chartjs-2';
import { errorPrefix } from '@firebase/util';
import {UserAuth} from '../../context/AuthContext'
import { useEffect } from 'react';

ChartJS.register(
  LineElement, CategoryScale,
  LinearScale, PointElement,
  CategoryScale, Title, Tooltip,
  Legend
  )


function Analytics(){
  
  const state = {talktousdata : [], reviewsdata: [], syslogdata : []};
  const labelscontainer = [];
  const datacontainer = [];
  const number = [];
  const reviewslabelscontainer = [];
  const reviewsdatacontainer = [];
  const {user} = UserAuth();
  
  
  //talk to us pa lang
  const ttudata = ({
    labels: labelscontainer ,
    datasets:[
      {
        label:"Talk to Us Function usage" ,
        data: datacontainer ,
        backgroundColor: 'yellow', // color of point
        borderColor: 'red', // color of line
        pointBorderWidth: 4, //point size
        tension: 0.5,
        fill: true
      }
    ]
  });

  const ttuoptions = {
    plugins:{
      legend: true
    },
    scales: {
      x:{
        grid:{
          display: false //display x grid
        }
      },
      y:{
        min: 0, //min value scaled in graph
        max: number[0],
        ticks: {
          stepSize: 1
        } 
      }
    }
  }

  const reviewsdata = ({
    labels: reviewslabelscontainer ,
    datasets:[
      {
        label:"Reviews Function usage" ,
        data: reviewsdatacontainer ,
        backgroundColor: 'yellow', // color of point
        borderColor: 'red', // color of line
        pointBorderWidth: 4, //point size
        tension: 0.5,
        fill: true
      }
    ]
  });

  const reviewsoptions = {
    plugins:{
      legend: true
    },
    scales: {
      x:{
        grid:{
          display: false //display x grid
        }
      },
      y:{
        min: 0, //min value scaled in graph
        max: number[1],
        ticks: {
          stepSize: 1
        } 
      }
    }
  }


  const getReviewsData = () =>{
    axios.get('https://aust-chatbot.herokuapp.com/readanalyticsreviews')
    .then((response)=>{
      const data = response.data;
      state.reviewsdata.push(data);

      console.log('Data from reviews received: ', data);
      data.sort(((a, b) => new Date(a._id) - new Date(b._id)));
      //code for staging date and count
      for(var i = 0; i < data.length; i ++){
        reviewslabelscontainer.push(data[i]._id);
      
        reviewsdatacontainer.push(data[i].count);
        
      }

      number.push(Math.max(...reviewsdatacontainer));

    })
    .catch(() =>{
      alert('Error getting reviews data');
      console.error();
    });

  };
  
  const getSysLogData = () =>{
    axios.get('https://aust-chatbot.herokuapp.com/readLogs')
    .then((response)=>{
      const data = response.data;

      for (var i =0 ; i < data.length; i++){
        state.syslogdata.push(data[i]);
      }
    
      console.log('Data from system log received: ', state.syslogdata);
    
    }).catch(() =>{
      alert('Error getting system log data')
    });
  }

  const gettalktousdatabyemail = () =>{
    const email = user.email;
    console.log(email);
    axios.get(`https://aust-chatbot.herokuapp.com/readanalytics/${email}`)
    .then((response)=>{
      const data = response.data;

      console.log(data);

      console.log(new Date(Date.now()).toLocaleString());
      data.sort(((a, b) => new Date(a._id) - new Date(b._id)));
      console.log('after', data);
      // //code for staging date and count
      for(var i = 0; i < data.length; i ++){
      labelscontainer.push(data[i]._id);
      datacontainer.push(data[i].count);
        
      }

    
      
      

      number.push(Math.max(...datacontainer));
      state.talktousdata.push(data);
      console.log('Data from talk to us received: ', data);
      
 
    
    })
    .catch(() =>{
      alert('Error getting talk to us data')
    });
  }
  
  


  /* const getTalktoUsData = () =>{
    axios.get('https://aust-chatbot.herokuapp.com/readanalytics')
    .then((response)=>{
      const data = response.data;

      

      console.log(new Date(Date.now()).toLocaleString());
      data.sort(((a, b) => new Date(a._id) - new Date(b._id)));
      console.log('after', data);
      //code for staging date and count
      for(var i = 0; i < data.length; i ++){
        labelscontainer.push(data[i]._id);
        datacontainer.push(data[i].count);
        
      }

    
      
      

      number.push(Math.max(...datacontainer));
      state.talktousdata.push(data);
      console.log('Data from talk to us received: ', data);
      
 
    
    })
    .catch(() =>{
      alert('Error getting talk to us data')
    });
   
  }; */

  useEffect (() =>{
    // getTalktoUsData();
    getReviewsData();
    getSysLogData();
    //  console.log('number',number);
    gettalktousdatabyemail();
  })

  // displayTalktoUsData = (talktousdata) =>{
  //   return talktousdata.map((ttsdata, index) => (
     
  //     <div key = {index} className='talktousdata_display' >
  //         <p>date: {ttsdata._id} count: {ttsdata.count}</p>
          
              
  //     </div>
  //     )
  //   )
  // }

  const generatePDF = () =>{
    const data = state.syslogdata;
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

  const displaysystemlogs= ()=>{

        return state.syslogdata.map((data, index) =>{
          return ( 
          <div key={index} >
            
            <tr>
              <td>{data.date}</td>
              <td>{data.email}</td>
              <td>{data.description}</td>
              
              </tr>
             
          </div>
        
        )

      })
        
         

        
      
      
  }



  return (
      
      <div className='analytics_body' >
        { <div className="textBox_analytics_content">
        <h2>Analytics<br></br></h2>
        </div> 
        }
         <div className='divider_analytics_content'></div>
        {/* {displayTalktoUsData(state.talktousdata)} */}
        {/* {datacontainer} */}
        <h2>Talk to Us~</h2>
        <div className='graph_container_content' style={{width:'1200px', height:'600px'}}>
          <Line data={ttudata} options={ttuoptions}></Line>

        </div>
        <h2>Reviews~</h2>
         <div className='graph_container_content' >
          <Line data={reviewsdata} options={reviewsoptions}></Line>
          </div>
        <div className="textBox">
        <h2>System Logs<br></br></h2>
        </div>
        <div className='divider'></div>
        <div className='button_container' >
            <button onClick={() => generatePDF()}>Download pdf</button>
          </div>
        <div className="table" id='my-table'>
       
        {displaysystemlogs()}
         
           
         
        </div>
      
      
        </div>
    )
  
 
}

export default Analytics