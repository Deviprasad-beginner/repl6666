import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Diaries from "@/pages/diaries";
import Whispers from "@/pages/whispers";
import MindMaze from "@/pages/mind-maze";
import NightCircles from "@/pages/night-circles";
import MidnightCafe from "@/pages/midnight-cafe";
import MusicMood from "@/pages/music-mood";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/diaries" component={Diaries} />
      <Route path="/whispers" component={Whispers} />
      <Route path="/mind-maze" component={MindMaze} />
      <Route path="/night-circles" component={NightCircles} />
      <Route path="/midnight-cafe" component={MidnightCafe} />
      <Route path="/music-mood" component={MusicMood} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
