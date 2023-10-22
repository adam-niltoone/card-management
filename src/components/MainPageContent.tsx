import "../App.css";
import { useEffect, useState } from "react";
import Footer from "./footer";
import { Link } from "react-router-dom";

type Note = {
  id: number;
  title: string;
  content: string;
};

const MainPageContent = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/notes");
        const notes: Note[] = await response.json();

        setNotes(notes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotes();
  }, []);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleAddNote = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      });

      const newNote = await response.json();

      setNotes([newNote, ...notes]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateNote = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedNote) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/api/notes/${selectedNote.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
          }),
        }
      );

      const updatedNotes = await response.json();

      const updatedNotesList = notes.map((note) =>
        note.id === selectedNote.id ? updatedNotes : note
      ); // map

      setNotes(updatedNotesList);
      setTitle("");
      setContent("");
      setSelectedNote(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  }; // handleCancel

  const deleteNote = async (event: React.MouseEvent, noteId: number) => {
    event.stopPropagation(); // stop event bubbling

    try {
      await fetch(`http://localhost:5001/api/notes/${noteId}`, {
        method: "DELETE",
      });
      const updatedNotes = notes.filter((note) => note.id !== noteId);
      setNotes(updatedNotes);
    } catch (error) {}
  }; // deleteNote

  return (
    <div>
      <header className="bg-blue-600 p-2 rounded-lg shadow-md text-white text-center font-extrabold ">
        Note-App
      </header>
      <div className="flex h-screen p-1 space-x-5">
        <form
          className="flex flex-col flex-none space-y-4  pt-2"
          onSubmit={(event) =>
            selectedNote ? handleUpdateNote(event) : handleAddNote(event)
          }
        >
          <input
            className="border rounded-lg p-2 w-full"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Title"
            required
          />
          <textarea
            className="border rounded-lg p-2 h-48"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Content"
            rows={10}
            required
          />
          {selectedNote ? (
            <div className="flex space-x-2">
              <button
                type="submit"
                className="flex-1 bg-blue-700 text-white rounded p-2"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-red-600 text-white rounded p-2"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white rounded-lg p-2"
            >
              Add Card
            </button>
          )}

          {/* Dropdown button */}
          <button
            className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Dropdown button
            <svg
              className="w-2.5 h-2.5 ml-9"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {/* Dropdown menu */}
          <div
            className={`z-10 ${
              dropdownOpen ? "block" : "hidden"
            } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 mt-2`}
            aria-labelledby="dropdownDefaultButton"
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <Link
                  to="/demo-drag-drop"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Demo DragNDrop 🧠
                </Link>
              </li>
              <li>
                <a
                  href="/"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Back
                </a>
              </li>
            </ul>
          </div>
        </form>
        <div className="flex-2 overflow-y-auto bg-gray-200 p-3 mt-2 rounded-lg shadow">
          <div className="grid grid-cols-1 gap-10 overflow-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {notes.map((note) => (
              <div
                className="flex flex-col border rounded-lg p-4 bg-white shadow hover:bg-yellow-200 transition cursor-pointer "
                onClick={() => handleNoteClick(note)}
              >
                <div className="flex justify-end">
                  <button
                    onClick={(event) => deleteNote(event, note.id)}
                    className="text-xl"
                  >
                    x
                  </button>
                </div>
                <h2 className="text-xl pb-2 font-bold text-left">
                  {note.title}
                </h2>
                <p className="text-sm p-sm text-left">{note.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainPageContent;
