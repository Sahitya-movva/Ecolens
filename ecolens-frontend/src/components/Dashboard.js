import { useState } from "react";
import Navbar from "./Navbar";
import SingleClaim from "./SingleClaim";
import CompareClaims from "./CompareClaims";
import EducationalMode from "./EducationalMode";

function Dashboard() {
  const [mode, setMode] = useState("single");

  return (
    <div className="dashboard-bg">
      <Navbar setMode={setMode} />
      <div className="dashboard-container">
        {mode === "single" && <SingleClaim />}
        {mode === "compare" && <CompareClaims />}
        {mode === "learn" && <EducationalMode />}
      </div>
    </div>
  );
}

export default Dashboard;
