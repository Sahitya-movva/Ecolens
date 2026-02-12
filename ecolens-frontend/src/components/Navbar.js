import EcoLensLogo from "../assets/ecolens-logo1.png";

function Navbar({ setMode }) {
  return (
    <div className="navbar">
      <div
        className="logo-container"
        onClick={() => setMode("analyze")}
        style={{ cursor: "pointer" }}
      >
        <img
          src={EcoLensLogo}
          alt="EcoLens Logo"
          className="nav-logo"
        />

        <div className="logo-text">
          <span className="brand-name">EcoLens</span>
          <span className="tagline">See Through Sustainability</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
