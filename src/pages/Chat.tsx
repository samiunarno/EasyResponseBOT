import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, RefreshCw, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { createClient } from '@supabase/supabase-js';
import { Link, useLocation } from 'react-router-dom';

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL ?? '',
  import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''
);

// Message type definition
type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

// Chat mode configuration
type ChatMode = {
  title: string;
  description: string;
  placeholder: string;
  initialMessage: string;
};

const chatModes: Record<string, ChatMode> = {
  default: {
    title: "General Chat",
    description: "Chat with BondhuBot in English or Bangla",
    placeholder: "Type your message in English or Bangla (ইংরেজি বা বাংলায় লিখুন)...",
    initialMessage: "Hello! I'm BondhuBot, your bilingual AI assistant. I can help you with writing, translation, explanations, and much more. I understand both English and Bangla. How can I assist you today? \n\nহ্যালো! আমি BondhuBot, আপনার দ্বিভাষিক AI সহকারী। আমি লেখা, অনুবাদ, ব্যাখ্যা এবং আরও অনেক কিছুতে আপনাকে সাহায্য করতে পারি। আমি ইংরেজি এবং বাংলা দুটি ভাষাই বুঝি। আমি আপনাকে কীভাবে সাহায্য করতে পারি?"
  },
  translate: {
    title: "Translation Mode",
    description: "Translate between English and Bangla",
    placeholder: "Enter text to translate...",
    initialMessage: "Welcome to translation mode! I'll help you translate between English and Bangla. Just type your text, and I'll provide the translation. \n\nঅনুবাদ মোডে স্বাগতম! আমি আপনাকে ইংরেজি এবং বাংলার মধ্যে অনুবাদ করতে সাহায্য করব। আপনি টেক্সট টাইপ করুন, আমি অনুবাদ প্রদান করব।"
  },
  write: {
    title: "Writing Assistant",
    description: "Get help with writing and editing",
    placeholder: "Enter your text for writing assistance...",
    initialMessage: "Welcome to writing assistant mode! I can help you improve your writing, suggest edits, or help you create new content. What would you like to work on? \n\nলেখা সহায়ক মোডে স্বাগতম! আমি আপনার লেখা উন্নত করতে, সম্পাদনা সুझাব দিতে বা নতুন কন্টেন্ট তৈরি করতে সাহায্য করতে পারি। আপনি কী নিয়ে কাজ করতে চান?"
  },
  code: {
    title: "Code Helper",
    description: "Get programming assistance",
    placeholder: "Enter your coding question or paste code...",
    initialMessage: "Welcome to code helper mode! I can help you with programming questions, explain code, or help you debug issues. What programming help do you need? \n\nকোড সহায়ক মোডে স্বাগতম! আমি আপনাকে প্রোগ্রামিং প্রশ্নে সাহায্য করতে, কোড ব্যাখ্যা করতে বা ডিবাগ করতে সাহায্য করতে পারি। আপনার কী ধরনের প্রোগ্রামিং সাহায্য প্রয়োজন?"
  }
};

function Chat() {
  const location = useLocation();
  const mode = new URLSearchParams(location.search).get('mode') || 'default';
  const currentMode = chatModes[mode] || chatModes.default;

  const [messages, setMessages] = useState<Message[]>([{
    id: 0,
    text: currentMode.initialMessage,
    sender: 'bot',
    timestamp: new Date()
  }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const containsBangla = (text: string): boolean => {
    return /[\u0980-\u09FF]/.test(text);
  };

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { message: userMessage, mode }
      });

      if (error) throw error;
      return data.response;
    } catch (error) {
      console.error('Error generating response:', error);
      return containsBangla(userMessage)
        ? 'দুঃখিত, একটি ত্রুটি হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।'
        : 'Sorry, there was an error. Please try again.';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage: Message = {
      id: messages.length,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    setIsTyping(true);
    setIsThinking(true);
    
    try {
      const response = await generateAIResponse(input);
      const botResponse: Message = {
        id: messages.length + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsTyping(false);
      setIsThinking(false);
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-[90vh]">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link 
                to="/dashboard" 
                className="mr-4 text-white hover:text-white/80 transition-colors flex items-center"
              >
                <ArrowLeft className="h-5 w-5 mr-1" />
                Back
              </Link>
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl mr-4">
                <Bot className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{currentMode.title}</h1>
                <p className="text-white/80 text-sm">{currentMode.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-white/80" />
              <span className="text-white/80 text-sm">AI Powered</span>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-gray-50 to-white">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' 
                    : 'bg-white border border-gray-200 shadow-sm'
                }`}
              >
                <ReactMarkdown 
                  className={`prose ${message.sender === 'user' ? 'text-white' : 'text-gray-800'} max-w-none`}
                >
                  {message.text}
                </ReactMarkdown>
                <div className={`text-xs mt-2 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center space-x-3">
                <RefreshCw className={`h-5 w-5 text-purple-500 ${isThinking ? 'animate-spin' : ''}`} />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="border-t border-gray-100 bg-white p-6">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={currentMode.placeholder}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
            <button 
              type="submit"
              disabled={isTyping}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl px-6 py-4 flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;