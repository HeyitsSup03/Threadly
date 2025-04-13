import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initializeLocalStorage } from "./lib/localStorage";

// Initialize localStorage with mock data
initializeLocalStorage();

createRoot(document.getElementById("root")!).render(<App />);
