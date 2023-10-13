import {useState} from "react";
import "./App.css"

type Note = {
  id: number;
  title: string;
  content: string;
};  

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Sprint 1",
      content: "Sprint 1 Content",
    },
    {
      id: 2,
      title: "Card title 2",
      content: "Content 2",
    },
    {
      id: 3,
      title: "Card title 3",
      content: "Content 3",
    },
    {
      id: 4,
      title: "Card title 4",
      content: "Content 4",
    },
  ]);

  const[title, setTitle] = useState("");
  const[content, setContent] = useState("");

  const [selectedNote, setSelectedNote] = 
    useState<Note | null>(null);

  const handleNoteClick = (note: Note) => {
    setSelectedNote (note);
    setTitle(note.title);
    setContent(note.content);
  }

  const handleAddNote = (
    event: React.FormEvent
    ) => {
      event.preventDefault();

      const newNote: Note = {
        id: notes.length + 1,
        title: title,
        content: content,
    };

    setNotes([...notes, newNote]);
    setTitle("");
    setContent("");
  };

  const handleUpdateNote = (
    event: React.FormEvent
    ) => {
      event.preventDefault();

      if(!selectedNote) {
        return; 
      }

      const updatedNotes: Note = {
        id: selectedNote.id,
        title: title, 
        content: content,
      } // updatedNotes

      const updatedNotesList = notes.map((note) => 
        note.id === selectedNote.id 
        ? updatedNotes 
        : note
      ) // map

      setNotes(updatedNotesList);
      setTitle("");
      setContent("");
      setSelectedNote (null);
    }; 

    const handleCancel = () => {
      setTitle("");
      setContent("");
      setSelectedNote (null);
    } // handleCancel

    const deleteNote =  (
      event: React.MouseEvent,
      noteId: number 
    ) => {
      event.stopPropagation(); // stop event bubbling

      const updatedNotes = notes.filter(
        (note) => note.id !== noteId
      )
      setNotes(updatedNotes);
    };  // deleteNote

  return (
    <div className="app-container">
      <form 
        className ="note-form" 
        onSubmit={(event)=> 
          selectedNote
            ? handleUpdateNote(event)
            : handleAddNote (event)
        }
      >
        <input
        value={title}
        onChange={(event) => 
          setTitle(event.target.value)
        }
        placeholder="Title"
        required>
        </input>
        <textarea
        value={content}
        onChange={(event) => 
          setContent(event.target.value)
        }
        placeholder="Content"
        rows={10}
        required> 
        </textarea>
        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>
              Cancel
              </button>
          </div>
        ) : (
           <button type="submit">Add Card</button>
          )}

        
        </form>
        <div 
          className="notes-grid">
          {notes.map((note) => (
          <div 
            className="note-item"
            onClick={() => handleNoteClick(note)}
            >
            <div className="note-header">
              <button
                onClick={(event) =>
                  deleteNote (event, note.id)
                }
              >
              x
              </button>
          </div>
          <h2>{note.title} </h2>
          <p>{note.content}</p>
        </div>
          ))}
      </div>
    </div>
  );
};

export default App;