
import { useState } from "react";

const App = () => {

  const [text, setText] = useState('')
  const [messages, setMessages] = useState([])

  console.log('messages', messages);
  const getResponse = async() => {
    const response = await fetch(`http://localhost:8000/prompt/${text}`)
      const data = await response.json()
      console.log('data', data);
      setMessages([...messages,
      {
        
          // author:data.messages[0].content,
          prompt: text,
          bot: data.candidates[0].content.parts[0].text
        
      }])
  }
  console.log(text);
  return (
    <div className="chat-bot">
      <div className="chat-header">
        <div className="info-container">
          {/* <h3>Chat with</h3> */}
          <h2>Gem Bot</h2>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 320"> 
        <path d="M0 203L30 192.5C60 182 120 161 180 167.3C240 173.7 300 207.3 360 212.3C420 217.3 480 193.7 540 185.5C600 177.3 660 184.7 720 188.3C780 192 840 192 870 192L900 192L900 0L870 0C840 0 780 0 720 0C660 0 600 0 540 0C480 0 420 0 360 0C300 0 240 0 180 0C120 0 60 0 30 0L0 0Z" fill="#rgb(6, 120, 84)" fillOpacity="1"/>
        </svg>
      </div>
      <div className="feed">
        {messages?.map((message, _index) => 
          <div key={_index}>
            <div className="question bubble">{message.prompt}</div>
            <div className="response bubble">{message.bot}</div>
          </div>
        )}  
      </div>

      <textarea value={text} onChange={e => setText(e.target.value)}/>
      <button onClick={getResponse}>⇨</button>
    </div>
  );
}

export default App;
