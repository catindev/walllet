import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import Index from "./components/LandingPage/LandingPage";
import SignIn from "./components/SignInPage";
import SignUp from "./components/SignUpPage";
import Wallets from "./components/Wallets/WalletsPage";
import WithdrawalPage from "./components/WithdrawalPage"

function App() {
  const location = useLocation();

  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("pageFadeIn");

  useEffect(() => {
    if (location !== displayLocation) setTransistionStage("pageFadeOut");
  }, [location, displayLocation]);

  return (
    <div
      className={`full-height ${transitionStage}`}
      onAnimationEnd={() => {
        if (transitionStage === "pageFadeOut") {
          setTransistionStage("pageFadeIn");
          setDisplayLocation(location);
        }
      }}
    >
      <Routes location={displayLocation}>
        <Route path="/" element={<Index />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/wallets" element={<Wallets />} />
        <Route path="/withdrawal" element={<WithdrawalPage />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
