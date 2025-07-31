import React, { useState, useRef, useEffect } from "react";
import { theme } from "../theme";

// PUBLIC_INTERFACE
/**
 * NoteEditor - allows editing or creating a note
 * @param {object|null} note - the note to edit, or null for new note
 * @param {function({title, content, tags}): void} onSave
 * @param {function(): void} onCancel
 * @param {function(): void=} onDelete
 * @param {boolean} isNew - if true, we're creating a new note
 */
function NoteEditor({ note, onSave, onCancel, onDelete, isNew }) {
  const [title, setTitle] = useState(note ? note.title : "");
  const [content, setContent] = useState(note ? note.content : "");
  const [tags, setTags] = useState(note ? note.tags : []);
  const [tagInput, setTagInput] = useState("");
  const contentRef = useRef(null);

  useEffect(() => {
    setTitle(note ? note.title : "");
    setContent(note ? note.content : "");
    setTags(note ? note.tags : []);
  }, [note]);

  // PUBLIC_INTERFACE
  function handleAddTag() {
    let tag = tagInput.trim();
    if (tag.length && !tags.includes(tag)) {
      setTags(t => [...t, tag]);
      setTagInput("");
    }
  }

  // PUBLIC_INTERFACE
  function handleRemoveTag(tag) {
    setTags(tags.filter(t => t !== tag));
  }

  // PUBLIC_INTERFACE
  function handleSubmit(e) {
    e.preventDefault();
    onSave({ title: title.trim(), content, tags });
  }

  useEffect(() => {
    if (isNew && contentRef.current) {
      // Focus content field for new notes
      contentRef.current.focus();
    }
  }, [isNew]);

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        padding: "24px 36px 22px 26px",
        borderRadius: 7,
        minHeight: 330,
        margin: "24px 18px 34px 10px",
        boxShadow: "0 4px 14px 0 rgba(25,118,210,0.056)"
      }}
      onSubmit={handleSubmit}
      aria-label={isNew ? "New note editor" : "Edit note"}
    >
      <input
        style={{
          border: "none",
          borderBottom: `1.5px solid ${theme.colors.primary}`,
          fontSize: "1.35rem",
          color: theme.colors.textPrimary,
          fontWeight: 700,
          outline: "none",
          marginBottom: 14,
          background: "inherit",
          padding: "5px 9px 7px 0"
        }}
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        aria-label="Note title"
        maxLength={120}
      />
      <textarea
        ref={contentRef}
        style={{
          border: `1px solid ${theme.colors.border}`,
          borderRadius: 5,
          fontSize: "1.05rem",
          minHeight: 120,
          maxHeight: 340,
          padding: "8px 9px",
          marginBottom: 8,
          resize: "vertical"
        }}
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Write something..."
        aria-label="Note content"
      />
      <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
        <input
          type="text"
          value={tagInput}
          onChange={e => setTagInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' ? (e.preventDefault(), handleAddTag()) : undefined}
          placeholder="Add tag"
          style={{
            border: `1px solid ${theme.colors.primary}`,
            borderRadius: 4,
            fontSize: "0.96rem",
            padding: "3px 7px",
            width: 100,
            marginRight: 9
          }}
          aria-label="Add tag"
        />
        <button
          type="button"
          onClick={handleAddTag}
          style={{
            background: theme.colors.primary,
            color: "#fff",
            border: "none",
            borderRadius: 5,
            padding: "3px 16px",
            fontSize: "0.97rem",
            fontWeight: 500,
            cursor: "pointer",
            marginRight: 12
          }}
        >Add</button>
        <div>
          {tags.map(tag => (
            <span
              key={tag}
              style={{
                background: theme.colors.tagBg,
                color: theme.colors.tagText,
                borderRadius: 5,
                fontSize: "0.91rem",
                padding: "2px 9px 2.5px 8px",
                marginRight: 7,
                display: "inline-flex",
                alignItems: "center"
              }}
            >
              #{tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                aria-label={`Remove tag ${tag}`}
                style={{
                  background: "none",
                  border: "none",
                  color: "#e53935",
                  fontWeight: 700,
                  fontSize: "1em",
                  marginLeft: 3,
                  cursor: "pointer"
                }}
                title="Remove tag"
              >×</button>
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 5 }}>
        <button
          type="submit"
          style={{
            background: theme.colors.primary,
            color: "#fff",
            border: "none",
            borderRadius: 5,
            padding: "7px 22px",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: "pointer",
            marginRight: 7
          }}
        >
          {isNew ? "Create" : "Save"}
        </button>
        <button
          type="button"
          style={{
            background: "#efefef",
            color: theme.colors.secondary,
            border: "none",
            borderRadius: 5,
            padding: "7px 12px",
            fontSize: "1rem",
            fontWeight: 500,
            cursor: "pointer"
          }}
          onClick={onCancel}
        >Cancel</button>
        {!!onDelete && !isNew &&
          <button
            type="button"
            style={{
              background: "#fff",
              color: "#e53935",
              border: `1.3px solid #e53935`,
              borderRadius: 5,
              padding: "7px 17px",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer"
            }}
            onClick={() => window.confirm("Delete this note?") && onDelete()}
          >Delete</button>
        }
      </div>
    </form>
  );
}
export default NoteEditor;
