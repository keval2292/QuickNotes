import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/nodeContext';

const AddNote = () => {
    const context = useContext(noteContext);
    const { addnote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const [error, setError] = useState("");

    const handleClick = (e) => {
        e.preventDefault();

        // Validate the fields
        if (note.title.length < 5 || note.description.length < 5) {
            setError("Title and Description must be at least 5 characters long.");
            return;
        }

        if (!note.title || !note.description) {
            setError("All fields are required.");
            return;
        }

        setError(""); // Clear error if validation passes
        addnote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" }); // Reset fields after adding
    };

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div className="container form-container">
            <h1 className="text-center mb-4 animate__animated animate__fadeInDown">Add Notes</h1>

            <form className="animate__animated animate__fadeInUp shadow-lg p-4 rounded bg-white">
                {/* Error Message */}
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                <div className="form-group mb-3">
                    <label htmlFor="title" className="form-label fw-bold">Title</label>
                    <input
                        type="text"
                        className={`form-control ${note.title.length > 0 && note.title.length < 5 ? 'is-invalid' : ''}`}
                        id="title"
                        name="title"
                        placeholder="Enter title"
                        onChange={onchange}
                        value={note.title}
                        required
                    />
                    {note.title.length > 0 && note.title.length < 5 && (
                        <div className="invalid-feedback">
                            Title must be at least 5 characters long.
                        </div>
                    )}
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="description" className="form-label fw-bold">Description</label>
                    <textarea
                        className={`form-control ${note.description.length > 0 && note.description.length < 5 ? 'is-invalid' : ''}`}
                        id="description"
                        name="description"
                        rows="3"
                        placeholder="Enter description"
                        onChange={onchange}
                        value={note.description}
                        required
                    ></textarea>
                    {note.description.length > 0 && note.description.length < 5 && (
                        <div className="invalid-feedback">
                            Description must be at least 5 characters long.
                        </div>
                    )}
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="tag" className="form-label fw-bold">Tags</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tag"
                        name="tag"
                        onChange={onchange}
                        value={note.tag}
                        placeholder="Enter tags (comma separated)"
                    />
                </div>

                <button type="submit" onClick={handleClick} className="btn btn-dark btn-block w-100 mt-3 animate__animated animate__pulse">
                    Add Note
                </button>
            </form>
        </div>
    );
};

export default AddNote;
