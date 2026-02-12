import { useEffect, useState } from "react";
import EcoLensLogo from "../assets/ecolens-logo.png";

function SplashScreen({ fadeOut }) {
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTagline(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    
    <div className={`splash-screen ${fadeOut ? "fade-out" : ""}`}>  
      <img
        src={EcoLensLogo}
        alt="EcoLens Logo"
        className="splash-logo"
      />
      <p className="splash-tagline">
        Where Green Meets Truth
      </p>

      <div className="loader"></div>


    </div>
    
  );
}

export default SplashScreen;