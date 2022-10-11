import React, { useState, useEffect } from "react";
import Axios from 'axios';
import './administrators.css'

function App() {
  const [email, setEmail] = useState('');
  const [office, setOffice] = useState(''); //0 pag integer/number
  const [adminList, setAdminList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/readAdmin').then((response) => {
      setAdminList(response.data);
    });
  }, [adminList]);

  const addToList = () => {
    Axios.post("http://localhost:3001/insertAdmin", {
      email: email,
      office: office,
    });
  };

  const deleteAnnounce = (id) => {
    Axios.delete(`http://localhost:3001/deleteAdmin/${id}`)
  };

  return (
    <div className='body_administrator'>
          <div className='parent_div'>
            <div className='textBox_administrators'>
              <h2>Administrators</h2>
              <label>Email: </label>
            <input 
            type="text" 
            onChange={(event) => {
                setEmail(event.target.value);
            }}
            />
            <label>Office: </label>
            <input 
            type="text"
            onChange={(event) => {
                setOffice(event.target.value);
            }}
            />
            <button onClick={addToList}>Submit</button>
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
          {adminList.map((val, key) => {
              return (
                
                <div key={key} className="admin">
                  <div className="summary_parent">
                  <div className='summary_form'>
                  <h1 className='summary_font'>Summary</h1>
                  <p className='content_font'>{val.office}</p>
                  <p className='content_font'>{val.email}</p>
                  <button onClick={() => deleteAnnounce(val._id)}> Delete </button>
                  
                  <button className="view_button_1"><h1 className = "view_font">View All</h1></button>
                  </div>
                  <div className='user_management'>
                    <h1 className='summary_font'>User Management</h1>
                    
                    
                    <button className="view_button_2"><h1 className = "view_font">View All</h1></button>
                  </div>
                </div>
                </div>
              );
            })}
        </div>
  )
}

export default App;