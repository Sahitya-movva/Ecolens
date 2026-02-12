import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function QRScanner({ onScan, onClose }) {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(
      (decodedText) => {
        scanner.clear();
        onScan(decodedText);
      },
      (error) => {
        // ignore scan errors
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [onScan]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "14px",
          width: "360px",
          textAlign: "center"
        }}
      >
        <h3>Scan Product QR Code</h3>
        <div id="qr-reader" style={{ width: "100%" }}></div>

        <button
          className="primary-btn"
          style={{ marginTop: "12px" }}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default QRScanner;
