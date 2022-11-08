import React from 'react'
import './analytics.css'
import axios from 'axios';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement} from 'chart.js';

import {Line} from 'react-chartjs-2';

ChartJS.register(
  LineElement, CategoryScale,
  LinearScale, PointElement,
  CategoryScale, Title, Tooltip,
  Legend
  )


class Analytics extends React.Component {
  state = {talktousdata : []};//to be deleted
  labelscontainer = [];
  datacontainer = [];
  //talk to us pa lang
  data = ({
    labels: this.labelscontainer ,
    datasets:[
      {
        label:"Talk to Us function usage" ,
        data: this.datacontainer ,
        backgroundColor: 'yellow', // color of point
        borderColor: 'red', // color of line
        pointBorderWidth: 4, //point size
        tension: 0.5,
        fill: true
      }
    ]
  });

  options = {
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
        max: 10,
        ticks: {
          stepSize: 1
        } 
      }
    }
  }


  
  


  getTalktoUsData = () =>{
    axios.get('https://aust-chatbot.herokuapp.com/readanalytics')
    .then((response)=>{
      const data = response.data;
      this.setState({talktousdata : data});

      console.log('Data from talk to us received: ', data);

      //code for staging date and count
      for(var i = 0; i < data.length; i ++){
        this.labelscontainer.push(data[i]._id);
        console.log('labels', this.labelscontainer);
        this.datacontainer.push(data[i].count);
        console.log('counts', this.datacontainer);
      }

   
    })
    .catch(() =>{
      alert('Error getting talk to us data')
    })
  };

  componentDidMount =() =>{
    this.getTalktoUsData();
  }

  //to be deleted
  displayTalktoUsData = (talktousdata) =>{
    console.log(typeof(talktousdata));
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
        {<div className="textBox">
        <h2>Analytics<br></br></h2>
        </div> }
        {/* {this.displayTalktoUsData(this.state.talktousdata)} */}
       
        {/* {this.datacontainer} */}
        <div className='graph_container' style={{width:'1200px', height:'600px'}}>
          <Line data={this.data} options={this.options}></Line>
          {/* <Line data={this.data}></Line> */}
         
        </div>

      </div>
    )
  }
 
}

export default Analytics