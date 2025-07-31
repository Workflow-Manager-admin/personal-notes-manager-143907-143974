import React from "react";
import { theme } from "../theme";

// PUBLIC_INTERFACE
/** 
 * TopBar is the main navigation/header bar.
 * @param {string} searchValue - Current search value
 * @param {function(string): void} onSearchChange - Handler for changes to the search input
 */
function TopBar({ searchValue, onSearchChange }) {
  return (
    <header
      style={{
        width: "100%",
        height: theme.layout.topbarHeight,
        backgroundColor: theme.colors.primary,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        padding: "0 28px",
        justifyContent: "space-between",
        boxSizing: "border-box",
        boxShadow: "0 2px 4px 0 rgba(0,0,0,0.04)"
      }}
    >
      <div style={{ fontWeight: 700, fontSize: "1.20rem", letterSpacing: ".5px" }}>
        📝 NotesApp
      </div>
      <div style={{ minWidth: 300, display: "flex", alignItems: "center" }}>
        <input
          type="search"
          aria-label="Search notes"
          placeholder="Search notes..."
          value={searchValue}
          onChange={e => onSearchChange(e.target.value)}
          style={{
            width: 220,
            padding: "7px 13px",
            border: "none",
            borderRadius: 5,
            outline: "none",
            fontSize: "1rem",
            background: "#fff",
            color: theme.colors.textPrimary,
            marginRight: 15,
            boxShadow: "0 1px 1px 0 rgba(25, 118, 210, 0.04)",
          }}
        />
      </div>
    </header>
  );
}
export default TopBar;
