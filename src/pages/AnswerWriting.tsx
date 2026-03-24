import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { FileEdit, Send, Calendar, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { format } from "date-fns";

const AnswerWriting = () => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showModel, setShowModel] = useState<string | null>(null);

  useEffect(() => {
    supabase.from("answer_questions").select("*, subjects(name)").order("question_date", { ascending: false })
      .then(({ data }) => { setQuestions(data || []); setLoading(false); });
  }, []);

  const handleSubmit = async (questionId: string) => {
    if (!user) { toast.error("Please sign in to submit answers"); return; }
    if (!answerText.trim()) { toast.error("Please write your answer"); return; }
    setSubmitting(true);
    const { error } = await supabase.from("answer_submissions").insert({
      user_id: user.id,
      question_id: questionId,
      answer_text: answerText.trim(),
    });
    setSubmitting(false);
    if (error) toast.error(error.message);
    else { toast.success("Answer submitted!"); setAnswerText(""); setActiveQuestion(null); }
  };

  const wordCount = answerText.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold mb-2">Answer Writing Practice</h1>
          <p className="text-muted-foreground mb-8">Daily Mains questions with model answers — the key to UPSC success</p>
        </motion.div>

        {loading ? (
          <div className="space-y-4">{[1,2].map(i => <div key={i} className="h-40 rounded-lg bg-muted animate-pulse" />)}</div>
        ) : questions.length === 0 ? (
          <div className="text-center py-16 rounded-lg border border-border bg-card">
            <FileEdit className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-display text-xl font-semibold mb-2">Questions Coming Soon</h2>
            <p className="text-muted-foreground">Daily answer writing questions will appear here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {questions.map((q, i) => (
              <motion.div key={q.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="rounded-lg border border-border bg-card overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    {q.subjects?.name && (
                      <span className="text-xs font-medium px-2 py-0.5 rounded-sm bg-accent/10 text-accent">{q.subjects.name}</span>
                    )}
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />{format(new Date(q.question_date), "dd MMM yyyy")}
                    </span>
                    <span className="text-xs text-muted-foreground">{q.marks} marks · {q.word_limit} words</span>
                  </div>
                  <p className="text-base font-medium leading-relaxed">{q.question_text}</p>

                  <div className="flex gap-3 mt-4">
                    <Button variant={activeQuestion === q.id ? "outline" : "hero"} size="sm"
                      onClick={() => { setActiveQuestion(activeQuestion === q.id ? null : q.id); setAnswerText(""); }}>
                      <FileEdit className="mr-1 h-4 w-4" /> {activeQuestion === q.id ? "Cancel" : "Write Answer"}
                    </Button>
                    {q.model_answer && (
                      <Button variant="ghost" size="sm" onClick={() => setShowModel(showModel === q.id ? null : q.id)}>
                        <BookOpen className="mr-1 h-4 w-4" /> Model Answer
                        {showModel === q.id ? <ChevronUp className="ml-1 h-3 w-3" /> : <ChevronDown className="ml-1 h-3 w-3" />}
                      </Button>
                    )}
                  </div>
                </div>

                {activeQuestion === q.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="border-t border-border p-6 bg-muted/30">
                    <textarea
                      className="w-full min-h-[200px] p-4 rounded-lg border border-border bg-background text-sm resize-y focus:outline-none focus:ring-2 focus:ring-accent/50"
                      placeholder="Write your answer here... Focus on structure, keywords, and conclusion."
                      value={answerText}
                      onChange={(e) => setAnswerText(e.target.value)}
                    />
                    <div className="flex items-center justify-between mt-3">
                      <span className={`text-xs ${wordCount > q.word_limit ? "text-destructive" : "text-muted-foreground"}`}>
                        {wordCount}/{q.word_limit} words
                      </span>
                      <Button variant="hero" size="sm" onClick={() => handleSubmit(q.id)} disabled={submitting || !answerText.trim()}>
                        <Send className="mr-1 h-4 w-4" /> {submitting ? "Submitting..." : "Submit Answer"}
                      </Button>
                    </div>
                  </motion.div>
                )}

                {showModel === q.id && q.model_answer && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="border-t border-border p-6 bg-accent/5">
                    <h4 className="font-display text-sm font-semibold mb-3 text-accent">Model Answer</h4>
                    <div className="text-sm leading-relaxed whitespace-pre-line">{q.model_answer}</div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnswerWriting;
