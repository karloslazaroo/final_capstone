import React, { useState, useEffect } from "react";
import Axios from 'axios';
import './faq.css';
import Swal from 'sweetalert2';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(''); //0 pag integer/number
  const[newQuestion, setNewQuestion] = useState('');
  const[newAnswer, setNewAnswer] = useState('');
  const [faqsList, setFaqsList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/readFaqs').then((response) => {
      setFaqsList(response.data);
    });
  }, [faqsList]);

  const addToList = () => {
    if(question == "" || answer == "") {
      alert('All fields required.')
    } else {
    Swal.fire(
      'FAQs Added!',
    ) 
    Axios.post("http://localhost:3001/insertFaqs", {
      question: question,
      answer: answer,
    });
  }
  };

  const updateTitle = (id) => {
    if(newQuestion == "" || setNewAnswer == "") {
      alert('All fields required.')
    } else {
    Swal.fire(

      'FAQs Updated!',
    )
    
    Axios.put("http://localhost:3001/updateFaqs", {
      id: id, 
      newQuestion: newQuestion,
      newAnswer: newAnswer,
    });

    document.getElementById(id).value = '';
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
        Axios.delete(`http://localhost:3001/deleteFaqs/${id}`)
        Swal.fire(
          'Deleted!',
          'FAQ deleted.',
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
  
  return(
    
<div className="faq_body">
<div className="announcement_admin">
            <h2><span>FAQs</span></h2>
            </div>
        <div className='divider'></div>
           
        <div className="button_add_content">
      <a href='#'onClick={toggleModal}>New FAQs!</a>
      </div>

      {faqsList.map((val, key) => {
              return (
                <div key={key}>
                  <div>
                  <div class="faq_box_superadmin">
                  <i class="fas fa-quote-left quote"></i>
                  <h1> {val.question} </h1>
                  <p>
                  {val.answer}
                  </p>
                      <input id={val._id}
                    type="text" placeholder="New Question..." required
                    onChange={(event) => {
                      setNewQuestion(event.target.value);
                    }}
                  />
                  <input id={val._id}
                    type="text" placeholder="New Answer..." required
                    onChange={(event) => {
                      setNewAnswer(event.target.value);
                    }}
                  />
                      <div className="button_announcement_superadmin">
                      <a href="#" onClick={() => updateTitle(val._id)}> Update </a>
                      <a href="#" onClick={() => deleteAnnounce(val._id)}> Delete </a>
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
        <h2><span>FAQs</span></h2>
        </div>
        <label>Question: </label>  
        <input 
        className="name_ratings_user"
        type="text"
        placeholder="Type your title..." 
        onChange={(event) => {
            setQuestion(event.target.value);
        }}
        />
         <label>Answer: </label> 
        <textarea className="message_user"  placeholder="Write something.."  onChange={(event) => {
            setAnswer(event.target.value);
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


