import React, { useState, useEffect } from "react";
import Axios from 'axios';
import './post.css';


function App() {

  const [announceLatest, setAnnounceLatest] = useState([]);

    useEffect(() => {
      Axios.get('https://aust-chatbot.herokuapp.com/readLatest').then((response) => {
        setAnnounceLatest(response.data);
      });
    }, [announceLatest]);


  return (
    <div className='announcement_Post'>
       <div className="announcement">
            <h2><span>Latest Announcements</span></h2>
            </div>
        <div className='divider_user'></div>

        <div className='post'>
          <ul>
            <li>
              <div className="time">
                <h2>24<br></br><span>June</span></h2>
              </div>
              <div className="details">
                <h3>Where does it come from</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum aliquid tempora mollitia at quibusdam voluptatem magnam 
                  hic minus provident quas illo adipisci, quae ratione. 
                  Ducimus architecto natus laborum soluta aperiam.</p>
              </div>
              
            </li>
           
            
            
            
          </ul>
          
        </div>

      </div>
  )
}

export default App;

/* {announceLatest.map((val, key) => {
  return (
    <div key={key}>
      <div className="time">
    <h2><span>{val.date}</span></h2>
  </div>
  <div className="details">
    <h3>{val.title}</h3>
    <p>{val.body}</p>
  </div>
  </div>
  );
})} */
