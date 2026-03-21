import { Link } from "react-router-dom";
import logoDark from "@/assets/logo-dark.png";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-12 md:py-16">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <img src={logoDark} alt="GuideIT Sol" className="h-8 w-auto" />
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Discipline is the bridge between goals and accomplishment. Prepare for UPSC with structure and intelligence.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Platform</h4>
            <ul className="mt-4 space-y-2.5">
              {["Study Circles", "AI Tutor", "Mock Tests", "Answer Writing", "Current Affairs"].map((item) => (
                <li key={item}>
                  <a href="#features" className="text-sm text-foreground/70 hover:text-foreground transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Resources</h4>
            <ul className="mt-4 space-y-2.5">
              {["UPSC Syllabus", "Previous Year Papers", "Study Notes", "Toppers' Strategy", "Blog"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Company</h4>
            <ul className="mt-4 space-y-2.5">
              {["About Us", "Careers", "Contact", "Privacy Policy", "Terms of Service"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} GuideIT Sol. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
