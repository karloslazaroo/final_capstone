import React from 'react'
import './analytics.css'
import axios, { Axios } from 'axios';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement} from 'chart.js';
import autotable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import {Line} from 'react-chartjs-2';
import { errorPrefix } from '@firebase/util';
import {UserAuth} from '../../context/AuthContext'
import { useEffect, useState } from 'react';
import { render } from '@testing-library/react';

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
  //const [logs, setLogs] = useState([]);
  const labelLogs = [];
  const logs = [];
  
  console.log(labelscontainer);
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

      // console.log('Data from reviews received: ', data);
      data.sort(((a, b) => new Date(a._id) - new Date(b._id)));
      //code for staging date and count
      for(var i = 0; i < data.length; i ++){
        reviewslabelscontainer.push(data[i]._id);
      
        reviewsdatacontainer.push(data[i].count);
        
      }

      number.push(Math.max(...reviewsdatacontainer));
      console.log('reviewslabelscontainer', reviewslabelscontainer);
      console.log('reviewsdatacontainer', reviewsdatacontainer);

    })
    .catch(() =>{
      alert('Error getting reviews data');
      console.error();
    });

  };
  
  const getSysLogData = () =>{
    const email = user.email;
    axios.get(`https://aust-chatbot.herokuapp.com/readLogsUse/${email}`).then((response) => {
      //setLogs(response.data);
      const data = response.data;
      //setLogs(data);
      state.syslogdata.push(data);

      console.log('Data from sys log received: ', data);
      data.sort(((a, b) => new Date(a._id) - new Date(b._id)));
      //code for staging date and count
      for(var i = 0; i < data.length; i ++){
        labelLogs.push(data[i]._id);
      
        logs.push(data[i].count);
        
      }
    
    }).catch(() =>{
      alert('Error getting system log data')
    });
  };

  const gettalktousdatabyemail = () =>{
    const email = user.email;
    console.log(email);
    axios.get(`https://aust-chatbot.herokuapp.com/readanalytics/${email}`)
    .then((response)=>{
      const data = response.data;
      console.log(data);

      data.sort(((a, b) => new Date(a._id) - new Date(b._id)));
      console.log('after', data);
      // //code for staging date and count
      for(var i = 0; i < data.length; i ++){
      labelscontainer.push(data[i]._id);
      datacontainer.push(data[i].count);
        
      }

      

      number.push(Math.max(...datacontainer));
      // state.talktousdata.push(data);
      // console.log('Data from talk to us received: ', data);
      console.log('labelscontainer', labelscontainer);
      console.log('datacontainer', datacontainer);
 
    
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
  }
  
  


  // const getTalktoUsData = () =>{
  //   axios.get('https://aust-chatbot.herokuapp.com/readanalytics')
  //   .then((response)=>{
  //     const data = response.data;

      

  //     console.log(new Date(Date.now()).toLocaleString());
  //     data.sort(((a, b) => new Date(a._id) - new Date(b._id)));
  //     console.log('after', data);
  //     //code for staging date and count
  //     for(var i = 0; i < data.length; i ++){
  //       labelscontainer.push(data[i]._id);
  //       datacontainer.push(data[i].count);
        
  //     }

    
      
      

  //     number.push(Math.max(...datacontainer));
  //     state.talktousdata.push(data);
      // console.log('Data from talk to us received: ', data);
      
 
    
  //   })
  //   .catch(() =>{
  //     alert('Error getting talk to us data')
  //   });
   
  }; */

  useEffect (() =>{
    // getTalktoUsData();
    getReviewsData();
    //getSysLogData();
    //  console.log('number',number);
    getReviewsData();
    gettalktousdatabyemail();
    getSysLogData();
  });

  /* useEffect(() => {
    const email = user.email;
      axios.get(`https://aust-chatbot.herokuapp.com/readLogsUse/${email}`).then((response) => {
        setLogs(response.data);
      });
  }


  // useEffect(() => {
  //   const email = user.email;
  //   axios.get(`https://aust-chatbot.herokuapp.com/readLogsUse/${email}`).then((response) => {
  //     setLogs(response.data);
  //   }); */
   
  // }, [logs]);

  // displayTalktoUsData = (talktousdata) =>{
  //   return talktousdata.map((ttsdata, index) => (
     
  //     <div key = {index} className='talktousdata_display' >
  //         <p>date: {ttsdata._id} count: {ttsdata.count}</p>
          
              
  //     </div>
  //     )
  //   )
  // }

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
      
      
        </div>
    )
}

export default Analytics