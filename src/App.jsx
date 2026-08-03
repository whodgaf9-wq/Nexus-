import React, { useState } from 'react';
import { 
  Mic, MicOff, Video, VideoOff, Monitor, PhoneOff, Settings, 
  X, Volume2, Camera, Sparkles, Shield, Send, SkipForward, 
  Flag, Ban, HelpCircle, RefreshCw 
} from 'lucide-react';

export default function App() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Settings Toggles
  const [settings, setSettings] = useState({
    voiceMood: true,
    autoZoom: false,
    smartFocus: false,
  });

  // Chat State
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Welcome to Nexus! I am your human-like AI companion. How can I assist you?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: inputMessage }];
    setMessages(newMessages);
    setInputMessage('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: `Nexus AI received: "${inputMessage}".` }
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0d0f17] text-white flex flex-col font-sans select-none">
      {/* Top Navigation Header */}
      <header className="px-4 py-3 flex justify-between items-center bg-[#0d0f17] border-b border-gray-900 sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full border border-cyan-500/40 bg-cyan-950/30 flex items-center justify-center font-bold text-cyan-400 text-sm shadow-[0_0_12px_rgba(6,182,212,0.25)]">
            N
          </div>
          <span className="font-bold text-lg tracking-wide text-gray-100">Nexus</span>
        </div>

        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#161a26] border border-gray-800 text-xs text-emerald-400 hover:bg-gray-800 transition"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="font-medium">Support AI</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-lg w-full mx-auto px-3 py-4 flex flex-col space-y-4">
        
        {/* Call Stage Section */}
        <div className="bg-[#131722] rounded-3xl p-4 border border-gray-800/80 relative shadow-2xl flex flex-col justify-between items-center min-h-[220px]">
          
          {/* Status Chip & Quick Actions Bar */}
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center space-x-2 bg-[#1c2230] px-3 py-1 rounded-full border border-gray-700/50 text-[11px] text-gray-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-medium">WebRTC 4K | 12ms</span>
            </div>

            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full bg-[#1c2230] hover:bg-gray-800 text-gray-400 hover:text-white transition">
                <SkipForward className="w-3.5 h-3.5" />
              </button>
              <button className="p-2 rounded-full bg-[#1c2230] hover:bg-gray-800 text-gray-400 hover:text-red-400 transition">
                <Flag className="w-3.5 h-3.5" />
              </button>
              <button className="p-2 rounded-full bg-[#1c2230] hover:bg-gray-800 text-gray-400 hover:text-red-500 transition">
                <Ban className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Central Voice Glow Avatar */}
          <div className="my-6 relative flex items-center justify-center">
            <div className="absolute w-28 h-28 rounded-full border-2 border-cyan-400/30 animate-ping opacity-25"></div>
            <div className="w-24 h-24 rounded-full border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_25px_rgba(6,182,212,0.4)] bg-[#131722]">
              <span className="text-xl font-semibold tracking-widest text-gray-200">YOU</span>
            </div>
          </div>

          {/* Bottom Floating Control Bar */}
          <div className="flex items-center space-x-3 bg-[#0d0f17]/90 px-4 py-2 rounded-2xl border border-gray-800 backdrop-blur-md">
            <button 
              onClick={() => setIsMuted(!isMuted)} 
              className={`p-2.5 rounded-xl transition ${isMuted ? 'bg-red-500/20 text-red-400' : 'bg-[#181d2b] hover:bg-gray-800 text-gray-300'}`}
            >
              {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <button 
              onClick={() => setIsVideoOn(!isVideoOn)} 
              className={`p-2.5 rounded-xl transition ${!isVideoOn ? 'bg-[#181d2b] text-gray-400' : 'bg-cyan-500/20 text-cyan-400'}`}
            >
              {!isVideoOn ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
            </button>

            <button 
              onClick={() => setIsScreenSharing(!isScreenSharing)} 
              className={`p-2.5 rounded-xl transition ${isScreenSharing ? 'bg-cyan-500/20 text-cyan-400' : 'bg-[#181d2b] text-gray-400'}`}
            >
              <Monitor className="w-4 h-4" />
            </button>

            <button className="p-2.5 rounded-xl bg-[#181d2b] hover:bg-gray-800 text-gray-400 transition">
              <RefreshCw className="w-4 h-4" />
            </button>

            <button className="p-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white transition ml-1">
              <PhoneOff className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Encrypted Chat Box Container */}
        <div className="flex-1 bg-[#131722] rounded-3xl p-4 border border-gray-800/80 flex flex-col min-h-[300px]">
          <div className="flex items-center space-x-2 text-[11px] font-bold text-cyan-400 tracking-wider uppercase mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>ENCRYPTED CHAT</span>
          </div>

          {/* Session Pill */}
          <div className="mb-4">
            <div className="inline-flex items-center space-x-2 bg-[#1c2230] border border-gray-800 px-3 py-1.5 rounded-full text-xs text-gray-300">
              <span>🔒</span>
              <span>E2EE Session Initialized.</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 mb-4">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-none' 
                      : 'bg-[#1c2230] text-gray-200 border border-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2 bg-[#0d0f17] p-2 rounded-2xl border border-gray-800">
            <input 
              type="text" 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-transparent px-3 py-1 text-xs text-white focus:outline-none placeholder-gray-500"
            />
            <button 
              type="submit" 
              className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </main>

      {/* Settings Modal Drawer */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex justify-center items-end sm:items-center p-0 sm:p-4">
          <div className="bg-[#131722] w-full max-w-md rounded-t-3xl sm:rounded-3xl border border-gray-800 p-6 space-y-5 animate-in slide-in-from-bottom duration-200">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <Settings className="w-4 h-4 text-cyan-400" />
                <span>Nexus Settings</span>
              </h2>
              <button 
                onClick={() => setIsSettingsOpen(false)} 
                className="p-1.5 rounded-full hover:bg-gray-800 text-gray-400 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Feature Options List */}
            <div className="space-y-3">
              {/* Voice Mood Detection */}
              <div className="flex items-center justify-between bg-[#0d0f17] p-3.5 rounded-2xl border border-gray-800">
                <div className="flex space-x-3 items-center">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white">Voice Mood Detection</h3>
                    <p className="text-[10px] text-gray-400">Ambient tone indicator based on vocal pace and pitch.</p>
                  </div>
                </div>
                <button 
                  onClick={() => toggleSetting('voiceMood')}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition duration-300 ${settings.voiceMood ? 'bg-cyan-500 justify-end' : 'bg-gray-700 justify-start'}`}
                >
                  <span className="w-4 h-4 rounded-full bg-white shadow-md"></span>
                </button>
              </div>

              {/* AI Auto Zoom */}
              <div className="flex items-center justify-between bg-[#0d0f17] p-3.5 rounded-2xl border border-gray-800">
                <div className="flex space-x-3 items-center">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white">AI Auto Zoom</h3>
                    <p className="text-[10px] text-gray-400">Gently frames tighter when you speak.</p>
                  </div>
                </div>
                <button 
                  onClick={() => toggleSetting('autoZoom')}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition duration-300 ${settings.autoZoom ? 'bg-cyan-500 justify-end' : 'bg-gray-700 justify-start'}`}
                >
                  <span className="w-4 h-4 rounded-full bg-white shadow-md"></span>
                </button>
              </div>

              {/* Smart Focus Mode */}
              <div className="flex items-center justify-between bg-[#0d0f17] p-3.5 rounded-2xl border border-gray-800">
                <div className="flex space-x-3 items-center">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white">Smart Focus Mode</h3>
                    <p className="text-[10px] text-gray-400">Blurs background in large grids.</p>
                  </div>
                </div>
                <button 
                  onClick={() => toggleSetting('smartFocus')}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition duration-300 ${settings.smartFocus ? 'bg-cyan-500 justify-end' : 'bg-gray-700 justify-start'}`}
                >
                  <span className="w-4 h-4 rounded-full bg-white shadow-md"></span>
                </button>
              </div>
            </div>

            <button 
              onClick={() => setIsSettingsOpen(false)}
              className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-2xl text-xs transition"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

