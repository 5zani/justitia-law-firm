import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Lock, LogIn } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const utils = trpc.useUtils();

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: async () => {
      toast.success("Login successful! Redirecting to admin panel...");
      await utils.auth.me.invalidate();
      setLocation("/admin");
    },
    onError: (error) => {
      toast.error(error.message || "Invalid username or password");
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ username, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Lock className="w-10 h-10 text-accent" />
            <h1 className="text-3xl font-bold text-white">JUSTITIA</h1>
          </div>
          <p className="text-slate-400 text-sm">Admin Portal</p>
        </div>

        {/* Login Card */}
        <Card className="bg-slate-800 border-slate-700 shadow-2xl">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-2">Admin Login</h2>
            <p className="text-slate-400 text-sm mb-8">
              Enter your credentials to access the admin panel
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  Username
                </label>
                <Input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-500"
                  disabled={loginMutation.isPending}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-500"
                  disabled={loginMutation.isPending}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-2 gap-2"
                disabled={loginMutation.isPending}
              >
                <LogIn className="w-4 h-4" />
                {loginMutation.isPending ? "Logging in..." : "Login"}
              </Button>
            </form>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-slate-400 text-sm">
            © 2026 Justitia Law Firm. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
