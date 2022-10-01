import React from 'react'
import './administrators.css'
const Administrators = () => {
  return (
    <div className='body_administrator'>
          <div className='parent_div'>
            <div className='textBox_administrators'>
              <h2>Administrators</h2>
            </div>
              <div>
                <button className="button" onClick="openForm()"><h1 className = "button_font">Add Administrators</h1></button>
                <div className="form-popup" id="myForm">
                  <form className="form_container">
                    <h1>Add Administrator</h1>
                    <label for="email"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="email" required></input>
  
                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required></input>
  
                    <button type="submit" class="btn">Login</button>
                    <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
                      
                  </form>
                </div>
              </div>
          </div>
          <div className="summary_parent">
            <div className='summary_form'>
                <h1 className='summary_font'>Summary</h1>
                <p className='content_font'>OFAD</p>
                <p className='content_font'>CICS</p>
                <p className='content_font'>EDUC</p>
                <p className='content_font'>ENGR</p>
                <button className="view_button_1"><h1 className = "view_font">View All</h1></button>
             </div>
             <div className='user_management'>
                <h1 className='summary_font'>User Management</h1>
                <button className="view_button_2"><h1 className = "view_font">View All</h1></button>
             </div>
          </div>
        </div>
  )
}

export default Administrators