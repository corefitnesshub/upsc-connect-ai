import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Brain, Target, ArrowRight } from "lucide-react";

const stats = [
  { value: "12,847", label: "Active Aspirants" },
  { value: "94.3%", label: "Completion Rate" },
  { value: "1,240+", label: "Study Circles" },
  { value: "47", label: "UPSC Selections" },
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="max-w-xl">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-sm border border-border bg-surface-alt px-3 py-1 text-xs font-medium tracking-wide uppercase text-muted-foreground">
                <Brain className="h-3.5 w-3.5 text-accent" />
                AI-Powered UPSC Preparation
              </span>
            </div>

            <h1 className="mt-6 font-display text-4xl font-800 leading-[1.08] tracking-tight md:text-5xl lg:text-6xl animate-fade-up delay-100">
              Crack UPSC with
              <span className="block text-accent"> Discipline & Intelligence</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground animate-fade-up delay-200 max-w-[55ch]">
              India's most structured IAS/IPS preparation platform. Combine AI tutoring, 
              peer study circles, and expert mentorship to build consistency and master answer writing.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 animate-fade-up delay-300">
              <Button variant="hero" size="xl" asChild>
                <Link to="/signup">
                  Begin Your Journey
                  <ArrowRight className="ml-1 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <Link to="#features">Explore Platform</Link>
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-6 animate-fade-up delay-400">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4 text-accent" />
                Group Learning
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Brain className="h-4 w-4 text-accent" />
                AI Tutor 24/7
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Target className="h-4 w-4 text-accent" />
                Mock Tests
              </div>
            </div>
          </div>

          {/* Right: Dashboard Preview Card */}
          <div className="animate-fade-up delay-300">
            <div className="rounded-lg border border-border bg-card p-6 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-sm font-600 uppercase tracking-wide text-muted-foreground">
                  Today's Progress
                </h3>
                <span className="font-mono-data text-xs text-accent">Day 127</span>
              </div>

              {/* Mini progress bars */}
              <div className="space-y-3">
                {[
                  { subject: "Indian Polity", progress: 78, color: "bg-accent" },
                  { subject: "Modern History", progress: 62, color: "bg-primary" },
                  { subject: "Geography", progress: 45, color: "bg-success" },
                  { subject: "Economy", progress: 33, color: "bg-warning" },
                ].map((item) => (
                  <div key={item.subject}>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs font-medium">{item.subject}</span>
                      <span className="font-mono-data text-xs text-muted-foreground">{item.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-secondary">
                      <div
                        className={`h-full rounded-full ${item.color} transition-all duration-700`}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-sm bg-surface-alt p-3">
                  <p className="font-mono-data text-2xl font-bold text-foreground">8.2</p>
                  <p className="text-xs text-muted-foreground">Avg Answer Score</p>
                </div>
                <div className="rounded-sm bg-surface-alt p-3">
                  <p className="font-mono-data text-2xl font-bold text-foreground">342</p>
                  <p className="text-xs text-muted-foreground">MCQs This Week</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-6 border-t border-border pt-10 md:grid-cols-4 animate-fade-up delay-500">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-mono-data text-3xl font-bold text-foreground animate-count-up">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
