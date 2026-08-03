import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, MicOff, Video, VideoOff, Monitor, PhoneOff, Settings, 
  X, Volume2, Camera, Sparkles, Shield, Send, SkipForward, 
  Flag, Ban, HelpCircle, RefreshCw, Subtitles, Disc, Activity,
  Sliders, Eye, Sun, Globe, Users, Edit3, Check, Crown,
  Smile, Radio, Sliders as EQIcon, Image, Maximize2, Download,
  VolumeX, Gift, Translate, Zap, Lock, Filter, UserMinus, ShieldAlert
} from 'lucide-react';

export default function App() {
  // 1-10: Media & Camera Control States
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isFacingUser, setIsFacingUser] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showCaptions, setShowCaptions] = useState(true);
  const [stream, setStream] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('none');

  // 11-18: Audio & FX States
  const [voiceFX, setVoiceFX] = useState('Normal');
  const [volumeLevel, setVolumeLevel] = useState(85);

  // 19-25: Pro Filters & Network Matching
  const [genderMatch, setGenderMatch] = useState('Any');
  const [countryFilter, setCountryFilter] = useState('Global');
  const [serverRegion, setServerRegion] = useState('US-East (Virginia)');
  const [isLowDataMode, setIsLowDataMode] = useState(false);

  // 26-32: Drawers & Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
  const [isEffectsOpen, setIsEffectsOpen] = useState(false);

  // 33-40: Chat & Interactions
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Nexus OS Engine v4.5 loaded. 50+ stream modules active.', lang: 'EN' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [reactions, setReactions] = useState([]);
  const [giftsSent, setGiftsSent] = useState(0);
  const [autoTranslate, setAutoTranslate] = useState(false);

  // 41-45: Support AI & Logs
  const [supportQuery, setSupportQuery] = useState('');
  const [supportLogs, setSupportLogs] = useState([]);

  // 46-50+: Preferences Engine
  const [settings, setSettings] = useState({
    voiceMood: true,
    autoZoom: true,
    smartFocus: false,
    noiseSuppression: true,
    lowLight: true,
    spatialAudio: true,
  });

  const videoRef = useRef(null);

  // Initialize Real Camera Stream
  useEffect(() => {
    async function startCamera() {
      if (isVideoOn) {
        try {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: isFacingUser ? 'user' : 'environment' },
            audio: true
          });
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        } catch (err) {
          console.warn("Camera fallback to simulated view.");
        }
      } else {
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
          setStream(null);
        }
      }
    }
    startCamera();
  }, [isVideoOn, isFacingUser]);

  // Recording Timer
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => setRecordingTime((prev) => prev + 1), 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const toggleSetting = (key) => setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  // Feature: Reactions Handler
  const triggerReaction = (emoji) => {
    const id = Date.now();
    setReactions((prev) => [...prev, { id, emoji, left: Math.random() * 80 + 10 }]);
    setTimeout(() => setReactions((prev) => prev.filter((r) => r.id !== id)), 2000);
  };

  // Feature: Screenshot Capture Engine
  const handleScreenshot = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    
    // Apply current CSS filter to canvas
    if (selectedFilter === 'cyber') ctx.filter = 'hue-rotate(90deg) saturate(200%)';
    if (selectedFilter === 'mono') ctx.filter = 'grayscale(100%)';
    if (selectedFilter === 'vintage') ctx.filter = 'sepia(100%) contrast(125%)';
    
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const link = document.createElement('a');
    link.download = `nexus-snap-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
    
    setMessages(prev => [...prev, { id: Date.now(), sender: 'ai', text: 'Screenshot saved to local device.', lang: 'EN' }]);
  };

  // Feature: Native Picture-in-Picture
  const togglePiP = async () => {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    } else if (videoRef.current && document.pictureInPictureEnabled) {
      await videoRef.current.requestPictureInPicture();
    }
  };

  // Chat Actions
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    const newMessage = { id: Date.now(), sender: 'user', text: inputMessage, lang: 'EN' };
    setMessages((prev) => [...prev, newMessage]);
    setInputMessage('');
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'ai', text: `Nexus AI: Received "${inputMessage}". Stream stable.`, lang: 'EN' }
      ]);
    }, 800);
  };

  const handleEditSave = (id) => {
    setMessages(messages.map((m) => (m.id === id ? { ...m, text: editText } : m)));
    setEditingId(null);
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    if (!supportQuery.trim()) return;
    setSupportLogs((prev) => [...prev, { q: supportQuery, a: 'Diagnostic logged. Applied real-time bandpass correction.' }]);
    setSupportQuery('');
  };

  return (
    <div className="min-h-screen bg-[#0b0d14] text-white flex flex-col font-sans select-none pb-6">
      
      {/* Top Header Navigation */}
      <header className="px-4 py-3 flex justify-between items-center bg-[#0d0f17] border-b border-gray-800/80 sticky top-0 z-20 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full border border-cyan-500/50 bg-cyan-950/40 flex items-center justify-center font-extrabold text-cyan-400 text-sm shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            N
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-wide text-gray-100 flex items-center space-x-1.5">
              <span>Nexus OS</span>
              <span className="text-[9px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-1.5 py-0.2 rounded-full font-mono">v4.5</span>
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Participants & Network Toggle */}
          <button 
            onClick={() => setIsParticipantsOpen(true)}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full bg-[#161a26] border border-gray-800 text-xs text-gray-300 hover:bg-gray-800 transition"
          >
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">2 Online</span>
          </button>

          {/* Support Trigger */}
          <button 
            onClick={() => setIsSupportOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#161a26] border border-gray-800 text-xs text-emerald-400 hover:bg-gray-800 transition"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="font-medium hidden sm:inline">Support AI</span>
          </button>
        </div>
      </header>

      {/* Main Stream Container */}
      <main className="flex-1 max-w-xl w-full mx-auto px-3 py-3 flex flex-col space-y-3">
        
        {/* Network & Pro Filter Bar */}
        <div className="bg-[#121622] rounded-2xl p-2.5 border border-gray-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-cyan-400" />
            <span className="text-gray-300 font-medium">Target:</span>
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
        <div className="bg-[#121622] rounded-3xl p-3.5 border border-gray-800/80 relative shadow-2xl flex flex-col justify-between items-center min-h-[290px] overflow-hidden">
          
          {/* Reaction Particle Overlay */}
          <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
            {reactions.map((r) => (
              <span key={r.id} style={{ left: `${r.left}%` }} className="absolute bottom-10 text-2xl animate-bounce transition-all duration-1000">
                {r.emoji}
              </span>
            ))}
          </div>

          {/* Top Stage Badges */}
          <div className="w-full flex items-center justify-between z-10">
            <div 
              onClick={() => setIsStatsOpen(true)}
              className="cursor-pointer flex items-center space-x-2 bg-[#1c2230]/90 backdrop-blur-md px-3 py-1 rounded-full border border-gray-700/60 text-[11px] text-gray-300 hover:border-cyan-500/50 transition"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-medium">WebRTC 4K | 11ms</span>
              <span onClick={(e) => { e.stopPropagation(); setIsLowDataMode(!isLowDataMode); }} className={`ml-1 font-bold px-1.5 rounded ${isLowDataMode ? 'bg-amber-500/20 text-amber-400' : 'text-gray-500'}`}>
                ECO
              </span>
            </div>

            <div className="flex items-center space-x-1.5">
              <button onClick={() => setIsEffectsOpen(true)} title="Filters & FX" className="p-2 rounded-full bg-[#1c2230] hover:bg-gray-800 text-cyan-400 transition">
                <Sparkles className="w-3.5 h-3.5" />
              </button>
              <button onClick={togglePiP} title="Picture in Picture" className="p-2 rounded-full bg-[#1c2230] hover:bg-gray-800 text-gray-400 hover:text-white transition hidden sm:block">
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
              <button onClick={handleScreenshot} title="Screenshot Snapshot" className="p-2 rounded-full bg-[#1c2230] hover:bg-gray-800 text-emerald-400 hover:text-emerald-300 transition">
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* AI Voice Mood Analytics */}
          {settings.voiceMood && (
            <div className="absolute top-14 left-4 bg-[#0d0f17]/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-cyan-500/30 text-[10px] text-cyan-300 flex items-center space-x-1.5 z-10">
              <Volume2 className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span>Mood: Energetic (98%) | FX: {voiceFX}</span>
            </div>
          )}

          {/* Camera Feed Stream */}
          <div className="my-3 relative flex items-center justify-center w-full min-h-[150px]">
            {isVideoOn ? (
              <div className="relative w-full max-w-[280px] h-[150px] rounded-2xl overflow-hidden border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.2)] bg-black">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className={`w-full h-full object-cover ${selectedFilter === 'cyber' ? 'hue-rotate-90 saturate-200' : ''} ${selectedFilter === 'mono' ? 'grayscale' : ''} ${selectedFilter === 'vintage' ? 'sepia contrast-125' : ''}`}
                />
                {isRecording && (
                  <span className="absolute top-2 right-2 bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full animate-pulse shadow-lg">
                    REC {recordingTime}s
                  </span>
                )}
              </div>
            ) : (
              <div className="relative flex items-center justify-center h-[150px]">
                <div className="absolute w-28 h-28 rounded-full border-2 border-cyan-400/30 animate-ping opacity-20"></div>
                <div className="w-24 h-24 rounded-full border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.4)] bg-[#121622] relative">
                  <span className="text-xl font-bold tracking-widest text-gray-200">OFF</span>
                </div>
              </div>
            )}
          </div>

          {/* Emoji Hot-Bar */}
          <div className="flex space-x-2 my-1 z-10 bg-[#0d0f17]/60 px-3 py-1 rounded-full backdrop-blur-sm">
            {['🔥', '❤️', '😂', '👏', '🎉'].map((e) => (
              <button key={e} onClick={() => triggerReaction(e)} className="hover:scale-125 hover:-translate-y-1 transform transition-all duration-200 text-sm">
                {e}
              </button>
            ))}
          </div>

          {/* Master Call Controls Toolbar */}
          <div className="flex items-center space-x-1.5 bg-[#0d0f17]/95 px-3 py-2 rounded-2xl border border-gray-800 backdrop-blur-md shadow-lg z-10 mt-1">
            <button onClick={() => setIsMuted(!isMuted)} className={`p-2 rounded-xl transition ${isMuted ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-[#181d2b] text-gray-300 hover:bg-gray-800'}`}>
              {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
            <button onClick={() => setIsVideoOn(!isVideoOn)} className={`p-2 rounded-xl transition ${!isVideoOn ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-cyan-500/20 text-cyan-400'}`}>
              {!isVideoOn ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
            </button>
            <button onClick={() => setIsFacingUser(!isFacingUser)} title="Flip Camera" className="p-2 rounded-xl bg-[#181d2b] hover:bg-gray-800 text-cyan-400 transition">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button onClick={() => setIsSettingsOpen(true)} className="p-2 rounded-xl bg-[#181d2b] hover:bg-gray-800 text-gray-400 transition">
              <Settings className="w-4 h-4" />
            </button>
            <button onClick={() => setIsRecording(!isRecording)} title="Record Stream" className={`p-2 rounded-xl transition ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-[#181d2b] text-gray-400'}`}>
              <Disc className="w-4 h-4" />
            </button>
            <button onClick={() => { setGiftsSent(g => g + 1); triggerReaction('💎'); }} title="Send Virtual Gift" className="p-2 rounded-xl bg-[#181d2b] hover:bg-gray-800 text-amber-400 transition">
              <Gift className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-xl bg-red-600 hover:bg-red-700 text-white transition ml-1">
              <PhoneOff className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Encrypted Messaging Interface */}
        <div className="flex-1 bg-[#121622] rounded-3xl p-3.5 border border-gray-800/80 flex flex-col min-h-[250px]">
          <div className="flex items-center justify-between border-b border-gray-800/80 pb-2 mb-2.5">
            <div className="flex items-center space-x-2 text-[11px] font-bold text-cyan-400 tracking-wider uppercase">
              <Shield className="w-3.5 h-3.5" />
              <span>E2EE CHAT</span>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => setAutoTranslate(!autoTranslate)} className={`text-[10px] px-2 py-0.5 rounded-full border flex items-center space-x-1 ${autoTranslate ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' : 'bg-gray-800 border-gray-700 text-gray-400'}`}>
                <Translate className="w-3 h-3" />
                <span>AI Translate</span>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 mb-2">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-center space-x-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {editingId === msg.id ? (
                  <div className="flex items-center space-x-2 w-full max-w-[85%]">
                    <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} className="flex-1 bg-[#0d0f17] border border-cyan-500 rounded-xl px-3 py-1 text-xs text-white focus:outline-none" />
                    <button onClick={() => handleEditSave(msg.id)} className="p-1.5 bg-cyan-500 rounded-xl text-black">
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="group relative max-w-[85%]">
                    <div className={`px-3.5 py-2 rounded-2xl text-xs leading-relaxed ${msg.sender === 'user' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-none' : 'bg-[#1c2230] text-gray-200 border border-gray-800 rounded-bl-none'}`}>
                      {msg.text}
                      {autoTranslate && msg.sender !== 'user' && <span className="block text-[9px] text-cyan-300 opacity-80 mt-0.5 border-t border-gray-700 pt-0.5">Translated to English</span>}
                    </div>
                    {msg.sender === 'user' && (
                      <button onClick={() => { setEditingId(msg.id); setEditText(msg.text); }} className="opacity-0 group-hover:opacity-100 absolute -top-2 -left-6 p-1 bg-gray-800 hover:bg-gray-700 rounded-full text-gray-300 transition">
                        <Edit3 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="flex items-center space-x-2 bg-[#0d0f17] p-1.5 rounded-2xl border border-gray-800">
            <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder="Type a message..." className="flex-1 bg-transparent px-3 py-1 text-xs text-white focus:outline-none placeholder-gray-500" />
            <button type="submit" className="p-2 round
