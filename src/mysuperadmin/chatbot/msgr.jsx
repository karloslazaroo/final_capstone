import './App.css';
import Axios from 'axios';
import React, {useEffect, useState} from 'react';

function App() {
  const [name, setName] = useState('');
  const [datas, setData] = useState([]);
  const [projId, setID] = useState('');

useEffect(() => {
  Axios.get('https://dialogflow.googleapis.com/v2/projects/archie-fcoa/agent?access_token=ya29.a0Aa4xrXP8Gr4eo75dlDCc3YIG5dNBnCg9IqoHmX8A2kP9HSRENt_WQEM0ARz8ElqGZ4vB_snHNCFkW2conI2Woxlzd274I8jJkYVADIO3-oKBzwW5MaMW9OjRRnzAVl74Zs1_Lv0cvtdkYOK9Z4zs-D_g-9uweQaCgYKATASARASFQEjDvL9MfVob2yGfTI9QKTn9ZGZlw0165').then((response) => {
    console.log([response.data])
    setData([response.data]);
  });
}, []);

const addChatbot = () => {
  Axios.post(https://dialogflow.googleapis.com/v2/projects/${projId}/agent?access_token=ya29.a0Aa4xrXOVzzpV3NiqcNXA2p6zz4cYZOiERf4xstknOXxZ8xmBViTBNRsRZAKiadt93-K7znwfK_jJFlmjn8H2AnL8ocwgMjYMc44R1lPjeWvRdK5VJNJjQ-SQpfhtboW0XRd7idRhcbe9946i9D_2xSOYtepSmwaCgYKATASARASFQEjDvL9qbzeBAVzJhhbBMg0sEjFtg0165, 
  {
   displayName: name
  });
};


  return (
    <div className='bodyLogin'>
    <div className='login'>
      <div className='formLogin'>
        <h1>Welcome</h1>
       <label>Proj ID: </label>  
            <input 
            className="name_ratings_user"
            type="text"
            placeholder="Type your title..." 
            onChange={(event) => {
              setID(event.target.value);
            }}
            />
       <label>Name: </label>  
            <input 
            className="name_ratings_user"
            type="text"
            placeholder="Type your title..." 
            onChange={(event) => {
              setName(event.target.value);
            }}
            />
            <button onClick={addChatbot} >Submit</button>
       
      </div>
      {datas.map((val, key) => {
          return (
            <div key={key}>
            <div className="box_questions">
              <i className="fas fa-quote-left quote"></i>
              <h1> {val.displayName} </h1>
              <p>
                {val.parent}
              </p>
            </div>
          </div>
          );
        })}
    </div>
    </div>
  )
}

export default App;