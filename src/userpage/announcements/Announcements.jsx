import React, { useState, useEffect } from "react";
import Axios from 'axios';
import './announcements.css'
import Profile from '../../assets/profile1.jpg'


function Announce() {
    const [announceList, setAnnounceList] = useState([]);

    useEffect(() => {
      Axios.get('https://aust-chatbot.herokuapp.com/read').then((response) => {
        setAnnounceList(response.data);
      });
    }, [announceList]);


  return (
    
    <div className='announcement_body'>
       <div className="announcement_user">
            <h2><span>Announcements</span></h2>
            </div>
      <div className="divider"></div>

        {announceList.map((val, key) => {
              return (
                <div key={key}>
                  <div class="box_questions">
                  <i class="fas fa-quote-left quote"></i>
                  <h1> {val.title} </h1>
                  <h4>
                    {val.date}
                  </h4>
                  <p>
                    {val.body}
                  </p>
                  <div class="content_questions">
                    <div class="info_questions">
                      <div class="name">{val.name}</div>
                      <div class="job">{val.email}</div>
                     
                    </div>
                    <div class="image">
                      <img src={Profile} alt=""/>
                    </div>
                  </div>
                </div>
              </div>
              );
            })}
      </div>
  )
}

export default Announce;

