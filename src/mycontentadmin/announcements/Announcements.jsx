import React, { useState, useEffect } from "react";
import Axios from 'axios';
import './announcements.css';
import Profile from '../../assets/profile1.jpg';
import { UserAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';

function App() {
  const {  user } = UserAuth();
  const [title, setTitle] = useState('');
    const [body, setBody] = useState(''); //0 pag integer/number
    const name = user.displayName;
    const email = user.email;
    const[newTitle, setNewTitle] = useState('');
    const[newBody, setNewBody] = useState('');
    const [announceList, setAnnounceList] = useState([]);

    useEffect(() => {
      const email = user.email;
      Axios.get(`https://aust-chatbot.herokuapp.com/readContent/${email}`).then((response) => {
        console.log(response.data);
        setAnnounceList(response.data);
      });
    }, [announceList]);

    const addToList = () => {
      if(title === "" || body === "") {
        alert('All fields required.')
      } else {
        Swal.fire({
          title:'Thank you!',
          text:'Your Announcement has been posted!',
          icon:'success',
          confirmButtonColor: '#f7ce05'
      }) 
  
        Axios.post("https://aust-chatbot.herokuapp.com/insert", {
          title: title,
        name: name,
        email: email,
        body: body,
        });
      }
    };

    const updateTitle = (id) => {
      if(newTitle === "" && newBody === "") {
        alert('All fields required.')
      } else {
        if(newTitle === "") {
          Swal.fire({
            title:'Thank you!',
            text:'Your Announcement has been updated!',
            icon:'success',
            confirmButtonColor: '#f7ce05',
          }) 
          Axios.put("https://aust-chatbot.herokuapp.com/updateAnnounce", {
            id: id, 
            newBody: newBody,
           
          });
        } else if(newBody === "") {
          Swal.fire({
            title:'Thank you!',
            text:'Your Announcement has been updated!',
            icon:'success',
            confirmButtonColor: '#f7ce05',
          }) 
          Axios.put("https://aust-chatbot.herokuapp.com/update", {
            id: id, 
            newTitle: newTitle,
          });
        } else {
          Swal.fire({
            title:'Thank you!',
            text:'Your Announcement has been updated!',
            icon:'success',
            confirmButtonColor: '#f7ce05',
          }) 
          Axios.put("https://aust-chatbot.herokuapp.com/updateAnnounce", {
            id: id, 
            newBody: newBody,
           
          });
          Axios.put("https://aust-chatbot.herokuapp.com/update", {
            id: id, 
            newTitle: newTitle,
          });
        }
      

      document.getElementById(id).value = '';
      myFunction(id);
      }
    };

    const deleteAnnounce = (id) => {
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
          Axios.delete(`https://aust-chatbot.herokuapp.com/delete/${id}`)
          Swal.fire({
            title:'Deleted!',
            text:'Your file has been deleted.',
            icon:'success',
            confirmButtonColor: '#f7ce05'
        })
        }
      })
     
    };

    const success = () => {
      addToList();
      toggleModal();
      
    }

    


    const [modal, setModal] = useState(false);

    const toggleModal = () => {
      setModal(!modal);
    };
  
    if(modal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }

   

    

    function myFunction(id) {
      var x = document.getElementById(id);
      if (x.style.display === "block") {
        x.style.display = "none";
      } else {
        x.style.display = "block";
      }
    }
   

  return (
    <div className='announcement_body'>
       <div className="textBox_announcement">
      <h2>Announcements<br></br></h2>
      </div>
      <div className='divider_announcement_content'></div>
        <div className="button_add_content">
          <button href='#' onClick={toggleModal}>New Announcements!</button>
        </div>
        {announceList.map((val, key) => {
          return (
            <div key={key}>
            <div class="box_questions">
              <i class="fas fa-quote-left quote"></i>
              <h1> {val.title} </h1>
              <p>
                {val.body}
              </p>
              <h4>
                {val.date}
              </h4>
              <div class="content_questions">
              <div class="info_questions">
              <div class="name">{val.name}</div>
              <div class="job">{val.email}</div>

              <div className="button_announcement_content">
                <button href="#" onClick={() => myFunction(val._id)}> Edit </button>
                <button href="#" onClick={() => deleteAnnounce(val._id)}> Delete </button>
              </div>
              </div>
              
              </div>

              <div id={val._id} className="edit_content">
              <label>Title: </label>
              <textarea
            className="title_content"
            type="text"
            onChange={(event) => {
              setNewTitle(event.target.value);
            }}
            >{val.title}</textarea>
             <label>Body: </label>
              <textarea className="body_content"  onChange={(event) => {
                setNewBody(event.target.value);
            }}>{val.body}</textarea>
            <div className="button_confirm_content">
                <button href="#" onClick={() => updateTitle(val._id)}> Confirm </button>
              </div>
            </div>
            
            </div>
            
          </div>
          );
        })}


{modal && (
        <div className="modal">
          <div className="modal-content">
          <div className="announcement">
            <h2><span> New Announcement</span></h2>
            </div>
            <label>Title: </label>  
            <input 
            className="name_ratings_user"
            type="text"
            placeholder="Type your title..." 
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            />
             <label>Body: </label> 
            <textarea className="message_user"  placeholder="Write something.."  onChange={(event) => {
                setBody(event.target.value);
            }}></textarea>
            <div className="buttons_reviews_user">
      <button href='#'onClick={success} >Submit</button>
      <button href='#'onClick={toggleModal} >Close</button>
      </div>
          </div>
        </div>
      )}


      
    </div>
  )
}

export default App;