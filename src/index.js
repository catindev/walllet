import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "AuthContext";
import { UserProvider } from "UserContext";
import { SignProvider } from "components/Sign/SignContext"
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import Index from "./components/LandingPage/LandingPage";
import SignIn from "./components/Sign/SignInPage";
import SignUp from "./components/Sign/SignUp/SignUpPage";
import CheckCode from "./components/Sign/SignUp/CheckCodePage";
import Registration from "components/Sign/SignUp/RegistrationPage";
import Wallets from "./components/Wallets/WalletsPage";
import WithdrawalPage from "./components/Withdrawal/WithdrawalPage";
import PaymentsPage from "components/Payments/PaymentsPage";
import ToWalletPage from "./components/Withdrawal/ToWalletPage";
import IdentityPage from "components/Identity/IdentityPage";
import PlugPage from "components/Plug/PlugPage";

function App() {
  const location = useLocation();

  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("pageFadeIn");

  useEffect(() => {
    if (location !== displayLocation) setTransistionStage("pageFadeOut");
  }, [location, displayLocation]);

  const onAnimationEnd = () => {
    if (transitionStage === "pageFadeOut") {
      setTransistionStage("pageFadeIn");
      setDisplayLocation(location);
    }
  }

  return (
    <div className={`full-height ${transitionStage}`} onAnimationEnd={onAnimationEnd}>
      <Routes location={displayLocation}>
        <Route path="/" element={<Index />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup/code" element={<CheckCode />} />
        <Route path="/signup/finish" element={<Registration />} />
        <Route path="/password/reset" element={<PlugPage />} />
        <Route path="/wallets" element={<Wallets />} />
        <Route path="/wallet/:id" element={<PlugPage />} />
        <Route path="/identity" element={<IdentityPage />} />
        <Route path="/topup" element={<PlugPage />} />
        <Route path="/withdrawal" element={<WithdrawalPage />} />
        <Route path="/withdrawal/to/wallet" element={<ToWalletPage />} />
        <Route path="/withdrawal/to/card" element={<PlugPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/payments/catalog" element={<PlugPage />} />
        <Route path="/invoice" element={<PlugPage />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <SignProvider>
          <Router>
            <App />
          </Router>
        </SignProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
