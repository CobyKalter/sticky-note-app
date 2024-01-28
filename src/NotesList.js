import React from "react";
import Note from "./Note.js";

const NotesList = (props) => {
  const searchMatches = (note) => note.doesMatchSearch;
  const searchMatchFilter = props.notes.filter(searchMatches);
  const renderNote = (note) => (
    <Note
      note={note}
      key={note.id}
      onType={props.onType}
      deleteNote={props.deleteNote}
    />
  );
  const noteElements = searchMatchFilter.map(renderNote);
  return <ul className="notes-list">{noteElements}</ul>;
};

export default NotesList;
