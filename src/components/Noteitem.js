import React, { useContext } from 'react';
import noteContext from '../context/notes/nodeContext';
import { motion } from 'framer-motion';

const Noteitem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deletenote } = context;

    return (
        <motion.div
            className="col-md-4 mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            <div className="card animate__animated animate__fadeInUp shadow-lg h-100 position-relative">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="card-title fw-bold note-title mb-0 text-dark">{note.title}</h5>
                    <div className="button-container d-flex align-items-center">
                        {/* Pencil Icon for Update */}
                        <motion.button
                            className="btn btn-dark btn-sm me-2 cbtn"
                            onClick={() => { updateNote(note) }}
                            title="Update"
                            whileHover={{ scale: 1.2 }}
                            transition={{ duration: 0.2 }}
                        >
                            <i className="bi bi-pencil"></i>
                        </motion.button>
                        {/* Trash Icon for Delete */}
                        <motion.button
                            className="btn btn-dark btn-sm cbtn"
                            onClick={() => { deletenote(note._id) }}
                            title="Delete"
                            whileHover={{ scale: 1.2 }}
                            transition={{ duration: 0.2 }}
                        >
                            <i className="bi bi-trash"></i>
                        </motion.button>
                    </div>
                </div>
                <div className="card-body">
                    <p className="card-text">{note.description}</p>
                    <span className="badge bg-secondary mb-3">{note.tag}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default Noteitem;