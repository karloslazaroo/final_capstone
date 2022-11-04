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
      Swal.fire({
        title:'Thank you!',
        text:'Your FAQ has been added!',
        icon:'success',
        confirmButtonColor: '#f7ce05',
      }) 
    Axios.post("http://localhost:3001/insertFaqs", {
      question: question,
      answer: answer,
    });
  }
  };

  const updateTitle = (id) => {
    if(newQuestion === "" && setNewAnswer === "") {
      alert('All fields required.')
    } else {
      Swal.fire({
        title:'Thank you!',
        text:'Your FAQs has been updated!',
        icon:'success',
        confirmButtonColor: '#f7ce05',
      }) 
    
    Axios.put("http://localhost:3001/updateFaqs", {
      id: id, 
      newQuestion: newQuestion,
      newAnswer: newAnswer,
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
        Axios.delete(`http://localhost:3001/deleteFaqs/${id}`)
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
  
  return(
    
<div className="faq_body">
<div className="announcement_admin">
            <h2><span>FAQs</span></h2>
            </div>
        <div className='divider'></div>
           
        <div className="button_add_content">
      <button href='#'onClick={toggleModal}>New FAQs!</button>
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
                      
                      <div className="button_faq_content">
                      <button href="#" onClick={() => myFunction(val._id)}> Edit </button>
                      <button href="#" onClick={() => deleteAnnounce(val._id)}> Delete </button>
                      </div>
                    
          
          <div id={val._id} className="edit_content">
            <label>Question:</label>
              <textarea
            className="title_content"
            type="text"
            placeholder
            onChange={(event) => {
              setNewQuestion(event.target.value);
            }}
            >{val.question}</textarea>
            <label>Answer:</label>
              <textarea className="body_content"  placeholder  onChange={(event) => {
                      setNewAnswer(event.target.value);
                    }}>{val.answer}</textarea>
            <div className="button_confirm_content">
                <button href="#" onClick={() => updateTitle(val._id)}> Confirm </button>
              </div>
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


