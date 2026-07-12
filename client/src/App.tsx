import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import DisclaimerGate from "./components/DisclaimerGate";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Advocates from "./pages/Advocates";
import PracticeAreas from "./pages/PracticeAreas";
import Contact from "./pages/Contact";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import AdminMessages from "./pages/AdminMessages";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/advocates"} component={Advocates} />
      <Route path={"/practice-areas"} component={PracticeAreas} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/articles"} component={Articles} />
      <Route path={"/articles/:slug"} component={ArticleDetail} />
      <Route path={"/admin-login"} component={AdminLogin} />
      <Route path={"/admin"} component={Admin} />
      <Route path={"/admin/messages"} component={AdminMessages} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <DisclaimerGate>
            <Router />
          </DisclaimerGate>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
