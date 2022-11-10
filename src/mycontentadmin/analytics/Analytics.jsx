import React from 'react'
import './analytics.css'
import axios from 'axios';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement} from 'chart.js';

import {Line} from 'react-chartjs-2';
import { errorPrefix } from '@firebase/util';

ChartJS.register(
  LineElement, CategoryScale,
  LinearScale, PointElement,
  CategoryScale, Title, Tooltip,
  Legend
  )


class Analytics extends React.Component {
  
  state = {talktousdata : [], reviewsdata: []};
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

      //code for staging date and count
      for(var i = 0; i < data.length; i ++){
        this.reviewslabelscontainer.push(data[i]._id);
      
        this.reviewsdatacontainer.push(data[i].count);
        
      }

      this.number.push(Math.max(...this.reviewsdatacontainer)*2);

    })
    .catch(() =>{
      alert('Error getting reviews data');
      console.error();
    });

  };
  
  


  getTalktoUsData = () =>{
    axios.get('https://aust-chatbot.herokuapp.com/readanalytics')
    .then((response)=>{
      const data = response.data;
      this.setState({talktousdata : data});

      console.log('Data from talk to us received: ', data);

      //code for staging date and count
      for(var i = 0; i < data.length; i ++){
        this.labelscontainer.push(data[i]._id);
      
        this.datacontainer.push(data[i].count);
        
      }

      this.number.push(Math.max(...this.datacontainer)*2);

      // console.log('labels', this.labelscontainer);
      // console.log('counts', this.datacontainer);
      // console.log('counts max number', this.number[0]);
      
       

    })
    .catch(() =>{
      alert('Error getting talk to us data')
    });
   
  };

  componentDidMount =() =>{
    this.getTalktoUsData();
     this.getReviewsData();
     console.log('number',this.number);

 
  }

  displayTalktoUsData = (talktousdata) =>{


 

    return talktousdata.map((ttsdata, index) => (
     
      <div key = {index} className='talktousdata_display' >
          <p>date: {ttsdata._id} count: {ttsdata.count}</p>
          
              
      </div>
      )
    )
     
    
    
    
  }


  render(){
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
        <div className='graph_container_content'>
          <Line data={this.ttudata} options={this.ttuoptions}></Line>
          {/* <Line data={this.data}></Line> */}
        </div>
        <h2>Reviews~</h2>
         <div className='graph_container_content' >
          <Line data={this.reviewsdata} options={this.reviewsoptions}></Line>
        </div>


        <div className="textBox">
        <h2>System Logs<br></br></h2>
        </div>
        <div className='divider'></div>
        <div className="table">
        <table>
  <tr>
    <th>Date & Time</th>
    <th>Email</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>Karlos Andrew Lazaro</td>
    <td>karlosandrew.lazaro.cics@ust.edu.ph</td>
    <td>Logout</td>
  </tr>
  <tr>
    <td>Karlos Andrew Lazaro</td>
    <td>karlosandrew.lazaro.cics@ust.edu.ph</td>
    <td>Logout</td>
  </tr>
 
</table>
        </div>
      </div>
    )
  }
 
}

export default Analytics