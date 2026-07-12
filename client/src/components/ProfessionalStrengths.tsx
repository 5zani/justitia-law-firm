import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Briefcase, ChevronDown } from "lucide-react";

interface Strength {
  title: string;
  description: string;
}

const strengthsData: Strength[] = [
  {
    title: "Legal Research",
    description: "Comprehensive and thorough legal research using latest case laws, statutes, and legal precedents. Our team stays updated with recent amendments and judicial interpretations to provide accurate legal guidance."
  },
  {
    title: "Banking Documentation",
    description: "Expert handling of complex banking documents including loan agreements, security documents, mortgage deeds, and other financial instruments. We ensure compliance with banking regulations and RBI guidelines."
  },
  {
    title: "Title Scrutiny",
    description: "Meticulous examination of property titles to identify any defects, encumbrances, or legal issues. We provide detailed title investigation reports to protect our clients' interests in property transactions."
  },
  {
    title: "Mortgage Verification",
    description: "Thorough verification of mortgage documents and equitable mortgages. We conduct searches and verify authenticity to ensure proper legal standing and protection of mortgagee interests."
  },
  {
    title: "Recovery Proceedings",
    description: "Strategic handling of debt recovery matters including DRT proceedings, SARFAESI actions, and civil suits. We have extensive experience in recovery litigation before various forums."
  },
  {
    title: "Commercial Documentation",
    description: "Professional drafting and review of commercial contracts, partnership agreements, service agreements, and other business documents. We ensure all terms are legally sound and protect your interests."
  }
];

export default function ProfessionalStrengths() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container">
        <div className="flex items-center gap-4 mb-6">
          <div className="accent-line"></div>
          <span className="text-accent font-semibold uppercase tracking-wide">Expertise</span>
        </div>
        <h2 className="section-title mb-16">Professional Strengths</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strengthsData.map((strength, idx) => (
            <Card
              key={idx}
              className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden"
              onClick={() => toggleExpand(idx)}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {strength.title}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-accent transition-transform duration-300 ${
                      expandedIndex === idx ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              {/* Expandable Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedIndex === idx
                    ? "max-h-96 opacity-100 mt-4"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="pt-4 border-t border-border">
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {strength.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
