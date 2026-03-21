import {
  Users, Brain, FileEdit, BarChart3, BookOpen,
  Target, MessageSquare, Calendar, Sparkles, Shield,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Study Circles",
    description: "Small focused groups of 5–10 aspirants with daily targets and accountability tracking.",
  },
  {
    icon: Brain,
    title: "AI Tutor",
    description: "24/7 doubt solving with concept explanations in simple language and personalized study plans.",
  },
  {
    icon: FileEdit,
    title: "Answer Writing",
    description: "Daily Mains questions with AI evaluation on structure, content, and keywords. Peer review inside groups.",
  },
  {
    icon: Target,
    title: "Mock Tests",
    description: "Full-length Prelims tests, sectional tests, and timed Mains answer writing in real exam simulation.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "Subject-wise tracking, accuracy analysis, rank prediction, and answer writing improvement metrics.",
  },
  {
    icon: BookOpen,
    title: "Current Affairs Engine",
    description: "Daily UPSC-focused news analysis, editorial summaries, government schemes, and budget breakdowns.",
  },
  {
    icon: Calendar,
    title: "Smart Study Planner",
    description: "Auto-generated daily schedules with adaptive revision tracking and weak area detection.",
  },
  {
    icon: MessageSquare,
    title: "Mentorship System",
    description: "Mentor assigned per group with weekly live sessions, strategy guidance, and mock interviews.",
  },
  {
    icon: Sparkles,
    title: "AI Content Generation",
    description: "Auto MCQ generation, AI-generated test papers, and smart reminders to keep you consistent.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-28 bg-card">
      <div className="container">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-700 tracking-tight md:text-4xl">
            Everything you need to crack UPSC
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            A complete ecosystem designed around the realities of civil services preparation — 
            from daily discipline to answer writing mastery.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className="group rounded-lg border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-accent/30"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-accent/10">
                <feature.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="mt-4 font-display text-base font-600">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
