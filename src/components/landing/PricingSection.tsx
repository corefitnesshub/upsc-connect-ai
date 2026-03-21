import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Get started with basic content and community access.",
    features: [
      "Daily current affairs",
      "Basic MCQ practice",
      "Public discussion forums",
      "Limited study notes",
      "1 mock test per month",
    ],
    cta: "Start Free",
    featured: false,
  },
  {
    name: "Premium",
    price: "₹999",
    period: "/month",
    description: "Full access to AI tools, mock tests, and study circles.",
    features: [
      "Everything in Free",
      "AI Tutor — unlimited queries",
      "Daily answer writing with AI evaluation",
      "Unlimited mock tests",
      "Study Circle membership",
      "Performance analytics",
      "Mentor-led sessions",
      "Personalized study plans",
    ],
    cta: "Start 7-Day Trial",
    featured: true,
  },
  {
    name: "Cohort Batch",
    price: "₹4,999",
    period: "/3 months",
    description: "Structured batch program with dedicated mentor and live classes.",
    features: [
      "Everything in Premium",
      "Fixed batch schedule",
      "Dedicated mentor",
      "Weekly live sessions",
      "Interview preparation",
      "Mock interview practice",
      "Priority doubt resolution",
    ],
    cta: "Apply Now",
    featured: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl font-700 tracking-tight md:text-4xl">
            Invest in your preparation
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the plan that matches your commitment level. All plans include core study materials.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg border p-6 md:p-8 transition-all duration-300 ${
                plan.featured
                  ? "border-accent bg-card shadow-lg scale-[1.02]"
                  : "border-border bg-card hover:-translate-y-0.5 hover:shadow-sm"
              }`}
            >
              {plan.featured && (
                <span className="mb-4 inline-block rounded-sm bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-xl font-600">{plan.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-mono-data text-4xl font-bold">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{plan.description}</p>

              <Button
                variant={plan.featured ? "hero" : "hero-outline"}
                size="lg"
                className="mt-6 w-full"
                asChild
              >
                <Link to="/signup">{plan.cta}</Link>
              </Button>

              <ul className="mt-6 space-y-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
