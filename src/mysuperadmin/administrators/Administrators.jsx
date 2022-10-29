import React, { useState, useEffect } from "react";
import Axios from 'axios';
import './administrators.css'
import Swal from 'sweetalert2';

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
    if(email == "" || office == "") {
      alert('All fields required.')
    } else {
    Swal.fire(
      'Thank you!',
      'Your account has been added!',
      'success'
    )
    Axios.post("http://localhost:3001/insertAdmin", {
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
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/deleteAdmin/${id}`)
        Swal.fire(
          'Deleted!',
          'Your account has been deleted.',
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
    <div className='body_administrator'>
          <div className='parent_div'>
            <div className='textBox_super'>
              <h2>Administrators</h2>
              <div className="divider"></div>
              </div>
              

              <div className="button_add_administrators">
      <a href='#'onClick={toggleModal}>Add Content Managers</a>
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
                  <a href="#" onClick={() => deleteAnnounce(val._id)}> Delete </a>
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