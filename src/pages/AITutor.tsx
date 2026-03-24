import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import { Brain, Send, Sparkles, BookOpen, FileEdit, Target } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const quickPrompts = [
  { icon: BookOpen, label: "Explain Article 370", prompt: "Explain Article 370 and its abrogation in simple terms for UPSC preparation." },
  { icon: FileEdit, label: "Answer writing tips", prompt: "Give me tips for writing better answers in UPSC Mains GS papers." },
  { icon: Target, label: "Prelims strategy", prompt: "What is the best strategy to score 110+ in UPSC Prelims?" },
  { icon: Sparkles, label: "Current affairs link", prompt: "How do I link current affairs with static topics in UPSC Mains answers?" },
];

const AITutor = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId] = useState(() => crypto.randomUUID());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;
    if (!user) { toast.error("Please sign in to use the AI Tutor"); return; }

    const userMsg: Msg = { role: "user", content: messageText.trim() };
    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setInput("");
    setIsLoading(true);

    // Save user message
    await supabase.from("chat_messages").insert({
      user_id: user.id, conversation_id: conversationId, role: "user", content: userMsg.content,
    });

    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-tutor`;
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: allMessages }),
      });

      if (resp.status === 429) { toast.error("Rate limit reached. Please wait a moment."); setIsLoading(false); return; }
      if (resp.status === 402) { toast.error("AI usage limit reached."); setIsLoading(false); return; }
      if (!resp.ok || !resp.body) { toast.error("Failed to get AI response"); setIsLoading(false); return; }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let assistantSoFar = "";
      let textBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "" || !line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantSoFar += content;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
                return [...prev, { role: "assistant", content: assistantSoFar }];
              });
            }
          } catch { textBuffer = line + "\n" + textBuffer; break; }
        }
      }

      // Save assistant message
      if (assistantSoFar) {
        await supabase.from("chat_messages").insert({
          user_id: user.id, conversation_id: conversationId, role: "assistant", content: assistantSoFar,
        });
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col container max-w-4xl py-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <h1 className="font-display text-2xl font-bold flex items-center gap-2">
            <Brain className="h-6 w-6 text-accent" /> AI Tutor
          </h1>
          <p className="text-sm text-muted-foreground">Your 24/7 UPSC doubt-solving companion</p>
        </motion.div>

        {/* Chat area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto rounded-lg border border-border bg-card p-4 mb-4 min-h-[400px] max-h-[60vh]">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Brain className="h-16 w-16 text-accent/30 mb-4" />
              <h2 className="font-display text-lg font-semibold mb-2">Ask me anything about UPSC</h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-md">
                I can explain concepts, help with answer writing, suggest study strategies, and solve your doubts.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
                {quickPrompts.map((qp) => (
                  <button key={qp.label} onClick={() => sendMessage(qp.prompt)}
                    className="flex items-center gap-2 p-3 rounded-lg border border-border text-left text-sm hover:border-accent/30 hover:bg-accent/5 transition-all">
                    <qp.icon className="h-4 w-4 text-accent shrink-0" />
                    <span>{qp.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-lg px-4 py-3 ${
                    msg.role === "user" ? "bg-accent text-accent-foreground" : "bg-muted"
                  }`}>
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm">{msg.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg px-4 py-3">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-2 w-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-2 w-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Ask about any UPSC topic..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
            disabled={isLoading}
            className="flex-1"
          />
          <Button variant="hero" onClick={() => sendMessage(input)} disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AITutor;
