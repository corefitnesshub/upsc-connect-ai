import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Clock, Target, FileEdit, ChevronRight, Lock } from "lucide-react";

const MockTests = () => {
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("mock_tests").select("*, subjects(name, color)").order("created_at", { ascending: false })
      .then(({ data }) => { setTests(data || []); setLoading(false); });
  }, []);

  const testTypes: Record<string, { label: string; icon: any }> = {
    prelims_full: { label: "Prelims Full Length", icon: Target },
    prelims_sectional: { label: "Sectional Test", icon: FileEdit },
    mains_gs: { label: "Mains GS", icon: FileEdit },
    csat: { label: "CSAT", icon: Target },
    essay: { label: "Essay", icon: FileEdit },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold mb-2">Mock Tests</h1>
          <p className="text-muted-foreground mb-8">Practice with UPSC-pattern tests and track your performance</p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Tests Available", value: tests.length.toString(), icon: Target },
            { label: "Free Tests", value: tests.filter(t => t.is_free).length.toString(), icon: FileEdit },
            { label: "Avg Duration", value: "120 min", icon: Clock },
            { label: "Total Questions", value: tests.reduce((a, t) => a + t.total_questions, 0).toString(), icon: Target },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="rounded-lg border border-border bg-card p-4">
              <s.icon className="h-5 w-5 text-accent mb-2" />
              <p className="font-mono-data text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1,2,3].map(i => <div key={i} className="h-48 rounded-lg bg-muted animate-pulse" />)}
          </div>
        ) : tests.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-16 rounded-lg border border-border bg-card">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-display text-xl font-semibold mb-2">Tests Coming Soon</h2>
            <p className="text-muted-foreground">Our team is preparing comprehensive mock tests for you.</p>
          </motion.div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tests.map((test, i) => (
              <motion.div key={test.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="rounded-lg border border-border bg-card p-6 hover:border-accent/30 transition-all hover:-translate-y-0.5">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-medium px-2 py-1 rounded-sm bg-accent/10 text-accent">
                    {testTypes[test.test_type]?.label || test.test_type}
                  </span>
                  {!test.is_free && <Lock className="h-4 w-4 text-muted-foreground" />}
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{test.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{test.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{test.duration_minutes} min</span>
                  <span>{test.total_questions} Qs</span>
                  <span>{test.total_marks} marks</span>
                </div>
                <Button variant={test.is_free ? "hero" : "outline"} size="sm" className="w-full">
                  {test.is_free ? "Start Test" : "Unlock"} <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MockTests;
