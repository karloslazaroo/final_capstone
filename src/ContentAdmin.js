import React from 'react'
import './ContentAdmin.css';


import {Footer, Header} from './components';
import {Sidebar_Content, Announcements_Content, Chatbot_Content, Homepage_Content, Ratings_Content, Unanswered_Content, Analytics_Content} from './mycontentadmin';




function ContentAdmin()  {
    let ContentAdmin
    switch (window.location.pathname) {
      case "/content":
        ContentAdmin = <Homepage_Content/>
        break;
      case "/Announcements_Content":
        ContentAdmin = <Announcements_Content/>
        break;
      case "/Ratings_Content":
        ContentAdmin = <Ratings_Content/>
        break
      case "/Chatbot_Content":
        ContentAdmin = <Chatbot_Content/>
        break
      case "/Analytics_Content":
        ContentAdmin = <Analytics_Content/>
        break
      case "/Unanswered_Content":
        ContentAdmin = <Unanswered_Content/>
        break
    }
    return (
      
      <div className='ContentAdmin'>
        <Header/>
        <Sidebar_Content/>
        {ContentAdmin} 
        <Footer/>
       </div>
    )
}

export default ContentAdmin;