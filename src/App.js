import React, { Component } from "react";

import Header from "./Header.js";
import NotesList from "./NotesList.js";

class App extends Component {
  state = {
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true
      }
    ],
    searchText: ""
  };

  // Saving the state to local storage after re-render. Need to save added notes, deleted notes, and new text
  componentDidUpdate() {
    const savedNotesString = JSON.stringify(this.state.notes);
    localStorage.setItem("savedNotes", savedNotesString);
  }

  // Pulling saved state from local storage when user reopens UI.
  componentDidMount() {
    const savedNotesString = localStorage.getItem("savedNotes");
    // Set state to value from previous session. Need to pull all notes saved from last session.
    if (savedNotesString) {
      const savedNotes = JSON.parse(savedNotesString);
      this.setState({ notes: savedNotes });
    }
  }

  addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };
    const newNotes = [newNote, ...this.state.notes];
    this.setState({ notes: newNotes });
  };

  onType = (editMeId, updatedKey, updatedValue) => {
    const updatedNotes = this.state.notes.map((note) => {
      if (note.id !== editMeId) {
        return note;
      } else {
        if (updatedKey === "title") {
          note.title = updatedValue;
          return note;
        } else {
          note.description = updatedValue;
          return note;
        }
      }
    });
    this.setState({ notes: updatedNotes });
  };

  onSearch = (text) => {
    const newSearchText = text.toLowerCase();
    const updatedNotes = this.state.notes.map((note) => {
      if (!newSearchText) {
        note.doesMatchSearch = true;
        return note;
      } else {
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();
        const titleMatch = title.includes(newSearchText);
        const descriptionMatch = description.includes(newSearchText);
        const hasMatch = titleMatch || descriptionMatch;
        note.doesMatchSearch = hasMatch;
        return note;
      }
    });
    this.setState({ searchText: newSearchText, notes: updatedNotes });
  };

  deleteNote = (noteId) => {
    // remove notes from notes array, must identify which note by note id
    const updatedNotes = this.state.notes.filter((note) => note.id !== noteId);
    // set state with updated array
    this.setState({ notes: updatedNotes });
  };

  render() {
    return (
      <div className="body">
        <Header
          searchText={this.state.searchText}
          addNote={this.addNote}
          onSearch={this.onSearch}
        />
        <NotesList
          notes={this.state.notes}
          onType={this.onType}
          deleteNote={this.deleteNote}
        />
      </div>
    );
  }
}

export default App;
