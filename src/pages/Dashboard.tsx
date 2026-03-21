import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  BookOpen, Brain, FileEdit, Target, Users, BarChart3,
  Calendar, MessageSquare, ChevronRight, Clock, TrendingUp, Award,
} from "lucide-react";

const dailyTasks = [
  { title: "Read: Indian Polity — Parliament", time: "45 min", done: true },
  { title: "MCQ Practice: Modern History", time: "30 min", done: true },
  { title: "Answer Writing: Ethics Case Study", time: "60 min", done: false },
  { title: "Current Affairs: Daily News Analysis", time: "20 min", done: false },
  { title: "Revision: Geography — Climatology", time: "30 min", done: false },
];

const studyCircleMembers = [
  { name: "Priya S.", streak: 34, today: true },
  { name: "Rahul M.", streak: 28, today: true },
  { name: "Ananya K.", streak: 42, today: false },
  { name: "Vikram T.", streak: 19, today: true },
  { name: "Neha R.", streak: 31, today: true },
];

const recentTests = [
  { name: "Prelims Mock #14", score: "127/200", rank: "#342", date: "2 days ago" },
  { name: "GS-2 Sectional", score: "84/150", rank: "#128", date: "5 days ago" },
  { name: "CSAT Practice", score: "142/200", rank: "#89", date: "1 week ago" },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-6 md:py-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-700 md:text-3xl">Good morning, Aspirant</h1>
            <p className="mt-1 text-sm text-muted-foreground">Day 127 of your preparation · 3/5 tasks completed today</p>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-sm bg-accent/10 px-3 py-1.5">
              <Award className="h-4 w-4 text-accent" />
              <span className="font-mono-data text-sm font-bold text-accent">34 day streak</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { icon: Clock, label: "Study Today", value: "4h 23m", sub: "+12% vs avg" },
            { icon: FileEdit, label: "Answers Written", value: "247", sub: "This month: 18" },
            { icon: Target, label: "Mock Test Avg", value: "63.5%", sub: "↑ 4.2% this month" },
            { icon: TrendingUp, label: "Overall Rank", value: "#342", sub: "Among 12,847" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-2">
                <stat.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
              </div>
              <p className="mt-2 font-mono-data text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Daily Tasks */}
          <div className="lg:col-span-2 rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-600 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent" />
                Today's Schedule
              </h2>
              <span className="font-mono-data text-xs text-muted-foreground">3/5 done</span>
            </div>
            <div className="space-y-2">
              {dailyTasks.map((task, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between rounded-sm border p-3 transition-colors ${
                    task.done ? "border-success/30 bg-success/5" : "border-border hover:border-accent/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-5 w-5 rounded-sm border-2 flex items-center justify-center ${
                      task.done ? "border-success bg-success" : "border-border"
                    }`}>
                      {task.done && <span className="text-xs text-accent-foreground">✓</span>}
                    </div>
                    <span className={`text-sm ${task.done ? "line-through text-muted-foreground" : ""}`}>
                      {task.title}
                    </span>
                  </div>
                  <span className="font-mono-data text-xs text-muted-foreground">{task.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Study Circle */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-display text-lg font-600 flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-accent" />
              Study Circle
            </h2>
            <p className="text-xs text-muted-foreground mb-3">Circle Alpha · 5 members</p>
            <div className="space-y-2.5">
              {studyCircleMembers.map((member) => (
                <div key={member.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`h-2 w-2 rounded-full ${member.today ? "bg-success" : "bg-border"}`} />
                    <span className="text-sm">{member.name}</span>
                  </div>
                  <span className="font-mono-data text-xs text-muted-foreground">{member.streak}d streak</span>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="mt-4 w-full">
              <MessageSquare className="mr-1 h-4 w-4" />
              Open Group Chat
            </Button>
          </div>
        </div>

        {/* Second Row */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* AI Tutor */}
          <div className="rounded-lg border border-accent/30 bg-accent/5 p-6">
            <h2 className="font-display text-lg font-600 flex items-center gap-2 mb-3">
              <Brain className="h-5 w-5 text-accent" />
              AI Tutor
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Ask doubts, get concept explanations, or improve your answers.
            </p>
            <div className="rounded-sm border border-border bg-card p-3 mb-3">
              <p className="text-xs text-muted-foreground italic">
                "Explain the difference between Fundamental Rights and DPSP in terms of enforceability..."
              </p>
            </div>
            <Button variant="hero" size="sm" className="w-full">
              Ask AI Tutor <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          {/* Recent Tests */}
          <div className="lg:col-span-2 rounded-lg border border-border bg-card p-6">
            <h2 className="font-display text-lg font-600 flex items-center gap-2 mb-4">
              <BarChart3 className="h-5 w-5 text-accent" />
              Recent Tests
            </h2>
            <div className="space-y-3">
              {recentTests.map((test) => (
                <div key={test.name} className="flex items-center justify-between rounded-sm border border-border p-3 hover:border-accent/30 transition-colors">
                  <div>
                    <p className="text-sm font-medium">{test.name}</p>
                    <p className="text-xs text-muted-foreground">{test.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono-data text-sm font-bold">{test.score}</p>
                    <p className="font-mono-data text-xs text-muted-foreground">Rank {test.rank}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="mt-4 w-full">
              View All Tests <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { icon: FileEdit, label: "Write Answer", color: "text-accent" },
            { icon: Target, label: "Take Mock Test", color: "text-primary" },
            { icon: BookOpen, label: "Current Affairs", color: "text-success" },
            { icon: Brain, label: "AI Tutor", color: "text-warning" },
          ].map((action) => (
            <button
              key={action.label}
              className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-sm hover:border-accent/30 active:scale-[0.97]"
            >
              <action.icon className={`h-6 w-6 ${action.color}`} />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
