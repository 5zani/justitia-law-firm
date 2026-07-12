import ProfessionalStrengths from "@/components/ProfessionalStrengths";
import { useAuth } from "@/_core/hooks/useAuth";
import SpecializedExpertise from "@/components/SpecializedExpertise";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, MapPin, Phone, Scale, Shield, FileText, DollarSign, Users, BookOpen, Briefcase, CheckCircle, LogIn, Landmark } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [, setLocation] = useLocation();
  const advocates = [
    {
      name: "Mr. S. Raveendran",
      title: "Senior Advocate",
      qualifications: "M.Com., B.L.",
      experience: "25+ years",
      specialties: ["Civil Litigation", "Service Matters", "Labour Law", "Consumer Disputes"],
      highlights: [
        "Extensive experience in Civil, Service, Labor and Consumer matters",
        "Empanelled with State Bank of India",
        "Empanelled with New India Assurance Co. Ltd.",
        "Vast experience before Civil Courts and the High Court"
      ],
      email: "raveendranadv@yahoo.co.in",
      phone: "9843232568",
      address: "107.S.R.Lawyers Complex, Gopalapuram 3rd street, Coimbatore – 641018"
    },
    {
      name: "Mr. S. Venkatravi",
      title: "Advocate",
      qualifications: "B.B.A., L.L.B.",
      experience: "6+ years",
      specialties: ["High Court Litigation", "DRT Matters", "Civil Disputes", "Banking Law"],
      highlights: [
        "Appearing before the High Court, City Civil Court, DRT and DRAT",
        "Empanelled with Equitas Small Finance Limited",
        "Empanelled with GIC HFL and Motilal Home Finance Limited",
        "Vast experience before Civil Courts and the High Court"
      ],
      email: "yash.venkaat@gmail.com",
      phone: "9282341090",
      address: "Old no: 116, 1st floor, Angappa Naicken Street, Parrys, Chennai – 600 001"
    },
    {
      name: "Dr. R. T. Senthilkumar",
      title: "Advocate & Founder",
      qualifications: "M.E., Ph.D., L.L.B.",
      experience: "1+ years",
      specialties: ["Oil & Gas Contracts", "Power Sector Disputes", "Infrastructure Disputes", "Arbitration", "EPC/Construction Claims", "Banking & Recovery", "SARFAESI Matters", "Title Verification"],
      highlights: [
        "Multidisciplinary professional combining Electrical Engineering, Power Systems, and Legal expertise",
        "Specialized in technically complex disputes involving energy, oil & gas, and infrastructure projects",
        "Expertise in contract drafting, arbitration, and dispute resolution for engineering projects",
        "Proficient in technical analysis using CDEGS, MATLAB, COMSOL, and other engineering tools",
        "Published researcher in power systems and electrical engineering",
        "Practicing before High Court of Madras and District & Sessions Courts in Tamil Nadu"
      ],
      email: "drsenthillawfirm@gmail.com",
      phone: "8072818842",
      address: "No.123-1, Prabu Complex, Perur Main Road, Selvapuram, Coimbatore - 641026"
    }
  ];

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

  const bankingServices = [
    "Title Investigation Reports",
    "Search Reports",
    "Legal Scrutiny Reports",
    "Equitable Mortgage Verification",
    "Recovery Proceedings",
    "SARFAESI Actions",
    "DRT Litigation",
    "Civil Suits & Execution Proceedings",
    "Arbitration Matters",
    "Documentation Verification",
    "Legal Notices and Opinions"
  ];

  const strengths = [
    "Legal Research",
    "Banking Documentation",
    "Title Scrutiny",
    "Mortgage Verification",
    "Recovery Proceedings",
    "Commercial Documentation"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/image.png" alt="Justitia Logo" className="w-12 h-12 object-contain" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">JUSTITIA</h1>
              <p className="text-xs text-muted-foreground">Law Firm</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => setLocation("/about")} className="text-foreground hover:text-accent transition-colors">About</button>
            <button onClick={() => setLocation("/advocates")} className="text-foreground hover:text-accent transition-colors">Advocates</button>
            <button onClick={() => setLocation("/practice-areas")} className="text-foreground hover:text-accent transition-colors">Practice Areas</button>
            <button onClick={() => setLocation("/contact")} className="text-foreground hover:text-accent transition-colors">Contact</button>
            <button onClick={() => setLocation("/articles")} className="text-foreground hover:text-accent transition-colors">Articles</button>
          </nav>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLocation("/admin-login")}
            className="gap-2 ml-4"
          >
            <LogIn className="w-4 h-4" />
            Admin Login
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-foreground">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground to-secondary"></div>
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(201,162,39,0.4) 2px, rgba(201,162,39,0.4) 3px)",
            }}
          ></div>
          <div className="absolute -right-24 -top-24 w-[520px] h-[520px] rounded-full border border-accent/20"></div>
          <div className="absolute -right-10 top-16 w-[380px] h-[380px] rounded-full border border-accent/15"></div>
        </div>
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Guided by Truth, Committed to Justice
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Justitia Law Firm provides ethical, prompt, and result-oriented legal representation before Civil, Criminal, Consumer, Labour Courts, Tribunals, and the High Court.
            </p>
            <Button size="lg" onClick={() => setLocation("/contact")} className="bg-accent hover:bg-accent/90 text-white">
              Get Legal Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="accent-line"></div>
                <span className="text-accent font-semibold uppercase tracking-wide">About Us</span>
              </div>
              <h2 className="section-title">About Justitia Law Firm</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Justitia Law Firm is a litigation and advisory law firm at Coimbatore providing comprehensive legal services before Civil, Criminal, Consumer, Labour Courts, Tribunals, and the High Court.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                The firm focuses on ethical, prompt, and result-oriented legal representation. With a team of experienced advocates, we provide specialized services in banking law, property documentation, civil litigation, and dispute resolution.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">Experienced legal team with 25+ years combined practice</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">Empanelled with major financial institutions</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">Dedicated office infrastructure with digital facilities</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-lg shadow-lg overflow-hidden bg-gradient-to-br from-foreground via-secondary to-foreground aspect-[4/3] flex items-center justify-center">
                <div
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(201,162,39,0.5) 2px, rgba(201,162,39,0.5) 3px)",
                  }}
                ></div>
                <img src="/images/image.png" alt="Justitia Law Firm" className="relative w-56 h-56 md:w-64 md:h-64 object-contain opacity-95 drop-shadow-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advocates Section */}
      <section id="advocates" className="py-20 md:py-32 bg-secondary/5">
        <div className="container">
          <div className="flex items-center gap-4 mb-6">
            <div className="accent-line"></div>
            <span className="text-accent font-semibold uppercase tracking-wide">Our Team</span>
          </div>
          <h2 className="section-title mb-16">Our Advocates</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {advocates.map((advocate, idx) => (
              <Card key={idx} className="advocate-card">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{advocate.name}</h3>
                  <p className="text-accent font-semibold mb-1">{advocate.title}</p>
                  <p className="text-sm text-muted-foreground">{advocate.qualifications}</p>
                  <p className="text-sm text-muted-foreground font-semibold mt-2">{advocate.experience} of practice</p>
                </div>
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {advocate.specialties.map((spec, i) => (
                      <span key={i} className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mb-6 space-y-2">
                  {advocate.highlights.map((highlight, i) => (
                    <div key={i} className="flex gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-6 border-t border-border space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-accent" />
                    <a href={`mailto:${advocate.email}`} className="text-accent hover:underline">{advocate.email}</a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-accent" />
                    <a href={`tel:${advocate.phone}`} className="text-accent hover:underline">{advocate.phone}</a>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{advocate.address}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Areas Section */}
      <section id="practice" className="py-20 md:py-32 bg-white">
        <div className="container">
          <div className="flex items-center gap-4 mb-6">
            <div className="accent-line"></div>
            <span className="text-accent font-semibold uppercase tracking-wide">Services</span>
          </div>
          <h2 className="section-title mb-16">Practice Areas</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="space-y-6">
                {practiceAreas.slice(0, 4).map((area, idx) => {
                  const Icon = area.icon;
                  return (
                    <div key={idx} className="service-item">
                      <div className="service-icon">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{area.title}</h4>
                        <p className="text-muted-foreground text-sm">{area.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="space-y-6">
                {practiceAreas.slice(4).map((area, idx) => {
                  const Icon = area.icon;
                  return (
                    <div key={idx} className="service-item">
                      <div className="service-icon">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{area.title}</h4>
                        <p className="text-muted-foreground text-sm">{area.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banking Services Section */}
      <section className="py-20 md:py-32 bg-secondary/5">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative rounded-lg shadow-lg overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 aspect-[4/3] flex items-center justify-center border border-border">
                <div
                  className="absolute inset-0 opacity-[0.15]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 22px, rgba(15,23,42,0.15) 22px, rgba(15,23,42,0.15) 23px)",
                  }}
                ></div>
                <Landmark className="relative w-24 h-24 text-accent opacity-80" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="accent-line"></div>
                <span className="text-accent font-semibold uppercase tracking-wide">Specialization</span>
              </div>
              <h2 className="section-title">Banking Legal Services</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We provide comprehensive banking legal services to financial institutions, including specialized support for recovery proceedings, mortgage verification, and regulatory compliance.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {bankingServices.map((service, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-foreground text-sm">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SpecializedExpertise />
      <ProfessionalStrengths />

      {/* Infrastructure Section */}
      <section className="py-20 md:py-32 bg-secondary/5">
        <div className="container">
          <div className="flex items-center gap-4 mb-6">
            <div className="accent-line"></div>
            <span className="text-accent font-semibold uppercase tracking-wide">Facilities</span>
          </div>
          <h2 className="section-title mb-16">Our Infrastructure</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">Office Locations</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-2">
                  <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
                  <span>Dedicated Office at Coimbatore</span>
                </li>
                <li className="flex gap-2">
                  <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
                  <span>Dedicated Office at Chennai</span>
                </li>
              </ul>
            </Card>
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">Technology & Facilities</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span>Computerized Office</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span>Digital Documentation</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span>E-Filing Facilities</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span>Legal Research Resources</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-foreground text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Get in Touch</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white/10 border-white/20 p-8">
                <div className="flex justify-center mb-4">
                  <MapPin className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">Office Address</h3>
                <p className="text-white/80 text-center text-sm leading-relaxed">
                  No.123-1, Prabu Complex, Perur Main Road, Selvapuram, Coimbatore - 641026
                </p>
              </Card>
              <Card className="bg-white/10 border-white/20 p-8">
                <div className="flex justify-center mb-4">
                  <Phone className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">Phone</h3>
                <div className="space-y-2 text-center">
                  <p className="text-white/80 text-sm">
                    <a href="tel:8072818842" className="hover:text-accent transition-colors">8072818842</a>
                  </p>
                  <p className="text-white/80 text-sm">
                    <a href="tel:9940362719" className="hover:text-accent transition-colors">9940362719</a>
                  </p>
                </div>
              </Card>
              <Card className="bg-white/10 border-white/20 p-8">
                <div className="flex justify-center mb-4">
                  <Mail className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">Email</h3>
                <p className="text-white/80 text-center text-sm">
                  <a href="mailto:drsenthillawfirm@gmail.com" className="hover:text-accent transition-colors">drsenthillawfirm@gmail.com</a>
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/95 text-white/80 py-8">
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
