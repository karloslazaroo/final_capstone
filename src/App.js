import React from 'react'
import './App.css';


import {Footer, Header} from './components';
import {Homepage_User, TalkToUs_User, Announcements_User, Ratings_User, Sidebar_User} from './userpage';

function App  ()  {
  let User
  switch (window.location.pathname) {
    case "/user":
      User = <Homepage_User />
      break;
    case "/Talktous_User":
      User = <TalkToUs_User/>
      break;
    case "/Announcements_User":
      User = <Announcements_User/>
      break
    case "/Ratings_User":
      User = <Ratings_User/>
      break
   
  }
  return (
    <div className='User'>
      <Header/>
      <Sidebar_User/>
      {User} 
      <Footer/>
     </div>
  )
}

export default App




