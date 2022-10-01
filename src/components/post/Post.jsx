import React from 'react'
import './post.css'


const post = () => {
  return (
    
    <div className='announcement_Post'>
       <div className="announcement">
            <h2><span>Latest Announcements</span></h2>
            </div>
        <div className='divider'></div>

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
                  <a href="#">View Details</a>
              </div>
              
            </li>
           
            
            
            
          </ul>
          
        </div>

      </div>
  )
}

export default post
