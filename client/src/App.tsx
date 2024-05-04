import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Auth } from "./pages/auth";
import { FinancialRecordsProvider } from "./contexts/financial-record-context";
import { SignedIn, UserButton } from "@clerk/clerk-react";

// Main App component
function App() {
  return (
    <Router>
      {/* App container */}
      <div className="app-container">
        {/* Navbar */}
        <div className="navbar">
          {/* Link to navigate to the Auth page */}
          <Link to="/auth"> Dashboard</Link>

          {/* Display UserButton component when user is signed in */}
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        {/* Define routes */}
        <Routes>
          {/* Route for the Auth page */}
          <Route path="/auth" element={<Auth />} />

          {/* Route for the Dashboard page */}
          <Route
            path="/"
            element={
              <FinancialRecordsProvider>
                <Dashboard />
              </FinancialRecordsProvider>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
