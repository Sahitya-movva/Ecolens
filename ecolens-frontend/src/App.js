import { useEffect, useState } from "react";
import SplashScreen from "./components/SplashScreen";
import Navbar from "./components/Navbar";
import Tabs from "./components/Tabs";
import SingleClaim from "./components/SingleClaim";
import CompareClaims from "./components/CompareClaims";
import EducationalMode from "./components/EducationalMode";
import "./styles.css";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [mode, setMode] = useState("analyze");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 10000); // 10 seconds splash

    return () => clearTimeout(timer);
  }, []);

  // Splash Screen
  if (showSplash) {
    return <SplashScreen />;
  }

  // Main App
  return (
    <div className="app-bg">
      <Navbar mode={mode} setMode={setMode} />
      <Tabs mode={mode} setMode={setMode} />

      <div className="content">
        {mode === "analyze" && <SingleClaim />}
        {mode === "compare" && <CompareClaims />}
        {mode === "learn" && <EducationalMode />}
      </div>
    </div>
  );
}

export default App;
