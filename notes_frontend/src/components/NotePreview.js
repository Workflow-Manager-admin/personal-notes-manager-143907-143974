import React from "react";
import { theme } from "../theme";

// PUBLIC_INTERFACE
/**
 * Displays detailed preview of a single note (read-only)
 * @param {object} note - note object
 */
function NotePreview({ note }) {
  if (!note) return (
    <div style={{ color: theme.colors.textSecondary, padding: 40, fontSize: "1.08rem", opacity: 0.7 }}>
      Select a note from the list to preview.
    </div>
  );
  return (
    <section style={{
      background: "#fff",
      padding: "36px 34px 40px 28px",
      minHeight: 330,
      margin: "30px 18px 30px 11px",
      borderRadius: 8,
      boxShadow: "0 4px 14px 0 rgba(25,118,210,0.045)"
    }}>
      <h2 style={{
        marginTop: 0,
        color: theme.colors.primary,
        fontWeight: 700,
        fontSize: "1.22rem"
      }}>
        {note.title || "(untitled)"}
      </h2>
      <div style={{
        fontSize: "1.06rem",
        minHeight: "80px",
        color: "#515151",
        marginBottom: 18
      }}>
        {(note.content || "").split("\n").map((line, i) => (
          <span key={i}>
            {line}
            <br />
          </span>
        ))}
      </div>
      <div>
        {note.tags && note.tags.map(tag => (
          <span
            key={tag}
            style={{
              background: theme.colors.tagBg,
              color: theme.colors.tagText,
              borderRadius: 5,
              fontSize: "0.94rem",
              padding: "2.5px 10px 3px 10px",
              marginRight: 11
            }}
          >
            #{tag}
          </span>
        ))}
      </div>
    </section>
  );
}
export default NotePreview;
