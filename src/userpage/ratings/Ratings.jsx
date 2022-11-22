import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { UserAuth } from '../../context/AuthContext';
import './ratings.css';
import Swal from 'sweetalert2';

import Profile from '../../assets/profile1.jpg'

function App() {
    const {user} = UserAuth();
    const name = user.displayName;
    const email = user.email;
    const [message, setMessage] = useState(''); //0 pag integer/number
    const [approval] = useState('Pending');
    const [reviewList, setReviewList] = useState([]);
    const source = "Reviews";
    const [isChecked, setIsChecked] = useState(false);
   
  
    useEffect(() => {
      Axios.get('https://aust-chatbot.herokuapp.com/readReviewUser').then((response) => {
        setReviewList(response.data);
      });
    }, [reviewList]);
  
    const addToList = () => {
      if(message == ""){
        alert('All fields are required.')
      } else{
        Swal.fire({
          title:'Thank you!',
          text:'Your message has been submitted!',
          icon:'success',
          confirmButtonColor: '#f7ce05'
      })
        
        if(isChecked==true){
          insertReviewonAxios("Anonymous", message, approval, "Anonymous");
        }
        else{
          insertReviewonAxios(name, message, approval, email);
        }    

        let dates = new Date();
        let postDate = dates.toLocaleDateString('en-US',{timeZone: "Asia/Hong_Kong"});
        Axios.post("https://aust-chatbot.herokuapp.com/analyticsdata",{
          source: source,
          date: postDate,
        }).then(console.log('sent source'));
      }
    };

  const insertReviewonAxios = (name, message, approval, email) =>{
    Axios.post("https://aust-chatbot.herokuapp.com/insertReview", {
      name: name,
      message: message,
      approval: approval,
      email: email,
    });
    // .then(console.log('name and email',email, name));
  }


  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const Restart = () => {
    addToList();
    toggleModal();
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  return (
    <div className="user_reviews">
       <div className="ratings_user">
            <h2><span>Review Us!</span></h2>
            <div className="divider_ratings_user"></div>
            </div>
        
   <div className="button_user">
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
          <div class="name_user">{val.name}</div>
          <div class="job_user">{val.email}</div>
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
             <label>Message: </label> 
            <textarea className="message_user"  placeholder="Write something.."  onChange={(event) => {
                setMessage(event.target.value);
            }}></textarea>
            <input type="checkbox" checked={isChecked} onChange={() =>setIsChecked((prev) => !prev)}/> Leave review anonymously
            
            <div className="buttons_reviews_user">

            
      <a href='#'onClick={Restart} >Submit</a>
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