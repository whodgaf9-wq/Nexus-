import React, { useState } from "react";
import {
  Mic, MicOff, Video, VideoOff, ScreenShare, ScreenShareOff,
  ShieldCheck, HelpCircle, SkipForward, Flag, Ban, PhoneOff,
  SwitchCamera, Globe, Gamepad2, RefreshCw, Bot, Mic as MicIcon,
  Sparkles, Lock, Send, X, Check
} from "lucide-react";

const MATCH_GENDERS = ["Any Gender", "Female", "Male", "Non-Binary"];
const MATCH_LANGUAGES = ["English", "Spanish", "French", "German", "Japanese", "Mandarin", "Hindi"];

const ICEBREAKERS = [
  "What's the best meal you've had this month?",
  "What song is currently stuck in your head?",
  "If you could teleport anywhere right now, where would you go?",
  "What is your favorite late-night productivity habit?"
];

function NexusLogo({ size = 32 }) {
  return (
    <div className="flex items-center gap-2.5 cursor-pointer select-none">
      <div 
        className="relative flex items-center justify-center rounded-xl font-mono font-extrabold text-white shadow-lg"
        style={{
          width: size,
          height: size,
          background: "linear-gradient(135deg, #7C8CFF 0%, #40E0C4 100%)",
          boxShadow: "0 4px 20px rgba(124, 140, 255, 0.35)"
        }}
      >
        <div className="absolute inset-[2px] rounded-[10px] bg-[#0A0D14] flex items-center justify-center">
          <span className="bg-gradient-to-r from-[#7C8CFF] to-[#40E0C4] bg-clip-text text-transparent text-sm font-black tracking-tighter">
            N
          </span>
        </div>
      </div>
      <span className="font-['Space_Grotesk'] font-bold text-lg tracking-tight text-white">
        Nexus
      </span>
    </div>
  );
}

