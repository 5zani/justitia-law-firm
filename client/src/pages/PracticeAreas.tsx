import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Scale, Shield, DollarSign, FileText, Briefcase, BookOpen, Users, CheckCircle } from "lucide-react";

export default function PracticeAreas() {
  const [, setLocation] = useLocation();

  const practiceAreas = [
    { icon: Scale, title: "Banking & Recovery Matters", description: "Comprehensive banking law services and recovery proceedings" },
    { icon: Shield, title: "SARFAESI Proceedings", description: "Specialized in SARFAESI Act litigation and enforcement" },
    { icon: DollarSign, title: "DRT Matters", description: "Debt Recovery Tribunal representation and advocacy" },
    { icon: FileText, title: "Civil Litigation", description: "Complex civil suits and dispute resolution" },
    { icon: Briefcase, title: "Property Documentation", description: "Title verification and legal scrutiny of property documents" },
    { icon: BookOpen, title: "Contract Drafting", description: "Professional contract drafting and review services" },
    { icon: Users, title: "Arbitration", description: "Arbitration representation and dispute resolution" },
    { icon: CheckCircle, title: "Consumer Disputes", description: "Consumer protection and dispute handling" }
  ];

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
            <a href="#" onClick={() => setLocation("/about")} className="text-sm font-medium hover:text-accent transition-colors">About</a>
            <a href="#" onClick={() => setLocation("/advocates")} className="text-sm font-medium hover:text-accent transition-colors">Advocates</a>
            <a href="#" onClick={() => setLocation("/practice-areas")} className="text-sm font-medium text-accent">Practice Areas</a>
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
        <h1 className="text-5xl font-bold text-foreground mb-4">Practice Areas</h1>
        <p className="text-lg text-muted-foreground mb-12">Comprehensive legal services across diverse practice areas</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {practiceAreas.map((area, idx) => {
            const IconComponent = area.icon;
            return (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{area.title}</h3>
                <p className="text-sm text-muted-foreground">{area.description}</p>
              </Card>
            );
          })}
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
