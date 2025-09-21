import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "glass-header py-4" : "bg-transparent py-6"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="text-3xl font-bold cursor-pointer smooth-transition hover:scale-110"
          onClick={() => scrollToSection("home")}
        >
          Mark <span className="gradient-text">Gray</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {["home", "about", "projects", "contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-lg font-medium text-foreground hover:text-purple-400 smooth-transition capitalize border-b-2 border-transparent hover:border-purple-400"
            >
              {item}
            </button>
          ))}
        </nav>

        {/* CTA Button */}
        <Button 
          variant="gradient" 
          size="lg"
          className="hidden md:flex rounded-full px-6"
          onClick={() => scrollToSection("contact")}
        >
          Contact Me
        </Button>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl text-purple-400"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass-header border-t border-border">
          <nav className="flex flex-col space-y-4 p-6">
            {["home", "about", "projects", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-lg font-medium text-foreground hover:text-purple-400 smooth-transition capitalize text-left"
              >
                {item}
              </button>
            ))}
            <Button 
              variant="gradient" 
              size="lg"
              className="rounded-full mt-4"
              onClick={() => scrollToSection("contact")}
            >
              Contact Me
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;