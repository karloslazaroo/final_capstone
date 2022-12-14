import React from 'react'
import './analytics.css'
import axios from 'axios';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement} from 'chart.js';
import autotable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import {Line} from 'react-chartjs-2';
import { errorPrefix } from '@firebase/util';


ChartJS.register(
  LineElement, CategoryScale,
  LinearScale, PointElement,
  CategoryScale, Title, Tooltip,
  Legend
  )


class Analytics extends React.Component {
  
  state = {talktousdata : [], reviewsdata: [], syslogdata : []};
  labelscontainer = [];
  datacontainer = [];
  number = [];
  reviewslabelscontainer = [];
  reviewsdatacontainer = [];
  
  
  //talk to us pa lang
  ttudata = ({
    labels: this.labelscontainer ,
    datasets:[
      {
        label:"Talk to Us Function usage" ,
        data: this.datacontainer ,
        backgroundColor: 'yellow', // color of point
        borderColor: 'red', // color of line
        pointBorderWidth: 4, //point size
        tension: 0.5,
        fill: true
      }
    ]
  });

  ttuoptions = {
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
        max: this.number[0],
        ticks: {
          stepSize: 1
        } 
      }
    }
  }

  reviewsdata = ({
    labels: this.reviewslabelscontainer ,
    datasets:[
      {
        label:"Reviews Function usage" ,
        data: this.reviewsdatacontainer ,
        backgroundColor: 'yellow', // color of point
        borderColor: 'red', // color of line
        pointBorderWidth: 4, //point size
        tension: 0.5,
        fill: true
      }
    ]
  });

  reviewsoptions = {
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
        max: this.number[1],
        ticks: {
          stepSize: 1
        } 
      }
    }
  }


  getReviewsData = () =>{
    axios.get('https://aust-chatbot.herokuapp.com/readanalyticsreviews')
    .then((response)=>{
      const data = response.data;
      this.setState({reviewsdata : data});

      console.log('Data from reviews received: ', data);
      data.sort(((a, b) => new Date(a._id) - new Date(b._id)));
      //code for staging date and count
      for(var i = 0; i < data.length; i ++){
        this.reviewslabelscontainer.push(data[i]._id);
      
        this.reviewsdatacontainer.push(data[i].count);
        
      }

      this.number.push(Math.max(...this.reviewsdatacontainer));

    })
    .catch(() =>{
      alert('Error getting reviews data');
      console.error();
    });

  };
  
  getSysLogData = () =>{
    axios.get('https://aust-chatbot.herokuapp.com/readLogs')
    .then((response)=>{
      const data = response.data;
      this.setState({syslogdata: data});
      console.log('Data from system log received: ', this.state.syslogdata);
    
    }).catch(() =>{
      alert('Error getting system log data')
    });
  }
  
  


  getTalktoUsData = () =>{
    axios.get('https://aust-chatbot.herokuapp.com/readanalytics')
    .then((response)=>{
      const data = response.data;

      

     
      console.log(new Date(Date.now()).toLocaleString());
      data.sort(((a, b) => new Date(a._id) - new Date(b._id)));
      console.log('after', data);
      //code for staging date and count
      for(var i = 0; i < data.length; i ++){
        this.labelscontainer.push(data[i]._id);
        this.datacontainer.push(data[i].count);
        
      }
      
      this.number.push(Math.max(...this.datacontainer));
      this.state.talktousdata.push(data);
      console.log('Data from talk to us received: ', this.state.talktousdata);
      
 
    
    })
    .catch(() =>{
      alert('Error getting talk to us data')
    });
   
  };

  componentDidMount =() =>{
    this.getTalktoUsData();
    this.getReviewsData();
    this.getSysLogData();
    //  console.log('number',this.number);

 
  }

  // displayTalktoUsData = (talktousdata) =>{
  //   return talktousdata.map((ttsdata, index) => (
     
  //     <div key = {index} className='talktousdata_display' >
  //         <p>date: {ttsdata._id} count: {ttsdata.count}</p>
          
              
  //     </div>
  //     )
  //   )
  // }

  generatePDF = (syslogdata) =>{
    const data = syslogdata;
    const logcontainer = [];

    for(var i = 0 ; i < data.length; i++){
      logcontainer.push([data[i].date, data[i].email, data[i].description])
    }
    console.log(logcontainer);

    const date = new Date(Date.now()).toLocaleDateString();
    const doctitle = 'ChatbotLog '+date;
    console.log(data[0]);
    var doc = new jsPDF('portrait', 'px', 'a4', 'false');

    autotable(doc, {
      head: [['Date & Time', 'Email', 'Description']],
      body: 
        logcontainer
      
    }
      
      )

    doc.save(doctitle);
  }

  displaysystemlogs= (syslogdata)=>{
     
      

       return syslogdata.map((data, index) =>{

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


  render(){
    // console.log(this.ttudata.labels);
     return (
      
      <div className='analytics_body' >
        { <div className="textBox_analytics_content">
        <h2>Analytics<br></br></h2>
        </div> 
        }
         <div className='divider_analytics_content'></div>
        {/* {this.displayTalktoUsData(this.state.talktousdata)} */}
        {/* {this.datacontainer} */}
        <h2>Talk to Us~</h2>
        <div className='graph_container_content' style={{width:'1200px', height:'600px'}}>
          <Line data={this.ttudata} options={this.ttuoptions}></Line>

        </div>
        <h2>Reviews~</h2>
         <div className='graph_container_content' >
          <Line data={this.reviewsdata} options={this.reviewsoptions}></Line>
          </div>
        <div className="textBox">
        <h2>System Logs<br></br></h2>
        </div>
        <div className='divider'></div>
        <div className='button_container' >
            <button onClick={() => this.generatePDF(this.state.syslogdata)}>Download pdf</button>
          </div>
        <div className="table" id='my-table'>
       
        {this.displaysystemlogs(this.state.syslogdata)}
         
           
         
        </div>
      
      
        </div>
    )
  }
 
}

export default Analytics