import React from 'react'
import './SuperAdmin.css';


import {Footer, Header} from './components';
import {Sidebar_Admin, Announcements_Admin, Chatbot_Admin, Homepage_Admin, Ratings_Admin, Unanswered_Admin, Administrators_Admin, Analytics_Admin } from './mysuperadmin'




function SuperAdmin  ()  {
    let SuperAdmin
    switch (window.location.pathname) {
      case "/":
        SuperAdmin = <Homepage_Admin/>
        break;
      case "/Announcements_Admin":
        SuperAdmin = <Announcements_Admin/>
        break;
      case "/Ratings_Admin":
        SuperAdmin = <Ratings_Admin/>
        break
      case "/Chatbot_Admin":
        SuperAdmin = <Chatbot_Admin/>
        break
      case "/Analytics_Admin":
        SuperAdmin = <Analytics_Admin/>
        break
      case "/Unanswered_Admin":
        SuperAdmin = <Unanswered_Admin/>
        break
    case "/Administrators_Admin":
        SuperAdmin = <Administrators_Admin/>
        break

    }
    return (
      
      <div className='SuperAdmin'>
        <Header/>
        <Sidebar_Admin/>
        {SuperAdmin} 
        <Footer/>
       </div>
    )
}

export default SuperAdmin