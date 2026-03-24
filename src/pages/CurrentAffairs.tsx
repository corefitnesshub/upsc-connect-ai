import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { Newspaper, Calendar, Tag, ChevronRight } from "lucide-react";
import { format } from "date-fns";

const categoryLabels: Record<string, string> = {
  polity: "Polity & Governance",
  economy: "Economy",
  environment: "Environment",
  science_tech: "Science & Tech",
  international: "International",
  social: "Social Issues",
  government_schemes: "Govt. Schemes",
};

const CurrentAffairs = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let query = supabase.from("current_affairs").select("*").order("published_date", { ascending: false });
    if (selectedCategory) query = query.eq("category", selectedCategory);
    query.then(({ data }) => { setArticles(data || []); setLoading(false); });
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold mb-2">Current Affairs</h1>
          <p className="text-muted-foreground mb-6">UPSC-focused daily news analysis and editorial summaries</p>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1.5 rounded-sm text-xs font-medium transition-colors ${!selectedCategory ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
            All
          </button>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button key={key} onClick={() => setSelectedCategory(key)}
              className={`px-3 py-1.5 rounded-sm text-xs font-medium transition-colors ${selectedCategory === key ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
              {label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-32 rounded-lg bg-muted animate-pulse" />)}</div>
        ) : articles.length === 0 ? (
          <div className="text-center py-16 rounded-lg border border-border bg-card">
            <Newspaper className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-display text-xl font-semibold mb-2">No Articles Yet</h2>
            <p className="text-muted-foreground">Check back soon for UPSC-focused current affairs.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {articles.map((article, i) => (
              <motion.div key={article.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="rounded-lg border border-border bg-card p-6 hover:border-accent/30 transition-all cursor-pointer group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-medium px-2 py-0.5 rounded-sm bg-accent/10 text-accent">
                        {categoryLabels[article.category] || article.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(article.published_date), "dd MMM yyyy")}
                      </span>
                      {article.source && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Tag className="h-3 w-3" />{article.source}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-accent transition-colors">{article.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{article.summary || article.content}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors shrink-0 mt-1" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentAffairs;
