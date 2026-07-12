import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Advocates() {
  const [, setLocation] = useLocation();

  const advocates = [
    {
      name: "Mr. S. Raveendran",
      title: "Senior Advocate",
      qualifications: "M.Com., B.L.",
      experience: "25+",
      specialties: ["Civil Litigation", "Service Matters", "Labour Law", "Consumer Disputes"],
      email: "raveendranadv@yahoo.co.in",
      phone: "9843232568",
      address: "107.S.R.Lawyers Complex, Gopalapuram 3rd street, Coimbatore – 641018"
    },
    {
      name: "Mr. S. Venkatravi",
      title: "Advocate",
      qualifications: "B.B.A., L.L.B.",
      experience: "6+",
      specialties: ["High Court Litigation", "DRT Matters", "Civil Disputes", "Banking Law"],
      email: "yash.venkaat@gmail.com",
      phone: "9282341090",
      address: "Old no: 116, 1st floor, Angappa Naicken Street, Parrys, Chennai – 600 001"
    },
    {
      name: "Dr. R. T. Senthilkumar",
      title: "Advocate & Founder",
      qualifications: "M.E., Ph.D., L.L.B.",
      experience: "1+",
      specialties: ["Oil & Gas Contracts", "Power Sector Disputes", "Infrastructure Disputes", "Arbitration"],
      email: "drsenthillawfirm@gmail.com",
      phone: "8072818842",
      address: "No.123-1, Prabu Complex, Perur Main Road, Selvapuram, Coimbatore - 641026"
    }
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
            <a href="#" onClick={() => setLocation("/advocates")} className="text-sm font-medium text-accent">Advocates</a>
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
        <h1 className="text-5xl font-bold text-foreground mb-4">Our Advocates</h1>
        <p className="text-lg text-muted-foreground mb-12">Meet our experienced team of legal professionals</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advocates.map((advocate, idx) => (
            <Card key={idx} className="p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-foreground mb-2">{advocate.name}</h3>
              <p className="text-accent font-semibold mb-1">{advocate.title}</p>
              <p className="text-sm text-muted-foreground mb-4">{advocate.qualifications} | {advocate.experience} years</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-foreground text-sm mb-2">Specialties:</h4>
                <div className="flex flex-wrap gap-2">
                  {advocate.specialties.map((spec, i) => (
                    <span key={i} className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3 border-t pt-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-accent" />
                  <a href={`mailto:${advocate.email}`} className="text-sm text-muted-foreground hover:text-accent">
                    {advocate.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-accent" />
                  <a href={`tel:${advocate.phone}`} className="text-sm text-muted-foreground hover:text-accent">
                    {advocate.phone}
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">{advocate.address}</p>
                </div>
              </div>
            </Card>
          ))}
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
