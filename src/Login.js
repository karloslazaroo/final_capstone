import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import Protected from './components/Protected';
import './ContentAdmin.css';


//import {Footer, Header} from './components';
import Login from './containers/login/Login';
import Content from './ContentAdmin';
import Announcements_Content from './ContentAdmin';
import Ratings_Content from './ContentAdmin';
import Chatbot_Content from './ContentAdmin';
import Faqs_Content  from './mycontentadmin';
import Analytics_Content from './ContentAdmin';
import Unanswered_Content from './ContentAdmin';
import Super from './SuperAdmin';
import Announcements_Admin from './SuperAdmin';
import Ratings_Admin from './SuperAdmin';
import Chatbot_Admin from './SuperAdmin';
import Analytics_Admin from './SuperAdmin';
import Unanswered_Admin from './SuperAdmin';
import Administrators_Admin from './SuperAdmin';
import Faqs_Admin from './SuperAdmin';
import User from './App';
import Talktous_User from './App';
import Announcements_User from './App';
import Ratings_User from './App';



function App  ()  {
    /*let Login
    switch (window.location.pathname) {
      case "/":
        Login = <Login_index/>
        break;
      
    }
    return (
      
      <div className='ContentAdmin'>
        <Header/>
        {Login} 
        <Footer/>
       </div>
    )*/

    return (
        <div className="ContentAdmin">
          <AuthContextProvider>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/content' element={<Protected> <Content/> </Protected>} />
              <Route path='/announcements_content' element={<Announcements_Content/>} />
              <Route path='/ratings_content' element={<Ratings_Content/>} />
              <Route path='/chatbot_content' element={<Chatbot_Content/>} />
              <Route path='/faqs_content' element={<Chatbot_Content/>} />
              <Route path='/analytics_content' element={<Analytics_Content/>} />
              <Route path='/unanswered_content' element={<Unanswered_Content/>} />
              <Route path='/super' element={<Protected> <Super/> </Protected>} />
              <Route path='/announcements_admin' element={<Announcements_Admin/>} />
              <Route path='/ratings_admin' element={<Ratings_Admin/>} />
              <Route path='/chatbot_admin' element={<Chatbot_Admin/>} />
              <Route path='/faqs_admin' element={<Faqs_Admin/>} />
              <Route path='/analytics_admin' element={<Analytics_Admin/>} />
              <Route path='/unanswered_admin' element={<Unanswered_Admin/>} />
              <Route path='/administrators_admin' element={<Administrators_Admin/>} />
              <Route path='/user' element={<Protected> <User/> </Protected>} />
              <Route path='/talktous_user' element={<Talktous_User/>} />
              <Route path='/announcements_user' element={<Announcements_User/>} />
              <Route path='/ratings_user' element={<Ratings_User/>} />
            </Routes>
          </AuthContextProvider>
        </div>
      );
}

export default App;