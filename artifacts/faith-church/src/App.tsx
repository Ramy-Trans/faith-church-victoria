import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Layout } from "./components/layout/Layout";
import { useEffect } from "react";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}

import NotFound from "@/pages/not-found";
import Home from "./pages/home";
import About from "./pages/about";
import FirstVisit from "./pages/first-visit";
import NextSteps from "./pages/next-steps";
import Sermons from "./pages/sermons";
import Events from "./pages/events";
import Kids from "./pages/kids";
import Students from "./pages/students";
import Adults from "./pages/adults";
import Give from "./pages/give";
import Contact from "./pages/contact";
import Resources from "./pages/resources";

const queryClient = new QueryClient();

function Router() {
  return (
    <>
    <ScrollToTop />
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/first-visit" component={FirstVisit} />
      <Route path="/next-steps" component={NextSteps} />
      <Route path="/sermons" component={Sermons} />
      <Route path="/events" component={Events} />
      <Route path="/kids" component={Kids} />
      <Route path="/students" component={Students} />
      <Route path="/adults" component={Adults} />
      <Route path="/give" component={Give} />
      <Route path="/contact" component={Contact} />
      <Route path="/resources" component={Resources} />
      <Route component={NotFound} />
    </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Layout>
              <Router />
            </Layout>
          </WouterRouter>
        </LanguageProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
