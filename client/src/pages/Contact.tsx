import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLocation } from "wouter";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function Contact() {
  const [, setLocation] = useLocation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      toast.success("Message sent. We'll get back to you shortly.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send message. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.subject || !form.message) {
      toast.error("All fields are required.");
      return;
    }
    submitMutation.mutate(form);
  };

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
            <a href="#" onClick={() => setLocation("/practice-areas")} className="text-sm font-medium hover:text-accent transition-colors">Practice Areas</a>
            <a href="#" onClick={() => setLocation("/articles")} className="text-sm font-medium hover:text-accent transition-colors">Articles</a>
            <a href="#" onClick={() => setLocation("/contact")} className="text-sm font-medium text-accent">Contact</a>
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
        <h1 className="text-5xl font-bold text-foreground mb-4">Get In Touch</h1>
        <p className="text-lg text-muted-foreground mb-12">We'd love to hear from you. Contact us for legal consultation.</p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <MapPin className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">Office</h3>
            <p className="text-muted-foreground text-sm">
              No.123-1, Prabu Complex, Perur Main Road, Selvapuram, Coimbatore - 641026
            </p>
          </Card>

          <Card className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <Phone className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">Phone</h3>
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">
                <a href="tel:8072818842" className="hover:text-accent">8072818842</a>
              </p>
              <p className="text-muted-foreground text-sm">
                <a href="tel:9940362719" className="hover:text-accent">9940362719</a>
              </p>
            </div>
          </Card>

          <Card className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <Mail className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">Email</h3>
            <p className="text-muted-foreground text-sm">
              <a href="mailto:drsenthillawfirm@gmail.com" className="hover:text-accent">drsenthillawfirm@gmail.com</a>
            </p>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="p-8 mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-2">Send Us a Message</h2>
          <p className="text-muted-foreground mb-8">All fields are required. We typically respond within one business day.</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Full Name <span className="text-accent">*</span>
                </label>
                <Input
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Email Address <span className="text-accent">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Phone Number <span className="text-accent">*</span>
                </label>
                <Input
                  type="tel"
                  placeholder="Your phone number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Subject <span className="text-accent">*</span>
                </label>
                <Input
                  placeholder="What is this regarding?"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Message <span className="text-accent">*</span>
              </label>
              <Textarea
                placeholder="Tell us about your legal matter"
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="bg-accent hover:bg-accent/90 gap-2"
              disabled={submitMutation.isPending}
            >
              <Send className="w-4 h-4" />
              {submitMutation.isPending ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Card>

        <Card className="p-8 bg-accent/5 border-accent/20">
          <h2 className="text-2xl font-bold text-foreground mb-4">Business Hours</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-foreground mb-2">Monday - Friday</p>
              <p className="text-muted-foreground">9:00 AM - 6:00 PM</p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-2">Saturday</p>
              <p className="text-muted-foreground">10:00 AM - 2:00 PM</p>
            </div>
          </div>
        </Card>
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
