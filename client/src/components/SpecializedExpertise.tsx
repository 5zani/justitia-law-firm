import { Card } from "@/components/ui/card";
import { Zap, Briefcase, FileText, Settings } from "lucide-react";

export default function SpecializedExpertise() {
  const engineeringDomain = [
    "Electrical Engineering and Power System Engineering",
    "Grounding Grid Design and Earthing Studies",
    "Substation Grounding, GPR and EMI/EMF Analysis",
    "Pipeline Electromagnetic Interference Studies",
    "Oil & Gas Pipeline Technical Interface Issues",
    "Gas Insulated and Air Insulated Substation Studies",
    "Interference Mitigation Design for Utility and Pipeline Projects",
    "Engineering Simulation using CDEGS, MATLAB, COMSOL, Electro 2D and Coulomb 3D"
  ];

  const legalDomain = [
    "Oil & Gas Contracts and Infrastructure Disputes",
    "Power Sector and Engineering-Related Contractual Claims",
    "Arbitration and Dispute Resolution",
    "EPC / Commercial Contract Drafting and Review",
    "Banking, Recovery and SARFAESI Proceedings",
    "Title Verification and Property Due Diligence",
    "Civil, Commercial and Consumer Litigation",
    "Negotiable Instruments Act / Cheque Dishonour Matters"
  ];

  const industryFocus = [
    "Oil & gas pipeline contracts and contractual disputes",
    "Power sector and utility-related disputes",
    "Arbitration involving technically complex engineering projects",
    "EPC, construction, infrastructure and industrial contracts",
    "Delay claims, variation claims and performance disputes",
    "Technical review of contractual obligations and scope disputes",
    "Engineering due diligence and project documentation",
    "Commercial claims from power, pipeline and industrial infrastructure"
  ];

  return (
    <section className="py-20 md:py-32 bg-secondary/5">
      <div className="container">
        <div className="flex items-center gap-4 mb-6">
          <div className="accent-line"></div>
          <span className="text-accent font-semibold uppercase tracking-wide">Specialization</span>
        </div>
        <h2 className="section-title mb-16">Dr. Senthilkumar's Specialized Expertise</h2>

        {/* Engineering & Technical Domain */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Zap className="w-6 h-6 text-accent" />
            <h3 className="text-2xl font-bold text-foreground">Engineering & Technical Domain</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {engineeringDomain.map((item, idx) => (
              <Card key={idx} className="p-4 hover:shadow-md transition-shadow">
                <p className="text-foreground flex items-start gap-3">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span>{item}</span>
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Legal & Advisory Domain */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="w-6 h-6 text-accent" />
            <h3 className="text-2xl font-bold text-foreground">Legal & Advisory Domain</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {legalDomain.map((item, idx) => (
              <Card key={idx} className="p-4 hover:shadow-md transition-shadow">
                <p className="text-foreground flex items-start gap-3">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span>{item}</span>
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Industry Positioning */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Settings className="w-6 h-6 text-accent" />
            <h3 className="text-2xl font-bold text-foreground">Industry Positioning</h3>
          </div>
          <Card className="p-8 bg-accent/5 border-accent/20">
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Dr. Senthilkumar's combined engineering and legal background makes him particularly suitable for assignments involving technically complex projects. He is well positioned to work with oil & gas companies, EPC contractors, infrastructure developers, utilities, industrial clients, and financial institutions where disputes or advisory work require an understanding of both technical engineering systems and legal/contractual consequences.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {industryFocus.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-1">✓</span>
                  <span className="text-foreground text-sm">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
