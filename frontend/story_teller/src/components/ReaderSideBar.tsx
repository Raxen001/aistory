import React, { useState, useEffect, useRef } from "react";
import { Reader } from "../../../../foliate-js/reader.js";

const ReaderSideBar: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Toggle sidebar visibility and overlay
  const toggleSidebar = () => setVisible((v) => !v);

  // Close sidebar when clicking outside or on overlay
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        visible &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node) &&
        overlayRef.current &&
        overlayRef.current.contains(e.target as Node)
      ) {
        setVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [visible]);

  return (
    <>
      {/* Button to toggle sidebar */}
      <div
        id="side-bar-button"
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 1100,
          cursor: "pointer",
          backgroundColor: "rgba(255 255 255 / 0.8)",
          borderRadius: 8,
          padding: "0.3rem 0.6rem",
          userSelect: "none",
        }}
        onClick={toggleSidebar}
        role="button"
        aria-pressed={visible}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") toggleSidebar();
        }}
      >
        ☰
      </div>

      {/* Overlay dims background when sidebar visible */}
      <div
        id="dimming-overlay"
        ref={overlayRef}
        style={{
          display: visible ? "block" : "none",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          zIndex: 1000,
        }}
      />

      {/* Sidebar panel */}
      <aside
        id="side-bar"
        ref={sidebarRef}
        style={{
          position: "fixed",
          top: 0,
          right: visible ? 0 : "-50vw",
          width: "50vw",
          height: "100vh",
          maxWidth: 600,
          backgroundColor: "#f9f9f9",
          borderLeft: "1px solid #ccc",
          boxShadow: "-2px 0 8px rgba(0,0,0,0.15)",
          padding: "1.5rem",
          overflowY: "auto",
          transition: "right 0.3s ease-in-out",
          zIndex: 1050,
        }}
        aria-hidden={!visible}
      >
        <div id="side-bar-title" style={{ fontWeight: "bold", marginBottom: 12 }} />
        <div id="side-bar-author" style={{ color: "#666", marginBottom: 12 }} />
        {/* Uncomment if you want to show cover */}
        <img id="side-bar-cover" alt="Cover" style={{ width: "100%", marginBottom: 16 }} />
        <nav id="toc-view" />
      </aside>
    </>
  );
};

export default ReaderSideBar;
