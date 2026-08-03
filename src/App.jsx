import React, { useState, useEffect } from 'react';
import { 
  Mic, MicOff, Video, VideoOff, Monitor, PhoneOff, Settings, 
  X, Volume2, Camera, Sparkles, Shield, Send, SkipForward, 
  Flag, Ban, HelpCircle, RefreshCw, Subtitles, Disc, Activity,
  Sliders, Eye, Sun, Globe, Users, Edit3, Check, Crown, AlertCircle
} from 'lucide-react';

export default function App() {
  // Core Media State
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isFacingUser, setIsFacingUser] = useState(true); // Camera Flip State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showCaptions, setShowCaptions] = useState(true);
  
  // Filters & Matching (Pro Features)
  const [genderMatch, setGenderMatch] = useState('Any'); // Any, Female, Male
  const [countryFilter, setCountryFilter] = useState('Global');
  
  // Modals & Drawers
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  
  // Interactive Chat State
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Welcome to Nexus OS! All 25+ modules and E2EE channels initialized.' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // Support AI Assistant State
  const [supportQuery, setSupportQuery] = useState('');
  const [supportLogs, setSupportLogs] = useState([]);

  // Preferences Toggles
  const [settings, setSettings] = useState({
    voiceMood: true,
    autoZoom: true,
    smartFocus: false,
    noiseSuppression: true,
    lowLight: true,
    spatialAudio: true,
  });

  // Recording Timer
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => setRecordingTime(prev => prev + 1), 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Chat Handlers
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = { id: Date.now(), sender: 'user', text: inputMessage };
    setMessages((prev) => [...prev, newMessage]);
    setInputMessage('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'ai', text: `Nexus AI: Received "${inputMessage}". All active streams optimal.` }
      ]);
    }, 800);
  };

  const handleEditSave = (id) => {
    setMessages(messages.map(m => m.id === id ? { ...m, text: editText } : m));
    setEditingId(null);
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    if (!supportQuery.trim()) return;
    setSupportLogs(prev => [...prev, { q: supportQuery, a: 'Issue logged with AI Diagnostic Engine. Priority patch active.' }]);
    setSupportQuery('');
  };

  return (
    <div className="min-h-screen bg-[#0b0d14] text-white flex flex-col font-sans select-none pb-6">
      
      {/* 1. Header */}
      <header className="px-4 py-3 flex justify-between items-center bg-[#0d0f17] border-b border-gray-800/80 sticky top-0 z-10 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full border border-cyan-500/50 bg-cyan-950/40 flex items-center justify-center font-extrabold text-cyan-400 text-sm shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            N
          </div>
          <span className="font-bold text-lg tracking-wide text-gray-100">Nexus</span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Support AI Trigger */}
          <button 
            onClick={() => setIsSupportOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#161a26] border border-gray-800 text-xs text-emerald-400 hover:bg-gray-800 transition"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="font-medium">Support AI</span>
          </button>

          {/* Preferences Drawer */}
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#161a26] border border-gray-800 text-xs text-gray-300 hover:bg-gray-800 transition"
          >
            <Settings className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-medium hidden sm:inline">Preferences</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-xl w-full mx-auto px-3 py-4 flex flex-col space-y-4">
        
        {/* Pro Filters Bar (Gender & Country Match) */}
        <div className="bg-[#121622] rounded-2xl p-2.5 border border-gray-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-cyan-400" />
            <span className="text-gray-300 font-medium">Match:</span>
            <select 
              value={genderMatch}
              onChange={(e) => {
                if (e.target.value !== 'Any') setIsProModalOpen(true);
                else setGenderMatch('Any');
              }}
              className="bg-[#0d0f17] border border-gray-700 rounded-lg px-2 py-1 text-white text-xs focus:outline-none"
            >
              <option value="Any">Any Gender</option>
              <option value="Female">Female 🔒 Pro</option>
              <option value="Male">Male 🔒 Pro</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <button 
              onClick={() => setIsProModalOpen(true)}
              className="flex items-center space-x-1 bg-[#0d0f17] border border-gray-700 px-2.5 py-1 rounded-lg text-xs text-gray-300 hover:border-cyan-500/50"
            >
              <span>{countryFilter}</span>
              <Crown className="w-3 h-3 text-amber-400 ml-1" />
            </button>
          </div>
        </div>

        {/* Video Stage Viewport */}
        <div className="bg-[#121622] rounded-3xl p-4 border border-gray-800/80 relative shadow-2xl flex flex-col justify-between items-center min-h-[260px] overflow-hidden">
          
          {/* WebRTC Badge & Top Participant Controls */}
          <div className="w-full flex items-center justify-between z-10">
            <div 
              onClick={() => setIsStatsOpen(true)}
              className="cursor-pointer flex items-center space-x-2 bg-[#1c2230]/90 backdrop-blur-md px-3 py-1 rounded-full border border-gray-700/60 text-[11px] text-gray-300 hover:border-cyan-500/50 transition"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-medium">WebRTC 4K | 12ms</span>
            </div>

            <div className="flex items-center space-x-1.5">
              <button title="Skip" className="p-2 rounded-full bg-[#1c2230] hover:bg-gray-800 text-gray-400 hover:text-white transition">
                <SkipForward className="w-3.5 h-3.5" />
              </button>
              <button title="Report" className="p-2 rounded-full bg-[#1c2230] hover:bg-gray-800 text-gray-400 hover:text-red-400 transition">
                <Flag className="w-3.5 h-3.5" />
              </button>
              <button title="Ban" className="p-2 rounded-full bg-[#1c2230] hover:bg-gray-800 text-gray-400 hover:text-red-500 transition">
                <Ban className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Live Voice Mood Indicator */}
          {settings.voiceMood && (
            <div className="absolute top-14 left-4 bg-[#0d0f17]/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-cyan-500/30 text-[10px] text-cyan-300 flex items-center space-x-1.5">
              <Volume2 className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span>Voice Mood: Energetic (96%)</span>
            </div>
          )}

          {/* Camera View / Avatar */}
          <div className="my-6 relative flex items-center justify-center">
            <div className="absolute w-28 h-28 rounded-full border-2 border-cyan-400/30 animate-ping opacity-20"></div>
            <div className="w-24 h-24 rounded-full border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.4)] bg-[#121622] relative">
              <span className="text-xl font-bold tracking-widest text-gray-200">YOU</span>
              {isRecording && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full animate-pulse border border-[#121622]">
                  {recordingTime}s
                </span>
              )}
            </div>
          </div>

          {/* Subtitles Overlay */}
          {showCaptions && (
            <div className="w-full text-center my-1 bg-[#0b0d14]/70 px-3 py-1 rounded-xl border border-gray-800 text-xs text-gray-300 italic">
              "Live captions active: AI analyzing vocal frequencies..."
            </div>
          )}

          {/* Floating Call Action Controls */}
          <div className="flex items-center space-x-2 bg-[#0d0f17]/95 px-3 py-2 rounded-2xl border border-gray-800 backdrop-blur-md shadow-lg z-10">
            {/* Mute */}
            <button 
              onClick={() => setIsMuted(!isMuted)} 
              className={`p-2.5 rounded-xl transition ${isMuted ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-[#181d2b] hover:bg-gray-800 text-gray-300'}`}
            >
              {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Video Toggle */}
            <button 
              onClick={() => setIsVideoOn(!isVideoOn)} 
              className={`p-2.5 rounded-xl transition ${!isVideoOn ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-cyan-500/20 text-cyan-400'}`}
            >
              {!isVideoOn ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
            </button>

            {/* CAMERA FLIP BUTTON */}
            <button 
              onClick={() => setIsFacingUser(!isFacingUser)} 
              title="Flip Camera"
              className="p-2.5 rounded-xl bg-[#181d2b] hover:bg-gray-800 text-cyan-400 transition"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Screen Share */}
            <button 
              onClick={() => setIsScreenSharing(!isScreenSharing)} 
              className={`p-2.5 rounded-xl transition ${isScreenSharing ? 'bg-cyan-500/20 text-cyan-400' : 'bg-[#181d2b] text-gray-400'}`}
            >
              <Monitor className="w-4 h-4" />
            </button>

            {/* Record Call Button */}
            <button 
              onClick={() => setIsRecording(!isRecording)} 
              title="Record Stream"
              className={`p-2.5 rounded-xl transition ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-[#181d2b] text-gray-400'}`}
            >
              <Disc className="w-4 h-4" />
            </button>

            {/* End Call */}
            <button className="p-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white transition ml-1">
              <PhoneOff className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Encrypted Chat Box */}
        <div className="flex-1 bg-[#121622] rounded-3xl p-4 border border-gray-800/80 flex flex-col min-h-[280px]">
          <div className="flex items-center justify-between border-b border-gray-800/80 pb-2.5 mb-3">
            <div className="flex items-center space-x-2 text-[11px] font-bold text-cyan-400 tracking-wider uppercase">
              <Shield className="w-3.5 h-3.5" />
              <span>ENCRYPTED CHAT</span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              🔒 E2EE Session Initialized
            </span>
          </div>

          {/* Chat Messages List with Editable Text */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 mb-3">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex items-center space-x-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {editingId === msg.id ? (
                  <div className="flex items-center space-x-2 w-full max-w-[85%]">
                    <input 
                      type="text" 
                      value={editText} 
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-1 bg-[#0d0f17] border border-cyan-500 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                    />
                    <button 
                      onClick={() => handleEditSave(msg.id)}
                      className="p-1.5 bg-cyan-500 rounded-xl text-black"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="group relative max-w-[85%]">
                    <div 
                      className={`px-3.5 py-2 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'user' 
                          ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-none' 
                          : 'bg-[#1c2230] text-gray-200 border border-gray-800 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Edit Trigger for User Messages */}
                    {msg.sender === 'user' && (
                      <button 
                        onClick={() => { setEditingId(msg.id); setEditText(msg.text); }}
                        className="opacity-0 group-hover:opacity-100 absolute -top-2 -left-6 p-1 bg-gray-800 hover:bg-gray-700 rounded-full text-gray-300 transition"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Send Input */}
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

      {/* SUPPORT AI ASSISTANT MODAL */}
      {isSupportOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex justify-center items-center p-4">
          <div className="bg-[#121622] w-full max-w-md rounded-3xl border border-gray-800 p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" />
                <span>Nexus Support AI</span>
              </h2>
              <button onClick={() => setIsSupportOpen(false)} className="p-1 rounded-full hover:bg-gray-800 text-gray-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {supportLogs.map((log, idx) => (
                <div key={idx} className="bg-[#0d0f17] p-2.5 rounded-xl border border-gray-800 text-xs space-y-1">
                  <p className="text-cyan-400 font-medium">Issue: {log.q}</p>
                  <p className="text-gray-300">{log.a}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSupportSubmit} className="space-y-2">
              <input 
                type="text" 
                value={supportQuery}
                onChange={(e) => setSupportQuery(e.target.value)}
                placeholder="Describe an issue or ask for help..."
                className="w-full bg-[#0d0f17] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <button type="submit" className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl text-xs transition">
                Submit Support Query
              </button>
            </form>
          </div>
        </div>
      )}

      {/* PRO UPGRADE & LIMIT MODAL */}
      {isProModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex justify-center items-center p-4">
          <div className="bg-[#121622] w-full max-w-sm rounded-3xl border border-amber-500/40 p-6 space-y-4 text-center">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-500/20">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Unlock Nexus Pro Filters</h2>
              <p className="text-xs text-gray-400 mt-1">Gender targeting & country filters require a active Pro subscription.</p>
            </div>
            <button onClick={() => setIsProModalOpen(false)} className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs rounded-xl transition">
              Upgrade to Pro - $9.99/mo
            </button>
            <button onClick={() => setIsProModalOpen(false)} className="text-xs text-gray-500 hover:text-gray-300">
              Maybe Later
            </button>
          </div>
        </div>
      )}

      {/* NETWORK STATS MODAL */}
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
              <div className="bg-[#0d0f17] p-3 round
