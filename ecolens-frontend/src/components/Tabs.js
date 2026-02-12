function Tabs({ mode, setMode }) {
  const tabs = [
    { id: "analyze", label: "Analyze Claim" },
    { id: "compare", label: "Compare Claims" },
    { id: "learn", label: "Learn" }
  ];

  return (
    <div className="tabs" role="tablist" aria-label="EcoLens navigation">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={mode === tab.id}
          className={`tab-btn ${mode === tab.id ? "active" : ""}`}
          onClick={() => setMode(tab.id)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setMode(tab.id);
            }
          }}
        >
          <span className="tab-icon">{tab.icon}</span>
          <span className="tab-label">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

export default Tabs;
