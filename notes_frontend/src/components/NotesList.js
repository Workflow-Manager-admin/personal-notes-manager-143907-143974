import React from "react";
import { theme } from "../theme";

// PUBLIC_INTERFACE
/**
 * NotesList displays a list of notes with short preview.
 * @param {Array} notes - notes to list
 * @param {string|null} selectedNoteId
 * @param {function(string): void} onSelectNote
 * @param {function(string): void} onDeleteNote
 */
function NotesList({ notes, selectedNoteId, onSelectNote, onDeleteNote }) {
  return (
    <div style={{
      width: "100%",
      minHeight: "100%",
      background: "#ffffff",
      borderRight: `1px solid ${theme.colors.border}`,
      overflowY: "auto"
    }}>
      <div style={{
        fontWeight: 600,
        color: theme.colors.primary,
        padding: "12px 18px 6px 20px",
        fontSize: "1.09rem"
      }}>
        Notes
      </div>
      <ul style={{ listStyle: "none", padding: "5px 0", margin: 0 }}>
        {notes.length === 0 && (
          <li style={{
            color: theme.colors.textSecondary,
            fontSize: "0.98rem",
            opacity: 0.72,
            padding: "6px 16px"
          }}>(no notes found)</li>
        )}
        {notes.map(note => (
          <li
            key={note.id}
            style={{
              margin: "0 0 6px 0",
              padding: "0",
            }}
          >
            <div
              style={{
                background: note.id === selectedNoteId ? theme.colors.noteBgActive : "#f9fbfd",
                borderRadius: 7,
                padding: "9px 7px 6px 12px",
                margin: "0 10px 0 10px",
                border: note.id === selectedNoteId ? `2px solid ${theme.colors.primary}` : `1.5px solid #eef0f7`,
                boxShadow: note.id === selectedNoteId ? "0 1px 6px 0 rgba(25,118,210,0.06)" : "none",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                justifyContent: "space-between"
              }}
              onClick={() => onSelectNote(note.id)}
              tabIndex={0}
              role="button"
              aria-pressed={note.id === selectedNoteId}
              aria-label={`View note ${note.title}`}
            >
              <div style={{ flex: 1, textAlign: "left" }}>
                <div style={{
                  fontSize: "1.06rem",
                  fontWeight: 600,
                  color: theme.colors.secondary,
                  marginBottom: 1,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis"
                }}>
                  {note.title || "(untitled)"}
                </div>
                <div style={{
                  fontSize: "0.98rem",
                  color: "#6b6b6b",
                  maxWidth: "24em",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}>
                  {(note.content || "").replace(/\n/g, " ").substring(0, 60)}
                  {note.content && note.content.length > 60 ? "..." : ""}
                </div>
                <div style={{ marginTop: 2 }}>
                  {note.tags && note.tags.map(tag => (
                    <span
                      key={tag}
                      style={{
                        background: theme.colors.tagBg,
                        color: theme.colors.tagText,
                        borderRadius: 4,
                        padding: "1.5px 8px",
                        fontSize: "0.84rem",
                        fontWeight: 500,
                        marginRight: 7
                      }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={e => (e.stopPropagation(), onDeleteNote(note.id))}
                style={{
                  background: "none",
                  border: "none",
                  color: "#e53935",
                  fontWeight: 700,
                  fontSize: "1.2em",
                  cursor: "pointer",
                  marginLeft: 8,
                  padding: "3px 0"
                }}
                title="Delete note"
                aria-label={`Delete note ${note.title}`}
              >✕</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default NotesList;
