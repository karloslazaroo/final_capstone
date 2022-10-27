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
    const[newTitle, setNewTitle] = useState('');
    const[newBody, setNewBody] = useState('');
    const [announceList, setAnnounceList] = useState([]);

    useEffect(() => {
      Axios.get('http://localhost:3001/read').then((response) => {
        setAnnounceList(response.data);
      });
    }, [announceList]);

    const addToList = () => {
      Swal.fire(
        'Thank you!',
        'Your Announcement has been posted!',
        'success'
      ) 
      Axios.post("http://localhost:3001/insert", {
        title: title,
        body: body,
      });
      
    };

    const updateTitle = (id) => {
      Swal.fire(

        'Thank you!',
        'Your Announcement has been updated!',

        'success'
      )
      
      Axios.put("http://localhost:3001/update", {
        id: id, 
        newTitle: newTitle,
        newBody: newBody,
      });

      document.getElementById(id).value = '';
    };

    const deleteAnnounce = (id) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
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

  return (
    
    <div className='announcement_body'>
       <div className="announcement_admin">
            <h2><span>Announcements</span></h2>
            </div>
        <div className='divider'></div>
           
        <div className="button_add_content">
      <a href='#'onClick={toggleModal}>New Announcements!</a>
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
                      <div class="name">Administrator</div>
                      <div class="job">College of Information and Computing Sciences</div>
                      <input id={val._id}
                    type="text" placeholder="New Title..." required
                    onChange={(event) => {
                      setNewTitle(event.target.value);
                    }}
                  />
                  <input id={val._id}
                    type="text" placeholder="New Body..." required
                    onChange={(event) => {
                      setNewBody(event.target.value);
                    }}
                  />
                      <div className="button_announcement_superadmin">
                      <a href="#" onClick={() => updateTitle(val._id)}> Update </a>
                      <a href="#" onClick={() => deleteAnnounce(val._id)}> Delete </a>
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