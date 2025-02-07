import React, { useContext, useRef, useState } from 'react';
import noteContext from '../context/notes/nodeContext'; // Ensure the path is correct
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { motion } from 'framer-motion';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, updatenote } = context;
    const [note, setNote] = useState({ _id: "", title: "", description: "", tag: "" });
    const modalRef = useRef(null);

    const handleUpdateNote = (note) => {
        setNote({
            _id: note._id,
            title: note.title,
            description: note.description,
            tag: note.tag,
        });
        const modal = new window.bootstrap.Modal(modalRef.current);
        modal.show();
    };

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const handleSaveNote = () => {
        updatenote(note._id, note.title, note.description, note.tag);
        const modal = window.bootstrap.Modal.getInstance(modalRef.current);
        modal.hide();
    };

    return (
        <>
            <AddNote />
            <motion.div
                className="modal fade animate__animated animate__fadeIn animate__faster"
                id="exampleModal"
                ref={modalRef}
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content rounded-4 shadow-lg border-0">
                        <div className="modal-header bg-dark text-white">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Note</h1>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
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
            </motion.div>
            <div className='container'>
                <motion.h2
                    className="text-center mt-5 animate__animated animate__fadeInDown"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    View All Notes
                </motion.h2>
                {notes.length === 0 && (
                    <motion.div
                        className="alert alert-warning text-center mt-4"
                        role="alert"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <strong>No Notes To Display</strong>
                    </motion.div>
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