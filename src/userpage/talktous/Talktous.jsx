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
  const [admi, setAdmi] = useState([]);
  const [receiver, setReceiver] = useState('');
  const [faqsList, setFaqsList] = useState([]);
  const source = "Talk to Us";
  const [sendEmail, setSendEmail]= useState('');



  useEffect(() => {
    Axios.get('https://aust-chatbot.herokuapp.com/readFaqs').then((response) => {
      setFaqsList(response.data);
    });
    // getTalktoUsData();
  }, [faqsList]);

  useEffect(() => {
    Axios.get('https://aust-chatbot.herokuapp.com/readAdmin').then((response) => {
      setAdmi(response.data);
    });
  }, [admi]);

  const getEmaildept = () =>{
    const email = user.email;
    const emailsplit = email.split('.');
    const atsplit = emailsplit[2].split('@');
    const deptcontainer = atsplit[0];
    
    console.log(deptcontainer);
  }
// getEmaildept();
console.log(sendEmail);

  const addToList = () => {
    if(message === "" || receiver === ""){
      alert('All fields are required.')
    } else{
    Swal.fire({
      title:'Thank you!',
      text:'Your message has been submitted!',
      icon: 'success',
      confirmButtonColor: '#f7ce05'
    }) 
    let dates = new Date();
    let postDate = dates.toLocaleString({timeZone: "Asia/Hong_Kong"});
    console.log(postDate);
    const receiveremailcontainer = admi[receiver].email;
    Axios.post("https://aust-chatbot.herokuapp.com/insertTalk", {
      name: name,
      email: email,
      message: message,
      receiver: receiveremailcontainer,
      date: postDate,
    });
    
    console.log(receiveremailcontainer);
    Axios.post("https://aust-chatbot.herokuapp.com/analyticsdata",{
      source: source,
      date: new Date(Date.now()).toLocaleDateString(),
      receiver: receiveremailcontainer
    }).then(console.log('data logged for analytics'));

    document.getElementById('inputs').value = '';
  }
  };
  
  const faqs = document.querySelectorAll(".faq");

  faqs.forEach(faq =>{
    faq.addEventListener("click",()=>{
      faq.classList.toggle("_active");
    });
  });


// console.log(admi[receiver].email);
  return (
    <div className="body_talktous">
      <div className="talktous_user">
            <h2><span>Contact Us</span></h2>
            <div className="divider_talktous_user"></div>
            </div>
            
    <div class="container">
    <div class="contact-box">
        <div class="left"></div>
        <div class="right">
            <h2>Contact Us</h2>
            <p>Name:  <span>{user?.displayName}</span></p>
            <p>Email:  <span>{user?.email}</span></p>
            <p>Address To:  <span></span></p> 
            
            <select className="receiver" value={receiver} onChange={e=>setReceiver(e.target.value)}>
                    <option></option>
              {admi.map((val, key) => {
              return (
                    <option key={key} value={key}
                    >
                      {val.email}
                    </option>
              );
            })}
            </select>
            
            
            
            <textarea id="inputs" placeholder="Message" class="field"
            onChange={(event) => {
              setMessage(event.target.value);
            }}></textarea>



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