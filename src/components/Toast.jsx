import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const { message, type = "success" } = toast;

  const icons = {
    success: <CheckCircle2 size={18} color="#10B981" />,
    error: <AlertCircle size={18} color="#EF4444" />,
    info: <Info size={18} color="#3B82F6" />
  };

  const bgColors = {
    success: "#ECFDF5",
    error: "#FEF2F2",
    info: "#EFF6FF"
  };

  const borderColors = {
    success: "#A7F3D0",
    error: "#FECACA",
    info: "#BFDBFE"
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 1100,
        backgroundColor: bgColors[type] || "#FFFFFF",
        border: `1px solid ${borderColors[type] || "#CBD5E1"}`,
        borderRadius: "8px",
        padding: "12px 16px",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        maxWidth: "400px",
        animation: "slideIn 0.2s ease"
      }}
    >
      {icons[type]}
      <span style={{ fontSize: "0.9rem", color: "#1F2937", fontWeight: 500, flex: 1 }}>
        {message}
      </span>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#9CA3AF",
            padding: "2px"
          }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
