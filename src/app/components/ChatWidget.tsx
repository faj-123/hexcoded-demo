"use client";

import { useState, useEffect } from "react";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

type Message = {
  sender: "bot" | "user";
  text: string;
};

const CAL_LINK =
  "https://cal.com/fajeela-sahul-zzapie/hexcoded-demo";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "👋 Hi! I'm Hex Guide, your AI studio assistant. Ask me about HexCoded or say 'Book a demo'.",
    },
  ]);

  // Speak replies
  function speak(text: string) {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  }

  // Voice Input
  function startListening() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setListening(true);
    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };

    recognition.onend = () => setListening(false);
  }

  // AI Responses
  function getReply(question: string) {
    const q = question.toLowerCase().trim();

    // Greetings
    if (["hi", "hello", "hey", "hii"].includes(q))
      return "Hello! 👋 Welcome to HexCoded. How can I help you today?";

    if (q.includes("good morning"))
      return "Good morning! ☀️ I hope you're having a wonderful day. How can I help you with HexCoded?";

    if (q.includes("good afternoon"))
      return "Good afternoon! 😊 I'm here to answer any questions about HexCoded.";

    if (q.includes("good evening"))
      return "Good evening! 🌆 Welcome to HexCoded. How may I assist you?";

    if (q.includes("good night"))
      return "Good night! 🌙 Thanks for visiting HexCoded. Have a wonderful evening!";

    // Small talk
    if (q.includes("how are you"))
      return "I'm doing great! 😊 I'm here to help you explore HexCoded and its AI filmmaking workflow.";

    if (q.includes("who are you"))
      return "I'm Hex Guide, the AI assistant for HexCoded. I can explain the platform and help you schedule a live demo.";

    if (q.includes("thank"))
      return "You're very welcome! If you'd like, I can also help you book a live demo.";

    if (q === "bye" || q.includes("goodbye"))
      return "Goodbye! 👋 Have a fantastic day, and thanks for exploring HexCoded.";

    // HexCoded
    if (
      q.includes("what is hexcoded") ||
      q.includes("about hexcoded") ||
      q.includes("what does hexcoded do")
    ) {
      return "HexCoded is an AI studio that creates short dramas, vertical series and short films while maintaining character and visual consistency across an entire season.";
    }

    if (
      q.includes("character consistency") ||
      q.includes("same character") ||
      q.includes("consistent character")
    ) {
      return "Character consistency means keeping the same face, hairstyle, wardrobe and visual identity throughout every episode of a series.";
    }

    if (
      q.includes("who is it for") ||
      q.includes("studio") ||
      q.includes("filmmaker") ||
      q.includes("editor")
    ) {
      return "HexCoded is built for studios, AI filmmakers, editors and content teams producing long-form content.";
    }

    if (
      q.includes("short drama") ||
      q.includes("vertical series") ||
      q.includes("short film")
    ) {
      return "HexCoded specializes in AI-generated short dramas, vertical series and short films designed for episodic storytelling.";
    }

    // Competitors
    if (
      q.includes("ltx") ||
      q.includes("openart") ||
      q.includes("magnific") ||
      q.includes("imagineart")
    ) {
      return "HexCoded is often compared with those platforms. Detailed comparisons are demonstrated during the live demo.";
    }

    // Pricing
    if (
      q.includes("price") ||
      q.includes("pricing") ||
      q.includes("cost")
    ) {
      return "Pricing is discussed only during the live demo with the HexCoded team.";
    }

    // Demo Booking
    if (
      q.includes("book") ||
      q.includes("demo") ||
      q.includes("schedule") ||
      q.includes("sales") ||
      q.includes("talk to person")
    ) {
      window.open(CAL_LINK, "_blank");

      return "Perfect! I've opened the HexCoded demo calendar. Please choose a convenient time for your meeting.";
    }

    // Default
    return "I'd love to help! You can ask me about HexCoded, AI series production, character consistency, studio workflow, or booking a live demo.";
  }

  function sendMessage() {
    if (!input.trim()) return;

    const userMessage: Message = {
      sender: "user",
      text: input,
    };

    const botReply = getReply(input);

    const botMessage: Message = {
      sender: "bot",
      text: botReply,
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);

    speak(botReply);

    setInput("");
  }

  useEffect(() => {
    if (!input) return;
  }, [input]);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400 text-2xl font-bold text-black shadow-2xl transition hover:scale-110"
      >
        ✦
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[520px] w-[350px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#111216] shadow-2xl">

          {/* Header */}
          <div className="flex items-center justify-between bg-yellow-400 p-4 text-black">
            <div>
              <h2 className="font-bold">Hex Guide</h2>
              <p className="text-xs">AI Studio Assistant</p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-xl font-bold hover:opacity-70"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-6 ${
                  msg.sender === "user"
                    ? "ml-auto bg-yellow-400 text-black"
                    : "bg-zinc-800 text-white"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-zinc-700 p-3">
            <div className="flex gap-2">

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && sendMessage()
                }
                placeholder="Type or use the mic..."
                className="flex-1 rounded-xl bg-zinc-800 px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-500"
              />

              {/* Mic */}
              <button
                onClick={startListening}
                className={`rounded-xl px-3 text-xl ${
                  listening
                    ? "bg-red-500 text-white"
                    : "bg-zinc-700 text-white"
                }`}
                title="Voice Input"
              >
                🎤
              </button>

              {/* Send */}
              <button
                onClick={sendMessage}
                className="rounded-xl bg-yellow-400 px-4 font-bold text-black"
              >
                Send
              </button>
            </div>

            <p className="mt-2 text-center text-xs text-zinc-500">
              {listening
                ? "Listening..."
                : "Voice input & AI voice enabled"}
            </p>
          </div>
        </div>
      )}
    </>
  );
}