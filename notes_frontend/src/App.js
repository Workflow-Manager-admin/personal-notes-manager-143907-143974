import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import { theme } from "./theme";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import NotesList from "./components/NotesList";
import NoteEditor from "./components/NoteEditor";
import NotePreview from "./components/NotePreview";
import { useEnv } from "./useEnv";

/**
 * Generate a random ID for mock notes
 */
function genId() {
  return "_" + Math.random().toString(36).substr(2, 9) + Date.now();
}

// PUBLIC_INTERFACE
function App() {
  // State: List of notes, each: {id, title, content, tags: [] }
  const [notes, setNotes] = useState([]);
  // App state for UI
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tagFilter, setTagFilter] = useState(null);

  // Environment variable demonstration (even if none defined)
  const demoEnv = useEnv("DEMO_ENV_VAR", ""); // fallback optional

  // On mount: load notes from local storage
  useEffect(() => {
    const saved = window.localStorage.getItem("notes");
    if (saved) {
      try { setNotes(JSON.parse(saved)); }
      catch { }
    }
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    window.localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Derived: filtered notes by tag and search
  const filteredNotes = useMemo(() => {
    let out = notes;
    if (tagFilter) out = out.filter(n => n.tags && n.tags.includes(tagFilter));
    if (searchQuery.trim()) {
      // Search in title, content, tags
      const q = searchQuery.trim().toLowerCase();
      out = out.filter(
        n =>
          (n.title && n.title.toLowerCase().includes(q)) ||
          (n.content && n.content.toLowerCase().includes(q)) ||
          (n.tags || []).some(tag => tag.toLowerCase().includes(q))
      );
    }
    return out.sort((a, b) => b.updatedAt - a.updatedAt); // Newest first
  }, [notes, tagFilter, searchQuery]);

  // Get all unique tags
  const allTags = useMemo(
    () => [...new Set([].concat(...notes.map(n => n.tags || [])))].sort(),
    [notes]
  );

  // Selected note object
  const selectedNote = useMemo(
    () => notes.find(n => n.id === selectedNoteId) || null,
    [notes, selectedNoteId]
  );

  // PUBLIC_INTERFACE
  function handleCreateNew() {
    setIsEditing(true);
    setSelectedNoteId(null);
  }

  // PUBLIC_INTERFACE
  function handleNoteSelect(noteId) {
    setSelectedNoteId(noteId);
    setIsEditing(false);
  }

  // PUBLIC_INTERFACE
  function handleDeleteNote(noteId) {
    if (!window.confirm("Delete this note?")) return;
    setNotes(notes.filter(n => n.id !== noteId));
    if (selectedNoteId === noteId) setSelectedNoteId(null);
    setIsEditing(false);
  }

  // PUBLIC_INTERFACE
  function handleSaveNote(data) {
    // New
    if (selectedNoteId === null) {
      const newNote = {
        id: genId(),
        title: data.title,
        content: data.content,
        tags: data.tags,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      setNotes([newNote, ...notes]);
      setSelectedNoteId(newNote.id);
    } else {
      // Update existing note
      setNotes(
        notes.map(n =>
          n.id === selectedNoteId
            ? { ...n, ...data, updatedAt: Date.now() }
            : n
        )
      );
    }
    setIsEditing(false);
  }

  // PUBLIC_INTERFACE
  function handleEditNote() {
    setIsEditing(true);
  }

  // PUBLIC_INTERFACE
  function handleCancelEdit() {
    setIsEditing(false);
  }

  // PUBLIC_INTERFACE
  function handleSetSearch(q) {
    setSearchQuery(q);
  }

  // PUBLIC_INTERFACE
  function handleSelectTag(tag) {
    setTagFilter(tag);
    setSelectedNoteId(null);
    setIsEditing(false);
  }

  // PUBLIC_INTERFACE
  function handleStartEditFromPreview() {
    setIsEditing(true);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.colors.bgPrimary,
        color: theme.colors.textPrimary
      }}
    >
      {/* TopBar */}
      <TopBar searchValue={searchQuery} onSearchChange={handleSetSearch} />
      <div style={{ display: "flex", height: "calc(100vh - 56px)" }}>
        {/* Sidebar */}
        <Sidebar
          tags={allTags}
          selectedTag={tagFilter}
          onSelectTag={handleSelectTag}
        />
        {/* Main: Notes List + details */}
        <main style={{
          flex: 1,
          display: "flex",
          minHeight: "calc(100vh - 56px)",
          background: theme.colors.bgSecondary
        }}>
          {/* Notes list */}
          <div style={{
            width: 355,
            minWidth: 280,
            maxWidth: 400,
            background: "#fff",
            borderRight: `1.5px solid ${theme.colors.border}`,
            boxShadow: "0 0 8px 0 rgba(25,118,210,0.03)"
          }}>
            <button
              onClick={handleCreateNew}
              style={{
                width: "94%",
                margin: "12px 3%",
                padding: "0.7em 0",
                borderRadius: 7,
                fontWeight: 700,
                color: "#fff",
                border: "none",
                background: theme.colors.primary,
                fontSize: "1rem",
                boxShadow: "0 2px 3.5px 0 rgba(25,118,210,0.078)",
                cursor: "pointer"
              }}
            >
              + New Note
            </button>
            <NotesList
              notes={filteredNotes}
              selectedNoteId={selectedNoteId}
              onSelectNote={handleNoteSelect}
              onDeleteNote={handleDeleteNote}
            />
          </div>
          {/* Detail/Editor */}
          <section style={{
            flex: 1,
            display: "flex",
            alignItems: "flex-start"
          }}>
            {isEditing ? (
              <NoteEditor
                note={selectedNoteId && selectedNote ? selectedNote : null}
                onSave={handleSaveNote}
                onCancel={handleCancelEdit}
                onDelete={selectedNoteId ? () => handleDeleteNote(selectedNoteId) : undefined}
                isNew={selectedNoteId === null}
              />
            ) : (
              <div style={{ width: "100%" }}>
                <NotePreview note={selectedNote} />
                {(selectedNote && (
                  <div
                    style={{
                      marginLeft: "20px",
                      marginBottom: "18px"
                    }}
                  >
                    <button
                      style={{
                        background: theme.colors.primary,
                        color: "#fff",
                        border: "none",
                        borderRadius: 6,
                        padding: "8px 26px",
                        fontWeight: 600,
                        fontSize: "1rem",
                        cursor: "pointer",
                        marginRight: 10
                      }}
                      onClick={handleEditNote}
                    >Edit</button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