function TicTacToeGame() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return squares.includes(null) ? null : "Draw";
  };

  const winner = calculateWinner(board);

  const handleClick = (i) => {
    if (board[i] || winner) return;
    const nextBoard = board.slice();
    nextBoard[i] = xIsNext ? "X" : "O";
    setBoard(nextBoard);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md max-w-xs w-full mx-auto text-center shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono text-[#40E0C4] uppercase tracking-wider flex items-center gap-1.5 font-bold">
          <Gamepad2 size={14} /> Nexus Arena
        </span>
        <button onClick={resetGame} className="text-xs text-white/60 hover:text-white flex items-center gap-1">
          <RefreshCw size={12} /> Reset
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            className="h-16 rounded-xl border border-white/10 bg-black/40 text-2xl font-bold font-mono text-white flex items-center justify-center"
          >
            <span className={cell === "X" ? "text-[#7C8CFF]" : cell === "O" ? "text-[#40E0C4]" : ""}>{cell}</span>
          </button>
        ))}
      </div>
      <p className="text-xs font-medium text-white/80 font-mono">
        {winner ? (winner === "Draw" ? "🤝 Game Ended in a Draw!" : `🎉 Winner: ${winner}`) : `Turn: ${xIsNext ? "X" : "O"}`}
      </p>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("meet");
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isFacingUser, setIsFacingUser] = useState(true);

  const [smartGrammar, setSmartGrammar] = useState(true);
  const [autoTranslate, setAutoTranslate] = useState(false);
  const [voiceFx, setVoiceFx] = useState("Off");
  const [virtualBg, setVirtualBg] = useState("Blur");

  const [targetGender, setTargetGender] = useState("Any Gender");
  const [targetLang, setTargetLang] = useState("English");
  const [icebreakerIdx, setIcebreakerIdx] = useState(0);

  const [bugModalOpen, setBugModalOpen] = useState(false);
  const [bugDescription, setBugDescription] = useState("");
  const [bugSubmitted, setBugSubmitted] = useState(false);

  const [messages, setMessages] = useState([
    { id: 1, author: "System", text: "🔒 E2EE Session Initialized.", time: "10:00", system: true },
    { id: 2, author: "A.I. Partner", text: "Welcome to Nexus! I am your human-like AI companion. How can I assist you?", time: "10:01", mine: false }
  ]);
  const [inputMsg, setInputMsg] = useState("");

  const handleSendMessage = () => {
    if (!inputMsg.trim()) return;

    let processedMsg = inputMsg;
    if (smartGrammar && processedMsg.toLowerCase() === "he go to store") {
      processedMsg = "He goes to the store.";
    }

    const newMsg = {
      id: Date.now(),
      author: "You",
      text: processedMsg,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      mine: true
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputMsg("");

    if (autoTranslate) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            author: "Nexus Neural Engine",
            text: `🌐 [Translated to ${targetLang}]:${processedMsg}`,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            system: true
          }
        ]);
      }, 500);
    }
  };

  const handleReportIssue = (e) => {
    e.preventDefault();
    if (!bugDescription.trim()) return;
    setBugSubmitted(true);
    setTimeout(() => {
      setBugSubmitted(false);
      setBugDescription("");
      setBugModalOpen(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen w-full bg-[#0A0D14] text-[#F3F4F8] font-sans flex flex-col">
      <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-3.5 border-b border-white/10 bg-[#0A0D14]/80 backdrop-blur-xl">
        <NexusLogo />

        <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
          {[
            ["meet", "Video Room"],
            ["partner", "AI Voice Partner"],
            ["random", "Matchmaking"],
            ["games", "Interactive Arena"]
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium ${
                activeTab === id
                  ? "bg-gradient-to-r from-[#7C8CFF] to-[#40E0C4] text-[#0A0D14] font-semibold"
                  : "text-white/70"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <ShieldCheck size={14} /> E2EE Encrypted
          </div>

          <button
            onClick={() => setBugModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-white/90"
          >
            <HelpCircle size={14} className="text-[#40E0C4]" /> Support AI
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-4">
          {activeTab === "meet" && (
            <div className="relative rounded-3xl overflow-hidden aspect-video bg-gradient-to-br from-[#171B26] to-[#0F1219] border border-white/10 flex flex-col items-center justify-center">
              {isVideoOn ? (
                <div className="relative w-32 h-32 rounded-full bg-gradient-to-tr from-[#7C8CFF] to-[#40E0C4] p-1 animate-pulse">
                  <div className="w-full h-full rounded-full bg-[#0F1219] flex items-center justify-center font-bold text-2xl text-white">
                    YOU
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-white/40">
                  <VideoOff size={48} />
                  <span className="text-xs font-mono">Camera Muted</span>
                </div>
              )}

              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>WebRTC 4K | 12ms</span>
              </div>

              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button className="p-2 rounded-xl bg-black/60 border border-white/10 text-white/80">
                  <SkipForward size={14} />
                </button>
                <button className="p-2 rounded-xl bg-black/60 border border-white/10 text-red-400">
                  <Flag size={14} />
                </button>
                <button className="p-2 rounded-xl bg-black/60 border border-white/10 text-red-400">
                  <Ban size={14} />
                </button>
              </div>

              <div className="absolute bottom-4 flex items-center gap-3 bg-black/70 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-white/10">
                <button onClick={() => setIsMicOn(!isMicOn)} className="p-2.5 rounded-xl bg-white/10 text-white">
                  {isMicOn ? <Mic size={18} /> : <MicOff size={18} />}
                </button>
                <button onClick={() => setIsVideoOn(!isVideoOn)} className="p-2.5 rounded-xl bg-white/10 text-white">
                  {isVideoOn ? <Video size={18} /> : <VideoOff size={18} />}
                </button>
                <button onClick={() => setIsScreenSharing(!isScreenSharing)} className="p-2.5 rounded-xl bg-white/10 text-white">
                  {isScreenSharing ? <ScreenShareOff size={18} /> : <ScreenShare size={18} />}
                </button>
                <button onClick={() => setIsFacingUser(!isFacingUser)} className="p-2.5 rounded-xl bg-white/10 text-white">
                  <SwitchCamera size={18} />
                </button>
                <button className="p-2.5 rounded-xl bg-red-500 text-white">
                  <PhoneOff size={18} />
                </button>
              </div>
            </div>
          )}

          {activeTab === "partner" && (
            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-8 flex flex-col items-center text-center justify-center min-h-[400px]">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#7C8CFF] to-[#40E0C4] flex items-center justify-center shadow-2xl animate-pulse mb-6">
                <Bot size={44} className="text-[#0A0D14]" />
              </div>
              <h2 className="font-['Space_Grotesk'] text-2xl font-bold mb-2">Nexus Natural AI Companion</h2>
              <button className="px-6 py-3 rounded-2xl font-semibold text-xs text-[#0A0D14] bg-gradient-to-r from-[#7C8CFF] to-[#40E0C4] flex items-center gap-2">
                <MicIcon size={16} /> Start Duplex Voice Stream
              </button>
            </div>
          )}

          {activeTab === "random" && (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 flex flex-col gap-5">
              <h3 className="text-lg font-bold font-['Space_Grotesk'] flex items-center gap-2">
                <Globe size={18} className="text-[#40E0C4]" /> Matchmaking Preferences
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/60 mb-1 block">Gender Preference</label>
                  <select value={targetGender} onChange={(e) => setTargetGender(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white">
                    {MATCH_GENDERS.map((g) => <option key={g} value={g} className="bg-[#0A0D14]">{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-white/60 mb-1 block">Language Filter</label>
                  <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white">
                    {MATCH_LANGUAGES.map((l) => <option key={l} value={l} className="bg-[#0A0D14]">{l}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "games" && (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 flex flex-col items-center">
              <TicTacToeGame />
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 flex flex-col h-[500px]">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock size={16} className="text-[#40E0C4]" />
              <h3 className="font-bold text-xs uppercase font-mono">Encrypted Chat</h3>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((m) => (
              <div key={m.id} className={`flex flex-col ${m.mine ? "items-end" : "items-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs ${m.mine ? "bg-gradient-to-r from-[#7C8CFF] to-[#40E0C4] text-[#0A0D14]" : "bg-white/10 text-white"}`}>
                  <p>{m.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type message..."
              className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
            />
            <button onClick={handleSendMessage} className="p-2 rounded-xl bg-gradient-to-r from-[#7C8CFF] to-[#40E0C4] text-[#0A0D14]">
              <Send size={16} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
      }
                         
