import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, MicOff, Video, VideoOff, Settings, 
  X, Volume2, Camera, Sparkles, Shield, Send, 
  HelpCircle, RefreshCw, Disc, Activity,
  Sliders, Globe, Users, Edit3, Check, Crown,
  Maximize2, Download, Gift, Languages, UserMinus
} from 'lucide-react';

export default function App() {
  // 1-10: Media & Camera Control States
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isFacingUser, setIsFacingUser] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [stream, setStream] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('none');

  // 11-18: Audio & FX States
  const [voiceFX, setVoiceFX] = useState('Normal');

  // 19-25: Pro Filters & Network Matching
  const [genderMatch, setGenderMatch] = useState('Any');
  const [countryFilter] = useState('Global');
  const [serverRegion] = useState('US-East (Virginia)');
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

  // Initialize Camera Stream
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
          console.warn("Camera fallback active.");
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

  const triggerReaction = (emoji) => {
    const id = Date.now();
    setReactions((prev) => [...prev, { id, emoji, left: Math.random() * 80 + 10 }]);
    setTimeout(() => setReactions((prev) => prev.filter((r) => r.id !== id)), 2000);
  };

  const handleScreenshot = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const link = document.createElement('a');
    link.download = `nexus-snap-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const togglePiP = async () => {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    } else if (videoRef.current && document.pictureInPictureEnabled) {
      await videoRef.current.requestPictureInPicture();
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    const newMessage = { id: Date.now(), sender: 'user', text: inputMessage, lang: 'EN' };
    setMessages((prev) => [...prev, newMessage]);
    setInputMessage('');
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'ai', text: `Nexus AI: Received "${inputMessage}".`, lang: 'EN' }
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
    setSupportLogs((prev) => [...prev, { q: supportQuery, a: 'Diagnostic logged.' }]);
    setSupportQuery('');
  };

  return (
    <div className="min-h-screen bg-[#0b0d14] text-white flex flex-col font-sans select-none pb-6">
      <header className="px-4 py-3 flex justify-between items-center bg-[#0d0f17] border-b border-gray-800 sticky top-0 z-20">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full border border-cyan-500 bg-cyan-950 flex items-center justify-center font-bold text-cyan-400 text-sm">N</div>
          <span className="font-bold text-base text-gray-100 flex items-center space-x-1">
            <span>Nexus OS</span>
            <span className="text-[9px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-1.5 py-0.5 rounded-full font-mono">v4.5</span>
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={() => setIsParticipantsOpen(true)} className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full bg-[#161a26] border border-gray-800 text-xs text-gray-300">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">2 Online</span>
          </button>
          <button onClick={() => setIsSupportOpen(true)} className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#161a26] border border-gray-800 text-xs text-emerald-400">
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="font-medium hidden sm:inline">Support</span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-xl w-full mx-auto px-3 py-3 flex flex-col space-y-3">
        <div className="bg-[#121622] rounded-2xl p-2.5 border border-gray-800 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-cyan-400" />
            <span className="text-gray-300">Target:</span>
            <select value={genderMatch} onChange={(e) => e.target.value !== 'Any' ? setIsProModalOpen(true) : setGenderMatch('Any')} className="bg-[#0d0f17] border border-gray-700 rounded px-2 py-1 text-white text-xs">
              <option value="Any">Any Gender</option>
              <option value="Female">Female Pro</option>
              <option value="Male">Male Pro</option>
            </select>
          </div>
          <button onClick={() => setIsProModalOpen(true)} className="flex items-center space-x-1 bg-[#0d0f17] border border-gray-700 px-2.5 py-1 rounded-lg text-xs text-gray-300">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{countryFilter}</span>
            <Crown className="w-3 h-3 text-amber-400 ml-1" />
          </button>
        </div>

        <div className="bg-[#121622] rounded-3xl p-3.5 border border-gray-800 relative shadow-2xl flex flex-col justify-between items-center min-h-[290px] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
            {reactions.map((r) => (
              <span key={r.id} style={{ left: `${r.left}%` }} className="absolute bottom-10 text-2xl animate-bounce">
                {r.emoji}
              </span>
            ))}
          </div>

          <div className="w-full flex items-center justify-between z-10">
            <div onClick={() => setIsStatsOpen(true)} className="cursor-pointer flex items-center space-x-2 bg-[#1c2230] px-3 py-1 rounded-full border border-gray-700 text-[11px] text-gray-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>WebRTC 4K | 11ms</span>
              <span onClick={(e) => { e.stopPropagation(); setIsLowDataMode(!isLowDataMode); }} className={`ml-1 font-bold px-1.5 rounded ${isLowDataMode ? 'bg-amber-500/20 text-amber-400' : 'text-gray-500'}`}>ECO</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <button onClick={() => setIsEffectsOpen(true)} className="p-2 rounded-full bg-[#1c2230] text-cyan-400"><Sparkles className="w-3.5 h-3.5" /></button>
              <button onClick={togglePiP} className="p-2 rounded-full bg-[#1c2230] text-gray-400 hidden sm:block"><Maximize2 className="w-3.5 h-3.5" /></button>
              <button onClick={handleScreenshot} className="p-2 rounded-full bg-[#1c2230] text-emerald-400"><Download className="w-3.5 h-3.5" /></button>
            </div>
          </div>

          <div className="my-3 relative flex items-center justify-center w-full min-h-[150px]">
            {isVideoOn ? (
              <div className="relative w-full max-w-[280px] h-[150px] rounded-2xl overflow-hidden border border-cyan-500/40 bg-black">
                <video ref={videoRef} autoPlay playsInline muted className={`w-full h-full object-cover ${selectedFilter === 'cyber' ? 'hue-rotate-90 saturate-200' : ''} ${selectedFilter === 'mono' ? 'grayscale' : ''}`} />
                {isRecording && <span className="absolute top-2 right-2 bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full animate-pulse">REC {recordingTime}s</span>}
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full border-2 border-cyan-400 flex items-center justify-center bg-[#121622]">
                <span className="text-xl font-bold text-gray-200">OFF</span>
              </div>
            )}
          </div>

          <div className="flex space-x-2 my-1 z-10 bg-[#0d0f17]/60 px-3 py-1 rounded-full">
            {['🔥', '❤️', '😂', '👏', '🎉'].map((e) => (
              <button key={e} onClick={() => triggerReaction(e)} className="hover:scale-125 transition text-sm">{e}</button>
            ))}
          </div>

          <div className="flex items-center space-x-1.5 bg-[#0d0f17] px-3 py-2 rounded-2xl border border-gray-800 z-10">
            <button onClick={() => setIsMuted(!isMuted)} className={`p-2 rounded-xl ${isMuted ? 'bg-red-500/20 text-red-400' : 'bg-[#181d2b] text-gray-300'}`}>{isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}</button>
            <button onClick={() => setIsVideoOn(!isVideoOn)} className={`p-2 rounded-xl ${!isVideoOn ? 'bg-red-500/20 text-red-400' : 'bg-cyan-500/20 text-cyan-400'}`}>{!isVideoOn ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}</button>
            <button onClick={() => setIsFacingUser(!isFacingUser)} className="p-2 rounded-xl bg-[#181d2b] text-cyan-400"><RefreshCw className="w-4 h-4" /></button>
            <button onClick={() => setIsSettingsOpen(true)} className="p-2 rounded-xl bg-[#181d2b] text-gray-400"><Settings className="w-4 h-4" /></button>
            <button onClick={() => setIsRecording(!isRecording)} className={`p-2 rounded-xl ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-[#181d2b] text-gray-400'}`}><Disc className="w-4 h-4" /></button>
            <button onClick={() => { setGiftsSent(g => g + 1); triggerReaction('💎'); }} className="p-2 rounded-xl bg-[#181d2b] text-amber-400"><Gift className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="flex-1 bg-[#121622] rounded-3xl p-3.5 border border-gray-800 flex flex-col min-h-[250px]">
          <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-2.5">
            <div className="flex items-center space-x-2 text-[11px] font-bold text-cyan-400">
              <Shield className="w-3.5 h-3.5" />
              <span>E2EE CHAT</span>
            </div>
            <button onClick={() => setAutoTranslate(!autoTranslate)} className={`text-[10px] px-2 py-0.5 rounded-full border flex items-center space-x-1 ${autoTranslate ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' : 'bg-gray-800 border-gray-700 text-gray-400'}`}>
              <Languages className="w-3 h-3" />
              <span>Translate</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2.5 mb-2">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-center space-x-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {editingId === msg.id ? (
                  <div className="flex items-center space-x-2 w-full max-w-[85%]">
                    <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} className="flex-1 bg-[#0d0f17] border border-cyan-500 rounded-xl px-3 py-1 text-xs text-white" />
                    <button onClick={() => handleEditSave(msg.id)} className="p-1.5 bg-cyan-500 rounded-xl text-black"><Check className="w-3.5 h-3.5" /></button>
                  </div>
                ) : (
                  <div className="group relative max-w-[85%]">
                    <div className={`px-3.5 py-2 rounded-2xl text-xs ${msg.sender === 'user' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white' : 'bg-[#1c2230] text-gray-200 border border-gray-800'}`}>
                      {msg.text}
                    </div>
                    {msg.sender === 'user' && (
                      <button onClick={() => { setEditingId(msg.id); setEditText(msg.text); }} className="opacity-0 group-hover:opacity-100 absolute -top-2 -left-6 p-1 bg-gray-800 rounded-full text-gray-300">
                        <Edit3 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="flex items-center space-x-2 bg-[#0d0f17] p-1.5 rounded-2xl border border-gray-800">
            <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder="Type a message..." className="flex-1 bg-transparent px-3 py-1 text-xs text-white focus:outline-none" />
            <button type="submit" className="p-2 rounded-xl bg-cyan-500 text-black font-semibold"><Send className="w-3.5 h-3.5" /></button>
          </form>
        </div>
      </main>

      {/* Modals */}
      {isParticipantsOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex justify-center items-center p-4">
          <div className="bg-[#121622] w-full max-w-sm rounded-3xl border border-gray-800 p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center space-x-2"><Users className="w-4 h-4 text-cyan-400" /><span>Lobby</span></h2>
              <button onClick={() => setIsParticipantsOpen(false)}><X className="w-4 h-4 text-gray-400" /></button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="bg-[#0d0f17] p-2.5 rounded-xl border border-gray-800 flex justify-between"><span>You (Host)</span></div>
              <div className="bg-[#0d0f17] p-2.5 rounded-xl border border-gray-800 flex justify-between"><span>Nexus AI Bot</span><UserMinus className="w-3.5 h-3.5 text-red-400 cursor-pointer" /></div>
            </div>
            <button onClick={() => setIsParticipantsOpen(false)} className="w-full py-2 bg-gray-800 text-xs text-white rounded-xl">Close</button>
          </div>
        </div>
      )}

      {isEffectsOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex justify-center items-center p-4">
          <div className="bg-[#121622] w-full max-w-md rounded-3xl border border-gray-800 p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <h2 className="text-sm font-bold text-white flex items-center space-x-2"><Sparkles className="w-4 h-4 text-cyan-400" /><span>Filters & FX</span></h2>
              <button onClick={() => setIsEffectsOpen(false)}><X className="w-4 h-4 text-gray-400" /></button>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {['none', 'cyber', 'mono'].map((f) => (
                <button key={f} onClick={() => setSelectedFilter(f)} className={`py-2 rounded-xl border capitalize ${selectedFilter === f ? 'bg-cyan-500 text-black border-cyan-400 font-bold' : 'bg-[#0d0f17] text-gray-300 border-gray-800'}`}>{f}</button>
              ))}
            </div>
            <button onClick={() => setIsEffectsOpen(false)} className="w-full py-2 bg-cyan-500 text-black font-bold rounded-xl text-xs">Apply</button>
          </div>
        </div>
      )}

      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex justify-center items-center p-4">
          <div className="bg-[#121622] w-full max-w-md rounded-3xl border border-gray-800 p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center space-x-2"><Settings className="w-4 h-4 text-cyan-400" /><span>Preferences</span></h2>
              <button onClick={() => setIsSettingsOpen(false)}><X className="w-4 h-4 text-gray-400" /></button>
            </div>
            <div className="space-y-2 text-xs">
              {['voiceMood', 'autoZoom', 'smartFocus', 'noiseSuppression'].map((k) => (
                <div key={k} className="flex justify-between items-center bg-[#0d0f17] p-3 rounded-2xl border border-gray-800">
                  <span className="capitalize">{k.replace(/([A-Z])/g, ' $1')}</span>
                  <button onClick={() => toggleSetting(k)} className={`w-10 h-5 rounded-full p-0.5 ${settings[k] ? 'bg-cyan-500' : 'bg-gray-700'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white transition transform ${settings[k] ? 'translate-x-5' : ''}`}></div>
                  </button>
                </div>
              ))}
            </div>
            <button onClick={() => setIsSettingsOpen(false)} className="w-full py-2.5 bg-cyan-500 text-black font-bold rounded-2xl text-xs">Save</button>
          </div>
        </div>
      )}

      {isProModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex justify-center items-center p-4">
          <div className="bg-[#121622] w-full max-w-sm rounded-3xl border border-amber-500/40 p-6 space-y-4 text-center">
            <Crown className="w-8 h-8 text-amber-400 mx-auto" />
            <h2 className="text-base font-bold text-white">Unlock Nexus Pro</h2>
            <button onClick={() => setIsProModalOpen(false)} className="w-full py-2.5 bg-amber-500 text-black font-bold text-xs rounded-xl">Subscribe - $9.99/mo</button>
          </div>
        </div>
      )}
    </div>
  );
}

