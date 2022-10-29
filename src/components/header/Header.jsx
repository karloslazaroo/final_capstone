import React, { useEffect  } from 'react';
import './header.css';
import logo from '../../assets/header.jpg';
import chathead from '../../assets/chathead.png';


const Header = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, []);
  return (
    
    <div>
      <div class="topnav">
      <img src={logo} className='logo2' width={40} />
</div>
<df-messenger
  intent="WELCOME"
  chat-title="TOM"
  agent-id="ceefe9bb-13a3-4f75-976b-b312b79ab17f"
  language-code="en"
  chat-icon= {chathead}
></df-messenger>
    </div>
  )
}

export default Header;
