import React, { useState, useEffect } from "react";
import Axios from 'axios';
import './ratings.css';
import Profile from '../../assets/profile1.jpg';
import Swal from 'sweetalert2';


function App() {
    const[newApproval] = useState('Approved');
    const[newDisapproval] = useState('Disapproved');
    const [reviewList, setReviewList] = useState([]);

    useEffect(() => {
      Axios.get('https://aust-chatbot.herokuapp.com/readReview').then((response) => {
        setReviewList(response.data);
      });
    }, [reviewList]);

    const updateApproval = (id) => {
      Swal.fire({
        title:'Review Approved!',
        confirmButtonColor: '#f7ce05'
    })
      Axios.put("https://aust-chatbot.herokuapp.com/updateReview", {
        id: id, 
        newApproval: newApproval,
      });
    };

    const updateDisapproval = (id) => {
      Swal.fire({
        title:'Review Disapproved!',
        confirmButtonColor: '#f7ce05'
    })
      Axios.put("https://aust-chatbot.herokuapp.com/updateReviewDis", {
        id: id, 
        newDisapproval: newDisapproval,
      });
    };

    const deleteReview = (id) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#f7ce05',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Axios.delete(`https://aust-chatbot.herokuapp.com/deleteReview/${id}`)
          Swal.fire({
            title:'Deleted!',
            text:'Your file has been deleted.',
            icon:'success',
            confirmButtonColor: '#f7ce05'
        })
        }
      })
     
    };

  return (
    <div className='ratings_content'>
      <div className="textBox_content">
      <h2>Reviews<br></br></h2>
      <div className="divider"></div>
      </div>
      
    <div className='ratings_body'>
      
    <div class="wrapper_ratings_content">

    {reviewList.map((val, key) => {
      return (
                <div key={key}>
                  <div class="box_ratings_contents">
      <i class="fas fa-quote-left quote"></i><i onClick={() => updateDisapproval(val._id)} class="fa-solid fa-thumbs-down thumbsdown" id='thumbsdown'></i><i onClick={() => updateApproval(val._id)} class="fa-solid fa-thumbs-up thumbsup" id="thumbsup"></i>
      <p>{val.message}</p>
      <div class="content_ratings_content">
        <div class="info">
          <div class="name">{val.name}</div>
          <div class="job">{val.email}</div>
          <div class="approval">{val.approval}</div>
        </div>
        
      </div>
      <div className="delete_ratings_content">
          <button href="#" onClick={() => deleteReview(val._id)}> Delete </button>
      </div>
    </div>
              </div>
              );
            })}
    
      
     
  </div>
    </div>
    </div>

   
  )
}

export default App;