import React, { useState, useEffect } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import './index.css'

const configuration = new Configuration({
  apiKey: "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",
  // apiKey: 'YOUR_API_KEY',
});

const openai = new OpenAIApi(configuration);

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [input, setInput] = useState('');
  
  const handleMessageSubmit = async () => {
    if (!input) return;
    setChatHistory([...chatHistory, { message: input, author: 'user' }]);
    setInput('');

    try {
      const response = await openai.createCompletion({
        model: 'text-davinci-002',
        prompt: input,
        maxTokens: 60,
        n: 1,
        stop: ['\n', 'Human:'],
      });
      const message = response.data.choices[0].text.trim();
      setChatHistory([...chatHistory, { message, author: 'bot' }]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setChatHistory([
      {
        message: "Hi, I'm a chatbot powered by OpenAI. How can I help you?",
        author: 'bot',
      },
    ]);
  }, []);

  return (
    <div>
      <div className="chat-history">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.author === 'bot' ? 'bot-message' : 'user-message'
            }`}
          >
            {message.message}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleMessageSubmit}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
