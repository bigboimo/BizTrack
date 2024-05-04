import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx"; // Import the main App component
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";

// Retrieve the publishable key from environment variables
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Throw an error if the publishable key is missing
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// Render the application
ReactDOM.createRoot(document.getElementById("root")!).render(
  // Use StrictMode for additional checks and warnings in development mode
  <React.StrictMode>
    {/* Wrap the App component with ClerkProvider and provide the publishable key */}
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
