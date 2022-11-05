import React, { useEffect, useState } from "react";
import { UserAuth } from '../../context/AuthContext';
import Axios from 'axios';
import './talktous.css';
import Swal from 'sweetalert2';
import '../../index.css'

function App() {
  const {user} = UserAuth();
  const name = user.displayName;
  const email = user.email; //0 pag integer/number
  const [message, setMessage] = useState('');
  const [faqsList, setFaqsList] = useState([]);

  const state = {
    source: ''
  };

  useEffect(() => {
    Axios.get('https://aust-chatbot.herokuapp.com/readFaqs').then((response) => {
      setFaqsList(response.data);
    });
  }, [faqsList]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  const addToList = () => {
    if(message == ""){
      alert('All fields are required.')
    } else{
    Swal.fire({
      title:'Thank you!',
      text:'Your message has been submitted!',
      icon: 'success',
      confirmButtonColor: '#f7ce05'
    }) 

    Axios.post("https://aust-chatbot.herokuapp.com/insertTalk", {
      name: name,
      email: email,
      message: message,
    });

    Axios.post("https://aust-chatbot.herokuapp.com/analyticsdata",{
      source: state.source
    });

    document.getElementById('inputs').value = '';
  }
  };

  const faqs = document.querySelectorAll(".faq");

  faqs.forEach(faq =>{
    faq.addEventListener("click",()=>{
      faq.classList.toggle("_active");
    });
  });
 

  return (
    <div className="body_talktous">
      <div className="talktous_user">
            <h2><span>Talk to Us!</span></h2>
            <div className="divider"></div>
            </div>
            
    <div class="container">
    <div class="contact-box">
        <div class="left"></div>
        <div class="right">
            <h2>Contact Us</h2>
            <p>Name:  <span>{user?.displayName}</span></p>
            <p>Email:  <span>{user?.email}</span></p>
            <textarea id="inputs" placeholder="Message" class="field"
            onChange={(event) => {
              setMessage(event.target.value);
            }}></textarea>


            <input 
              type="hidden"
              name="source"
              placeholder="source"
              value={state.source = "Talk to Us"}
              onChange={handleChange}
            />

            <button class="btn" onClick={addToList}>Send</button>
        </div>
    </div>
    
</div>

<div className="faq_body">
<section className="section_faq">
  <h2 className="title">FAQs</h2>
  {faqsList.map((val, key) => {
              return (
                <div key={key}>
              <div className="faq">
                  <div className="question">
                    <h3>{val.question}</h3>
                    <svg width="15" height="10" viewBox="0 0 42 25">
                      <path d="M3 3L21 21L39 3" stroke="white" stroke-width="7" stroke-linecap="round"/>
                    </svg>
                  </div>
                  <div className="answer">
                    <p>
                    {val.answer}
                    </p>
                  </div>
                </div>
                </div>
              );
            })}

  
</section>
</div>

</div>

  )
  
}

export default App;