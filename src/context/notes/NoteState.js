import { useState, useEffect } from "react";
import NoteContext from "./nodeContext";
import { useNavigate } from "react-router-dom";


const NoteState = (props) => {

  const host = "http://localhost:5000";
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]); 
  const [alert, setAlert] = useState({ message: '', type: '', show: false });

  
  const showAlert = (message, type) => {
    setAlert({ message, type, show: true });
    setTimeout(() => setAlert({ ...alert, show: false }), 3000);
    return true;
  };

  
  const getNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${host}/api/notes/getnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token ,
        }
      });

      const json = await response.json();

      if (Array.isArray(json)) {
        setNotes(json);
      } else {
        setNotes([]);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
      setNotes([]);
    }
  };
  

  useEffect(() => {
    getNotes();

  }, []);

  const addnote = async (title, description, tag) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate("/login");
    } else {

      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ title, description, tag })
      });
      const json = await response.json();
      setNotes(prevNotes => [...prevNotes, json]); // Add new note to state
      showAlert('Note added successfully!', 'success');
    }
  };

  const deletenote = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate("/login");
    } else {
      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        }
      });
      setNotes(prevNotes => prevNotes.filter((note) => note._id !== id));
      showAlert('Note deleted successfully!', 'danger');
    }
  };

  const updatenote = async (id, title, description, tag) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate("/login");
    } else {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ title, description, tag })
      });
      await response.json();
      setNotes(prevNotes =>
        prevNotes.map((note) =>
          note._id === id ? { ...note, title, description, tag } : note
        )
      );
      showAlert('Note updated successfully!', 'success');
    }
  };

  return (
    <NoteContext.Provider value={{
      notes,
      setNotes,
      getNotes,
      addnote,
      deletenote,
      updatenote,
      alert,
      showAlert
    }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
