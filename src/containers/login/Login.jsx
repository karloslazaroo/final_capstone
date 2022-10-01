import React from 'react'
import './login.css'




const Login = () => {
  return (
    <div className='bodyLogin'>
      
    <div className='login'>
      <div className='formLogin'>
        <h1>Welcome</h1>
        <div className="inputContainer">
          <input type="text" className='inputLogin' placeholder=''/>
          <label className='labelLogin'>Email</label>
        </div>
        <div className="inputContainer">
          <input type="password" className='inputLogin' placeholder=''/>
          <label className='labelLogin'>Password</label>
        </div>
        <a href='/App'>
        <input type='submit' className='submitButton' value="Sign in"></input>
       </a>
      </div>
      
    </div>
    </div>
  )
}

export default Login


