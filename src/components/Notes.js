import React, { useContext, useRef, useState } from 'react';
import noteContext from '../context/notes/nodeContext'; // Ensure the path is correct
import Noteitem from './Noteitem';
import AddNote from './AddNote';

const Notes = () => {
    // Get context values
    const context = useContext(noteContext);
    const { notes, updatenote } = context;
    const [note, setNote] = useState({ _id: "", title: "", description: "", tag: "" });

    // Reference to the modal element
    const modalRef = useRef(null);

    // Function to trigger modal and set current note data
    const handleUpdateNote = (note) => {
        setNote({
            _id: note._id,
            title: note.title,
            description: note.description,
            tag: note.tag,
        });

        // Open the modal programmatically using Bootstrap's modal API
        const modal = new window.bootstrap.Modal(modalRef.current);
        modal.show();
    };

    // Function to handle input change in modal
    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    // Handle the save button click in the modal
    const handleSaveNote = () => {
        updatenote(note._id, note.title, note.description, note.tag);
        const modal = window.bootstrap.Modal.getInstance(modalRef.current);
        modal.hide();
    };

    return (
        <>
            <AddNote />
            <div
                className="modal fade animate__animated animate__fadeIn animate__faster"
                id="exampleModal"
                ref={modalRef}
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
            >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content rounded-4 shadow-lg border-0">
                        {/* Dark Background for the header */}
                        <div className="modal-header bg-dark text-white">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Note</h1>
                            <button
                                type="button"
                                className="btn-close btn-close-white"  // White close button for dark header
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group mb-3">
                                    <label htmlFor="title" className="form-label fw-bold">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etitle"
                                        name="title"
                                        placeholder="Enter title"
                                        onChange={handleChange}
                                        value={note.title}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="description" className="form-label fw-bold">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="edescription"
                                        name="description"
                                        rows="3"
                                        onChange={handleChange}
                                        value={note.description}
                                        placeholder="Enter description"
                                        required
                                    ></textarea>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="tag" className="form-label fw-bold">Tags</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etag"
                                        name="tag"
                                        onChange={handleChange}
                                        value={note.tag}
                                        placeholder="Enter tags (comma separated)"
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-dark" onClick={handleSaveNote}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container'>
                <h2 className="text-center mt-5 animate__animated animate__fadeInDown">View All Notes</h2>
                {notes.length === 0 && (
                    <div className="alert alert-warning text-center mt-4" role="alert">
                        <strong>No Notes To Display</strong>
                    </div>
                )}
                <div className="row mt-4">
                    {notes.map((note, index) => (
                        <Noteitem key={index} updateNote={handleUpdateNote} note={note} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Notes;
