import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Join a Study Circle",
    description: "Get matched with 5–10 serious aspirants at your level. Set daily targets together and hold each other accountable.",
  },
  {
    number: "02",
    title: "Follow Your AI Study Plan",
    description: "Our AI analyzes your strengths and weaknesses to generate a personalized daily schedule with smart revision reminders.",
  },
  {
    number: "03",
    title: "Practice Answer Writing Daily",
    description: "Write Mains answers daily. Get instant AI evaluation on structure, content, and keywords — plus peer reviews from your circle.",
  },
  {
    number: "04",
    title: "Track, Improve, Succeed",
    description: "Monitor your progress across subjects, mock tests, and answer writing. Your mentor guides strategy adjustments weekly.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-card">
      <div className="container">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-700 tracking-tight md:text-4xl">
            A structured path to selection
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No more random preparation. Follow a proven system that thousands of aspirants use daily.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="font-mono-data text-4xl font-bold text-accent/20">{step.number}</div>
              <h3 className="mt-3 font-display text-lg font-600">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              {index < steps.length - 1 && (
                <ArrowRight className="absolute right-0 top-6 hidden h-5 w-5 text-border lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
