import React, { useState, useEffect } from "react";
import Axios from 'axios';
import './administrators.css'
import Swal from 'sweetalert2';

function App() {
  const [email, setEmail] = useState('');
  const [office, setOffice] = useState(''); //0 pag integer/number
  const [adminList, setAdminList] = useState([]);

  useEffect(() => {
    Axios.get('https://aust-chatbot.herokuapp.com/readAdmin').then((response) => {
      setAdminList(response.data);
    });
  }, [adminList]);

  const addToList = () => {
    if(email == "" || office == "") {
      alert('All fields required.')
    } else {
    Swal.fire({
      title:'Thank you!',
      text:'Your account has been added!',
      icon:'success',
      confirmButtonColor: '#f7ce05'
    })
    Axios.post("https://aust-chatbot.herokuapp.com/insertAdmin", {
      email: email,
      office: office,
    });
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
        Axios.delete(`https://aust-chatbot.herokuapp.com/deleteAdmin/${id}`)
        Swal.fire({
          title:'Deleted!',
          text:'Your account has been deleted.',
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

  return (
    <div className='body_administrator'>
          <div className='parent_div'>
            <div className='textBox_super'>
              <h2>Administrators</h2>
              <div className="divider"></div>
              </div>
              

              <div className="button_add_administrators">
      <button href='#'onClick={toggleModal}>Add Content Managers</button>
      </div>
      <h1 className='summary_font'>List of Accounts</h1>
                  <div className="divider_admin"></div>
             
            
          </div>
          {adminList.map((val, key) => {
              return (
                
                <div key={key} className="superadmin">
                  <div className="summary_parent">
                  <div className='summary_form'>  
                    <div className="email">
                  <p>{val.email}</p>
                    </div>
                    <div className="department">
                      <p>{val.office}</p>
                    </div>
                  <button href="#" onClick={() => deleteAnnounce(val._id)}> Delete </button>
                  <div className="dashed"></div>
                  </div>
                </div>
                </div>
              );
            })}

{modal && (
        <div className="modal">
          <div className="modal-content">
          <div className="announcement">
            <h2><span>Add new account</span></h2>
            </div>
            <label>Email </label>  
            <input 
            className="office" type="text" placeholder="" onChange={(event) => {setEmail(event.target.value);}}
            />
             <label>Department </label> 
            <input className="office" type="text" onChange={(event) => {
                setOffice(event.target.value);
            }}></input>
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