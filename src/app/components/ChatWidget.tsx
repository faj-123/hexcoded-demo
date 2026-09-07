"use client";

import { useState } from "react";

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
  const [loading, setLoading] = useState(false);

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

  // Send message to OpenAI through our secure Vercel API
  async function sendMessage() {
    const question = input.trim();

    if (!question || loading) return;

    const userMessage: Message = {
      sender: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Open demo calendar for booking requests
    const q = question.toLowerCase();

    if (
      q.includes("book") ||
      q.includes("demo") ||
      q.includes("schedule") ||
      q.includes("sales") ||
      q.includes("talk to person")
    ) {
      window.open(CAL_LINK, "_blank");

      const botReply =
        "Perfect! I've opened the HexCoded demo calendar. Please choose a convenient time for your meeting.";

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: botReply,
        },
      ]);

      speak(botReply);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: question,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      const botReply = data.reply;

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: botReply,
        },
      ]);

      speak(botReply);
    } catch (error) {
      console.error("Chat error:", error);

      const errorMessage =
        "Sorry, I'm having trouble connecting right now. Please try again.";

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: errorMessage,
        },
      ]);

      speak(errorMessage);
    } finally {
      setLoading(false);
    }
  }

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

            {loading && (
              <div className="max-w-[85%] rounded-2xl bg-zinc-800 px-3 py-2 text-sm text-white">
                Thinking... 🤖
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-zinc-700 p-3">
            <div className="flex gap-2">

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                placeholder="Type or use the mic..."
                disabled={loading}
                className="flex-1 rounded-xl bg-zinc-800 px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-500"
              />

              {/* Mic */}
              <button
                onClick={startListening}
                disabled={loading}
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
                disabled={loading}
                className="rounded-xl bg-yellow-400 px-4 font-bold text-black"
              >
                Send
              </button>
            </div>

            <p className="mt-2 text-center text-xs text-zinc-500">
              {listening
                ? "Listening..."
                : loading
                  ? "Hex Guide is thinking..."
                  : "Voice input & AI voice enabled"}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
