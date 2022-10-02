import React, { useState, useEffect } from "react";
import Axios from 'axios';
import './ratings.css';
import Swal from 'sweetalert2';

import Profile from '../../assets/profile1.jpg'

function App() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState(''); //0 pag integer/number
    const [approval] = useState('Disapprove');
    const [reviewList, setReviewList] = useState([]);
  
    useEffect(() => {
      Axios.get('http://localhost:3001/readReviewUser').then((response) => {
        setReviewList(response.data);
      });
    }, [reviewList]);
  
    const addToList = () => {
      
      Swal.fire(
        'Thank you!',
        'Your message has been submitted!',
        'success'
      )

      Axios.post("http://localhost:3001/insertReview", {
        name: name,
        message: message,
        approval: approval,
      });
    };


  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  return (
    <div>
       <div className="ratings_user">
            <h2><span>Review Us!</span></h2>
            <div className="divider"></div>
            </div>
        
   <div className="button">
      <a href='#'onClick={toggleModal}>You can add yours now!</a>
      </div>
    <div className='ratings_body'>
    <div class="wrapper">

    {reviewList.map((val, key) => {
      return (
                <div key={key}>
                  <div class="box">
      <i class="fas fa-quote-left quote"></i>
      <p>{val.message}</p>
      <div class="content">
        <div class="info">
          <div class="name">{val.name}</div>
          <div class="name">{val.approval}</div>
          <div class="job">Information Systems</div>
          <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
          </div>
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

  {modal && (
        <div className="modal">
          <div className="modal-content">
          <div className="announcement">
            <h2><span>Write a review!</span></h2>
            </div>
            <label>Name: </label>  
            <input 
            className="name_ratings_user"
            type="text"
            placeholder="Type your name..." 
            onChange={(event) => {
                setName(event.target.value);
            }}
            />
             <label>Message: </label> 
            <textarea className="message_user"  placeholder="Write something.."  onChange={(event) => {
                setMessage(event.target.value);
            }}></textarea>
            <div className="buttons_reviews_user">
      <a href='#'onClick={addToList} >Submit</a>
      <a href='#'onClick={toggleModal} >Close</a>
      </div>
          </div>
        </div>
      )}
    </div>
   
    </div>
  )
}

export default App;