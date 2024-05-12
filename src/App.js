import { useState } from "react";

const App = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  console.log("messages", messages);
  const getResponse = async () => {
    const response = await fetch(`http://localhost:8000/prompt/${text}`);
    const data = (await response.text()).toString();

    console.log("data", data);
    setMessages([
      ...messages,
      {
        prompt: text,
        bot: data,
      },
    ]);
  };
  console.log(text);
  return (
    <div className="chat-bot">
      <div className="chat-header">
        <div className="info-container">
          {/* <h3>Chat with</h3> */}
          <h2>Gem Bot</h2>
        </div>
      </div>
      <div className="feed">
        {messages?.map((message, _index) => (
          <div key={_index}>
            <div className="question bubble">{message.prompt}</div>
            <div className="response bubble">{message.bot}</div>
          </div>
        ))}
      </div>

      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={getResponse}>⇨</button>
    </div>
  );
};

export default App;
