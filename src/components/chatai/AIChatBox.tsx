import React, { useState } from 'react';
import { useSendMessageMutation } from '../../features/chatai/chataiApi.ts';
import { AiOutlineRobot, AiOutlineUser } from 'react-icons/ai';

const AIChatBox: React.FC = () => {
  const [userMessage, setUserMessage] = useState<string>('');
  const [messages, setMessages] = useState<Array<{ sender: string, text: string }>>([]);
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return; // Prevent sending empty messages

    const userChat = { sender: 'user', text: userMessage };
    setMessages((prev) => [...prev, userChat]); // Add user message to chat
    setUserMessage(''); // Clear input

    try {
      const response = await sendMessage({ prompt: userMessage }).unwrap();
      const aiChat = { sender: 'ai', text: response.response };
      setMessages((prev) => [...prev, aiChat]); // Add AI response to chat
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages((prev) => [...prev, { sender: 'ai', text: '⚠️ Error fetching AI response' }]);
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden relative">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-button-gradient-start to-button-gradient-end text-white p-4 text-center font-bold text-lg flex justify-center items-center">
        <AiOutlineRobot className="mr-2 text-2xl animate-spin-slow" /> 
        <span className="animate-twinkle">Wakili AI Assistant</span>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 bg-gray-50 overflow-y-auto custom-scrollbar">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex items-start mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <AiOutlineRobot className="text-blue-600 text-2xl mr-2" />
            )}
            <div 
              className={`p-3 rounded-lg shadow-md transform transition-transform ${
                msg.sender === 'user' 
                  ? 'bg-gradient-to-r from-button-gradient-start to-button-gradient-end text-white rounded-tr-none animate-slide-in-right' 
                  : 'bg-gray-200 text-gray-800 rounded-tl-none animate-slide-in-left'
              }`}
            >
              {msg.text}
            </div>
            {msg.sender === 'user' && (
              <AiOutlineUser className="text-blue-600 text-2xl ml-2" />
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center animate-pulse">
            <AiOutlineRobot className="text-blue-600 text-2xl mr-2" />
            <div className="bg-gray-200 p-3 rounded-lg">
              <span className="animate-pulse">🤖 Typing...</span>
            </div>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="flex items-center p-4 border-t border-gray-300 bg-white">
        <input 
          type="text" 
          className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-500" 
          placeholder="Ask me anything... ✍️" 
          value={userMessage} 
          onChange={(e) => setUserMessage(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button 
          className="ml-2 p-3 bg-gradient-to-r from-button-gradient-start to-button-gradient-end text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg" 
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChatBox;
