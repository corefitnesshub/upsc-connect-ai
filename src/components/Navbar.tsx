import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import logoDark from "@/assets/logo-dark.png";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Subjects", href: "#subjects" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

const appLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Mock Tests", href: "/mock-tests" },
  { label: "Answer Writing", href: "/answer-writing" },
  { label: "Current Affairs", href: "/current-affairs" },
  { label: "AI Tutor", href: "/ai-tutor" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const links = user ? appLinks : navLinks;

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2">
          <img src={logoDark} alt="GuideIT Sol" className="h-9 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) =>
            link.href.startsWith("#") ? (
              <a key={link.label} href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                {link.label}
              </a>
            ) : (
              <Link key={link.label} to={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="mr-1 h-4 w-4" /> Sign Out
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button variant="hero" size="sm" asChild>
                <Link to="/signup">Start Free</Link>
              </Button>
            </>
          )}
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-card px-4 pb-4 pt-2 md:hidden">
          {links.map((link) =>
            link.href.startsWith("#") ? (
              <a key={link.label} href={link.href}
                className="block py-2 text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ) : (
              <Link key={link.label} to={link.href}
                className="block py-2 text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            )
          )}
          <div className="mt-3 flex flex-col gap-2">
            {user ? (
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="mr-1 h-4 w-4" /> Sign Out
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button variant="hero" size="sm" asChild>
                  <Link to="/signup">Start Free</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
