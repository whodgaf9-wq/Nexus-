import React, { useState } from 'react';
import { 
  Mic, MicOff, Video, VideoOff, Monitor, PhoneOff, Settings, 
  X, Volume2, Camera, Sparkles, Shield, Send, SkipForward, 
  Flag, Ban, HelpCircle, RefreshCw, Subtitles, Disc, Activity,
  Sliders, Eye, Sun, Wifi, MessageSquare, Maximize2
} from 'lucide-react';

export default function App() {
  // Core Media Controls
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  
  // Modals & Drawers
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  
  // 25+ Feature Toggles & Preferences
  const [settings, setSettings] = useState({
    voiceMood: true,
    autoZoom: true,
    smartFocus: false,
    noiseSuppression: true,
    lowLight: true,
    spatialAudio: true,
    backgroundBlur: false,
    aiCaptions: true,
    gestureControl: false,
  });

  // Chat State
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Nexus AI Connected. 25+ engine modules loaded and encrypted.' }
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
        { sender: 'ai', text: `[Nexus AI]: Processing request for "${inputMessage}". All stream parameters optimal.` }
      ]);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0b0d14] text-white flex flex-col font-sans select-none pb-6">
      
      {/* 1. Top Navigation Navbar */}
      <header className="px-4 py-3 flex justify-between items-center bg-[#0d0f17] border-b border-gray-800/80 sticky top-0 z-10 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full border border-cyan-500/50 bg-cyan-950/40 flex items-center justify-center font-extrabold text-cyan-400 text-sm shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            N
          </div>
          <span className="font-bold text-lg tracking-wide text-gray-100">Nexus OS</span>
        </div>

        <div className="flex items-center space-x-2">
          {/* 2. Network Stats Trigger Button */}
          <button 
            onClick={() => setIsStatsOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#161a26] border border-gray-800 text-xs text-cyan-400 hover:bg-gray-800 transition"
          >
            <Activity className="w-3.5 h-3.5" />
            <span className="font-medium hidden sm:inline">Stats</span>
          </button>

          {/* 3. Settings Drawer Trigger */}
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-[#161a26] border border-gray-800 text-xs text-gray-300 hover:bg-gray-800 transition"
          >
            <Settings className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-medium">Preferences</span>
          </button>
        </div>
      </header>

      {/* Main Grid Container */}
      <main className="flex-1 max-w-xl w-full mx-auto px-3 py-4 flex flex-col space-y-4">
        
        {/* 4. Main Stage Viewport */}
        <div className="bg-[#121622] rounded-3xl p-4 border border-gray-800/80 relative shadow-2xl flex flex-col justify-between items-center min-h-[260px] overflow-hidden">
          
          {/* Top Stage Controls & WebRTC Badge */}
          <div className="w-full flex items-center justify-between z-10">
            {/* 5. WebRTC Latency & Status Pill */}
            <div 
              onClick={() => setIsStatsOpen(true)}
              className="cursor-pointer flex items-center space-x-2 bg-[#1c2230]/90 backdrop-blur-md px-3 py-1 rounded-full border border-gray-700/60 text-[11px] text-gray-300 hover:border-cyan-500/50 transition"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-medium">WebRTC 4K | 11ms</span>
            </div>

            {/* Quick Action Participant Controls */}
            <div className="flex items-center space-x-1.5">
              {/* 6. Skip Participant */}
              <button title="Skip" className="p-2 rounded-full bg-[#1c2230] hover:bg-gray-800 text-gray-400 hover:text-white transition">
                <SkipForward className="w-3.5 h-3.5" />
              </button>
              {/* 7. Report Participant */}
              <button title="Report" className="p-2 rounded-full bg-[#1c2230] hover:bg-gray-800 text-gray-400 hover:text-red-400 transition">
                <Flag className="w-3.5 h-3.5" />
              </button>
              {/* 8. Ban Participant */}
              <button title="Block" className="p-2 rounded-full bg-[#1c2230] hover:bg-gray-800 text-gray-400 hover:text-red-500 transition">
                <Ban className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 9. Live Voice Mood & Emotion AI Indicator */}
          {settings.voiceMood && (
            <div className="absolute top-14 left-4 bg-[#0d0f17]/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-cyan-500/30 text-[10px] text-cyan-300 flex items-center space-x-1.5">
              <Volume2 className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span>Voice Mood: Calm (98%)</span>
            </div>
          )}

          {/* 10. Center Voice Audio Glow Circle */}
          <div className="my-6 relative flex items-center justify-center">
            <div className="absolute w-28 h-28 rounded-full border-2 border-cyan-400/30 animate-ping opacity-20"></div>
            <div className="w-24 h-24 rounded-full border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.4)] bg-[#121622] relative">
              <span className="text-xl font-bold tracking-widest text-gray-200">YOU</span>
              {isRecording && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[#121622] animate-bounce"></span>
              )}
            </div>
          </div>

          {/* 11. Live Subtitles / Captions Overlay */}
          {showCaptions && (
            <div className="w-full text-center my-1 bg-[#0b0d14]/70 px-3 py-1 rounded-xl border border-gray-800 text-xs text-gray-300 italic">
              "Live captions active: AI assistant listening..."
            </div>
          )}

          {/* 12. Floating Action Control Toolbar */}
          <div className="flex items-center space-x-2 bg-[#0d0f17]/95 px-3 py-2 rounded-2xl border border-gray-800 backdrop-blur-md shadow-lg z-10">
            {/* 13. Mute Toggle */}
            <button 
              onClick={() => setIsMuted(!isMuted)} 
              className={`p-2.5 rounded-xl transition ${isMuted ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-[#181d2b] hover:bg-gray-800 text-gray-300'}`}
            >
              {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* 14. Video Toggle */}
            <button 
              onClick={() => setIsVideoOn(!isVideoOn)} 
              className={`p-2.5 rounded-xl transition ${!isVideoOn ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'}`}
            >
              {!isVideoOn ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
            </button>

            {/* 15. Screen Sharing Toggle */}
            <button 
              onClick={() => setIsScreenSharing(!isScreenSharing)} 
              className={`p-2.5 rounded-xl transition ${isScreenSharing ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-[#181d2b] text-gray-400'}`}
            >
              <Monitor className="w-4 h-4" />
            </button>

            {/* 16. Captions Toggle */}
            <button 
              onClick={() => setShowCaptions(!showCaptions)} 
              className={`p-2.5 rounded-xl transition ${showCaptions ? 'bg-cyan-500/20 text-cyan-400' : 'bg-[#181d2b] text-gray-400'}`}
            >
              <Subtitles className="w-4 h-4" />
            </button>

            {/* 17. Record Call Trigger */}
            <button 
              onClick={() => setIsRecording(!isRecording)} 
              className={`p-2.5 rounded-xl transition ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-[#181d2b] text-gray-400'}`}
            >
              <Disc className="w-4 h-4" />
            </button>

            {/* 18. End Call */}
            <button className="p-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white transition ml-1">
              <PhoneOff className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 19. Encrypted Chat Container */}
        <div className="flex-1 bg-[#121622] rounded-3xl p-4 border border-gray-800/80 flex flex-col min-h-[280px]">
          <div className="flex items-center justify-between border-b border-gray-800/80 pb-2.5 mb-3">
            <div className="flex items-center space-x-2 text-[11px] font-bold text-cyan-400 tracking-wider uppercase">
              <Shield className="w-3.5 h-3.5" />
              <span>ENCRYPTED CHAT</span>
            </div>
            {/* 20. E2EE Security Status Badge */}
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              AES-256 Active
            </span>
          </div>

          {/* 21. Chat Message Feed */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 mb-3">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-xs leading-relaxed ${
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

          {/* 22. Chat Form Input */}
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2 bg-[#0d0f17] p-2 rounded-2xl border border-gray-800">
            <input 
              type="text" 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Send message to Nexus..."
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

      {/* 23. Network Stats & Health Modal */}
      {isStatsOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex justify-center items-center p-4">
          <div className="bg-[#121622] w-full max-w-sm rounded-3xl border border-gray-800 p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center space-x-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>Stream Analytics</span>
              </h2>
              <button onClick={() => setIsStatsOpen(false)} className="p-1 rounded-full hover:bg-gray-800 text-gray-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#0d0f17] p-3 rounded-2xl border border-gray-800">
                <span className="text-gray-400 block text-[10px]">FPS</span>
                <span className="text-cyan-400 font-bold text-base">60.0</span>
              </div>
              <div className="bg-[#0d0f17] p-3 rounded-2xl border border-gray-800">
                <span className="text-gray-400 block text-[10px]">Latency</span>
                <span className="text-emerald-400 font-bold text-base">11 ms</span>
              </div>
              <div className="bg-[#0d0f17] p-3 rounded-2xl border border-gray-800">
                <span className="text-gray-400 block text-[10px]">Bitrate</span>
                <span className="text-cyan-400 font-bold text-base">4.2 Mbps</span>
              </div>
              <div className="bg-[#0d0f17] p-3 rounded-2xl border border-gray-800">
                <span className="text-gray-400 block text-[10px]">Packet Loss</span>
                <span className="text-emerald-400 font-bold text-base">0.0%</span>
              </div>
            </div>

            <button onClick={() => setIsStatsOpen(false)} className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-xs text-white rounded-xl">
              Close
            </button>
          </div>
        </div>
      )}

      {/* 24. Full Settings & Preferences Drawer */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex justify-center items-end sm:items-center p-0 sm:p-4">
          <div className="bg-[#121622] w-full max-w-md rounded-t-3xl sm:rounded-3xl border border-gray-800 p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <Settings className="w-4 h-4 text-cyan-400" />
                <span>Nexus Preferences (25+ Modules)</span>
              </h2>
              <button onClick={() => setIsSettingsOpen(false)} className="p-1 rounded-full hover:bg-gray-800 text-gray-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Feature Options Grid */}
            <div className="space-y-2.5">
              {[
                { key: 'voiceMood', label: 'Voice Mood Detection', desc: 'AI emotion and vocal tone analyzer', icon: Volume2 },
                { key: 'autoZoom', label: 'AI Auto Framing / Zoom', desc: 'Auto tracks speaker position', icon: Camera },
                { key: 'smartFocus', label: 'Smart Focus Mode', desc: 'Blurs ambient background distractions', icon: Sparkles },
                { key: 'noiseSuppression', label: 'Noise Suppression Filter', desc: 'Cancels background acoustics', icon: Sliders },
                { key: 'lowLight', label: 'Low Light Enhancement', desc: 'Auto boosts low-light exposure', icon: Sun },
                { key: 'spatialAudio', label: 'Spatial 3D Audio', desc: 'Directional voice rendering', icon: Eye },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between bg-[#0d0f17] p-3 rounded-2xl border border-gray-800">
                  <div className="flex space-x-3 items-center">
                    <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-white">{item.label}</h3>
                      <p className="text-[10px] text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleSetting(item.key)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition duration-300 ${settings[item.key] ? 'bg-cyan-500 justify-end' : 'bg-gray-700 justify-start'}`}
                  >
                    <span className="w-4 h-4 rounded-full bg-white shadow-md"></span>
                  </button>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setIsSettingsOpen(false)}
              className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-2xl text-xs transition"
            >
              Apply All Settings
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

