import { useEffect, useState } from "react";

const DISCLAIMER_KEY = "justitia-disclaimer-accepted";

export default function DisclaimerGate({ children }: { children: React.ReactNode }) {
  const [accepted, setAccepted] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(DISCLAIMER_KEY);
      setAccepted(stored === "true");
    } catch {
      // sessionStorage unavailable; default to showing the disclaimer.
      setAccepted(false);
    }
  }, []);

  const handleAccept = () => {
    try {
      sessionStorage.setItem(DISCLAIMER_KEY, "true");
    } catch {
      // ignore storage errors
    }
    setAccepted(true);
  };

  // Avoid a flash of the disclaimer while we check sessionStorage.
  if (accepted === null) {
    return null;
  }

  if (accepted) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 px-4 py-8 overflow-y-auto">
      <div className="w-full max-w-2xl bg-[#0a0a0a] border border-accent/40 rounded-lg shadow-2xl">
        <div className="flex flex-col items-center px-8 pt-10 pb-6 border-b border-accent/20">
          <img
            src="/images/image.png"
            alt="Justitia Law Firm"
            className="w-16 h-16 object-contain mb-4"
          />
          <h1 className="text-white text-xl md:text-2xl font-bold tracking-wide text-center">
            JUSTITIA <span className="text-accent">LAW FIRM</span>
          </h1>
          <p className="text-accent text-sm italic mt-1 text-center">
            "Guided by Truth, Committed to Justice"
          </p>
        </div>

        <div className="px-8 py-6">
          <h2 className="text-accent font-semibold text-lg mb-4 tracking-wide">
            Disclaimer
          </h2>
          <div className="text-white/80 text-sm leading-relaxed space-y-3">
            <p>
              The Bar Council of India does not permit advertising or solicitation
              by advocates in any form. By clicking "I Accept" and accessing this
              website, you confirm and acknowledge the following:
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>
                You are seeking information about Justitia Law Firm on your own
                accord, and there has been no advertisement, solicitation,
                invitation, or inducement of any sort from the firm or its
                members to solicit any work through this website.
              </li>
              <li>
                The content on this website is provided for informational
                purposes only and should not be construed as legal advice.
              </li>
              <li>
                Justitia Law Firm is not liable for any consequences arising
                from reliance placed on the information provided on this
                website. Users are advised to seek independent legal counsel
                before acting on any information found here.
              </li>
              <li>
                All content, trademarks, and material on this website are the
                intellectual property of Justitia Law Firm unless stated
                otherwise.
              </li>
            </ul>
          </div>
        </div>

        <div className="px-8 pb-8 flex flex-col items-center gap-3">
          <button
            onClick={handleAccept}
            className="w-full md:w-auto px-10 py-3 bg-accent hover:bg-accent/90 text-black font-semibold rounded transition-colors"
          >
            I Accept
          </button>
          <p className="text-white/40 text-xs text-center">
            By proceeding, you agree to the terms stated above.
          </p>
        </div>
      </div>
    </div>
  );
}
