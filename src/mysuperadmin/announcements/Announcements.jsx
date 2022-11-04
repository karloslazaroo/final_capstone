import React, { useState, useEffect } from "react";
import Axios from 'axios';
import './announcements.css';
import Profile from '../../assets/profile1.jpg';
import { UserAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';


function App() {
    const {  user } = UserAuth();
    const [title, setTitle] = useState('');
    const name = user.displayName;
    const email = user.email;
    const [body, setBody] = useState(''); //0 pag integer/number
    const[newTitle, setNewTitle] = useState('');
    const[newBody, setNewBody] = useState('');
    const [announceList, setAnnounceList] = useState([]);

    useEffect(() => {
      Axios.get('http://localhost:3001/read').then((response) => {
        setAnnounceList(response.data);
      });
    }, [announceList]);

    const addToList = () => {
      if(title == "" || body == "") {
        alert('All fields required.')
      } else {
      Swal.fire({
        title:'Thank you!',
        text:'Your Announcement has been posted!',
        icon:'success',
        confirmButtonColor: '#f7ce05'
      }) 
      Axios.post("http://localhost:3001/insert", {
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
      Swal.fire({

        title:'Thank you!',
        text:'Your Announcement has been updated!',
        icon:'success',
        confirmButtonColor: '#f7ce05'
      })
      
      Axios.put("http://localhost:3001/update", {
        id: id, 
        newTitle: newTitle,
        newBody: newBody,
      });

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
          Axios.delete(`http://localhost:3001/delete/${id}`)
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
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
       <div className="announcement_admin">
            <h2><span>Announcements</span></h2>
            </div>
        <div className='divider'></div>
           
        <div className="button_add_content">
      <button href='#'onClick={toggleModal}>New Announcements!</button>
      </div>

            {announceList.map((val, key) => {
              return (
                <div key={key}>
                  <div class="box_questions_superadmin">
                  <i class="fas fa-quote-left quote"></i>
                  <h1> {val.title} </h1>
                  <p>
                    {val.body}
                  </p>
                  <div class="content_questions">
                    <div class="info_questions">
                      <div class="name">{val.name}</div>
                      <div class="job">{val.email}</div>
                      <p> {val.date} </p>
                      
                      <div className="button_announcement_superadmin">
                      <button href="#" onClick={() => myFunction(val._id)}> Edit </button>
                      <button href="#" onClick={() => deleteAnnounce(val._id)}> Delete </button>
                      </div>
                    </div>
                    <div class="image">
                      <img src={Profile} alt=""/>
                    </div>
                  </div>

                  <div id={val._id} className="edit_content">
                    <label>Title:</label>
              <textarea
            className="title_content"
            type="text"
            placeholder
            onChange={(event) => {
              setNewTitle(event.target.value);
            }}
            >{val.title}</textarea>
            <label>Body:</label>
              <textarea className="body_content"  placeholder  onChange={(event) => {
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
            <h2><span>Announcement</span></h2>
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
      <a href='#'onClick={success} >Submit</a>
      <a href='#'onClick={toggleModal} >Close</a>
      </div>
          </div>
        </div>
      )}
      </div>
  )
}

export default App;