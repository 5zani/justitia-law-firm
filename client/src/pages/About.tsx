import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { MapPin, Phone, Mail } from "lucide-react";

export default function About() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-white/95">
        <div className="container h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setLocation("/")}>
            <img src="/images/image.png" alt="Justitia Logo" className="w-8 h-8 object-contain" />
            <span className="font-bold text-lg text-foreground">JUSTITIA</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" onClick={() => setLocation("/")} className="text-sm font-medium hover:text-accent transition-colors">Home</a>
            <a href="#" onClick={() => setLocation("/about")} className="text-sm font-medium text-accent">About</a>
            <a href="#" onClick={() => setLocation("/advocates")} className="text-sm font-medium hover:text-accent transition-colors">Advocates</a>
            <a href="#" onClick={() => setLocation("/practice-areas")} className="text-sm font-medium hover:text-accent transition-colors">Practice Areas</a>
            <a href="#" onClick={() => setLocation("/articles")} className="text-sm font-medium hover:text-accent transition-colors">Articles</a>
            <a href="#" onClick={() => setLocation("/contact")} className="text-sm font-medium hover:text-accent transition-colors">Contact</a>
          </nav>

          <Button 
            variant="default"
            className="bg-accent hover:bg-accent/90"
            onClick={() => setLocation("/admin-login")}
          >
            Admin Login
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-foreground mb-6">About Justitia Law Firm</h1>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            Guided by Truth, Committed to Justice
          </p>

          <div className="space-y-12">
            {/* Overview */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Firm</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Justitia Law Firm is a dedicated legal practice providing ethical, prompt, and result-oriented legal representation before Civil, Criminal, Consumer, Labour Courts, Tribunals, and the High Court.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With a multidisciplinary approach combining legal expertise with technical knowledge, we specialize in complex disputes involving banking, infrastructure, oil & gas, and commercial matters.
              </p>
            </Card>

            {/* Mission */}
            <Card className="p-8 bg-accent/5 border-accent/20">
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To provide exceptional legal services that protect our clients' interests, uphold justice, and deliver results. We believe in transparency, integrity, and hard work in every engagement.
              </p>
            </Card>

            {/* Values */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">Integrity</h3>
                <p className="text-sm text-muted-foreground">We maintain the highest ethical standards in all our legal practice.</p>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">Excellence</h3>
                <p className="text-sm text-muted-foreground">We deliver superior legal solutions with meticulous attention to detail.</p>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">Justice</h3>
                <p className="text-sm text-muted-foreground">We are committed to upholding fairness and justice for all clients.</p>
              </Card>
            </div>

            {/* Office Locations */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Office Locations</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Coimbatore Office</h3>
                    <p className="text-sm text-muted-foreground">No.123-1, Prabu Complex, Perur Main Road, Selvapuram, Coimbatore - 641026</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Contact</h3>
                    <p className="text-sm text-muted-foreground">
                      <a href="tel:8072818842" className="hover:text-accent">8072818842</a> / <a href="tel:9940362719" className="hover:text-accent">9940362719</a>
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-foreground/95 text-white/80 py-8 mt-16">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img src="/images/image.png" alt="Justitia Logo" className="w-8 h-8 object-contain" />
              <span className="font-semibold">Justitia Law Firm</span>
            </div>
            <p className="text-sm text-center md:text-right">
              © 2026 Justitia Law Firm. All rights reserved. | Guided by Truth, Committed to Justice
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
