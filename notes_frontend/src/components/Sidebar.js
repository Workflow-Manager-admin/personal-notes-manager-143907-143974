import React from "react";
import { theme } from "../theme";

// PUBLIC_INTERFACE
/**
 * Sidebar provides a list of tags ("folders") to filter notes
 * @param {string[]} tags - Array of tag names
 * @param {string|null} selectedTag - Currently selected tag, or null for all notes
 * @param {function(string|null): void} onSelectTag - Callback for tag selection
 */
function Sidebar({ tags, selectedTag, onSelectTag }) {
  return (
    <aside
      style={{
        width: theme.layout.sidebarWidth,
        background: theme.colors.sidebarBg,
        borderRight: `1px solid ${theme.colors.border}`,
        padding: "0.8rem 0.5rem",
        minHeight: "calc(100vh - 0px)"
      }}
    >
      <div style={{
        fontWeight: 600,
        fontSize: "1.04rem",
        padding: "1.0rem 0.4rem 0.7rem",
        letterSpacing: ".2px",
        color: theme.colors.textSecondary
      }}>
        Folders / Tags
      </div>

      <button
        style={{
          background: !selectedTag ? theme.colors.primary : "#fff",
          color: !selectedTag ? "#fff" : theme.colors.primary,
          border: `1.5px solid ${theme.colors.primary}`,
          borderRadius: 6,
          width: "94%",
          padding: "7px 4px",
          marginLeft: "3%",
          marginBottom: "16px",
          fontWeight: "500",
          cursor: "pointer",
          marginTop: "0.5em"
        }}
        onClick={() => onSelectTag(null)}
      >
        All Notes
      </button>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {tags.length === 0 && (
          <li style={{
            color: theme.colors.textSecondary,
            fontSize: "0.95rem",
            opacity: 0.75,
            padding: "4px 18px"
          }}>(no tags yet)</li>
        )}
        {tags.map(tag => (
          <li key={tag}>
            <button
              style={{
                display: "block",
                width: "90%",
                margin: "5px 7px 5px 7px",
                padding: "7px 5px",
                borderRadius: 6,
                border: selectedTag === tag ? `2px solid ${theme.colors.accent}` : "1.5px solid #e0e4e9",
                background: selectedTag === tag ? theme.colors.accent : "#fff",
                color: selectedTag === tag ? theme.colors.secondary : theme.colors.primary,
                fontWeight: (selectedTag === tag ? '600' : '500'),
                cursor: "pointer",
                fontSize: "0.97rem",
                transition: "background .20s"
              }}
              onClick={() => onSelectTag(tag)}
            >
              #{tag}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
export default Sidebar;
