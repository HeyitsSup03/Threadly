import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Pages
import Home from "@/pages/Home";
import ThreadDetail from "@/pages/ThreadDetail";
import CategoryView from "@/pages/CategoryView";
import UserProfile from "@/pages/UserProfile";
import NotFound from "@/pages/not-found";

// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatModule from "@/components/ChatModule";
import MobileNavigation from "@/components/MobileNavigation";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <AnimatePresence>
          {!isLoaded ? (
            <motion.div
              className="fixed inset-0 bg-primary z-50 flex items-center justify-center"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1 
                className="text-5xl font-space font-bold text-white"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <span className="text-white">THREAD</span><span className="text-secondary">LY</span>
              </motion.h1>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <Header />
        
        <AnimatePresence mode="wait">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/thread/:id" component={ThreadDetail} />
            <Route path="/category/:id" component={CategoryView} />
            <Route path="/user/:id" component={UserProfile} />
            <Route component={NotFound} />
          </Switch>
        </AnimatePresence>
        
        <Footer />
        <ChatModule />
        <MobileNavigation />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
