import React, { useState, useEffect } from "react";
import Axios from 'axios';
import './announcements.css';
import Profile from '../../assets/profile1.jpg';
import Swal from 'sweetalert2';

function App() {
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
          body: body,
        });
      }
    };

    const updateTitle = (id) => {
      if(newTitle == "" || newBody == "") {
        alert('All fields required.')
      } else {
      Swal.fire({
        title:'Thank you!',
        text:'Your Announcement has been updated!',
        icon:'success',
        confirmButtonColor: '#f7ce05',
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

    const success2 = (id) => {
      updateTitle(id);
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
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    }
   

  return (
    <div className='announcement_body'>
       <div className="textBox">
      <h2>Announcements<br></br></h2>
      </div>
        <div className="button_add_content">
          <a href='#' onClick={toggleModal}>New Announcements!</a>
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
              <div class="content_questions">
              <div class="info_questions">
              <div class="name">Administrator</div>
              <div class="job">College of Information and Computing Sciences</div>

              

              <div className="button_announcement_content">
                <a href="#" onClick={() => myFunction(val._id)}> Edit </a>
                <a href="#" onClick={() => deleteAnnounce(val._id)}> Delete </a>
              </div>
              </div>
              <div class="image">
                <img src={Profile} alt=""/>
              </div>

              
              </div>
              <div id={val._id} className="edit_content">
              <textarea
            className="title_content"
            type="text"
            placeholder
            onChange={(event) => {
              setNewTitle(event.target.value);
            }}
            >{val.title}</textarea>
              <textarea className="body_content"  placeholder  onChange={(event) => {
                setNewBody(event.target.value);
            }}>{val.body}</textarea>
            <div className="button_confirm_content">
                <a href="#" onClick={() => updateTitle(val._id)}> Confirm </a>
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