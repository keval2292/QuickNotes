import React, { useContext } from 'react';
import noteContext from '../context/notes/nodeContext'; 

const Noteitem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deletenote } = context; 

    return (
        <div className="col-md-4 mb-4">
            <div className="card animate__animated animate__fadeInUp shadow-lg h-100 position-relative">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="card-title fw-bold note-title mb-0 text-dark">{note.title}</h5>
                    <div className="button-container d-flex align-items-center">
                        {/* Pencil Icon for Update */}
                        <button className="btn btn-dark btn-sm me-2 cbtn" onClick={() => { updateNote(note) }} title="Update">
                            <i className="bi bi-pencil "></i>
                        </button>

                        {/* Trash Icon for Delete */}
                        <button className="btn btn-dark btn-sm cbtn" onClick={() => { deletenote(note._id) }} title="Delete">
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <p className="card-text">{note.description}</p>
                    <span className="badge bg-secondary mb-3">{note.tag}</span>
                </div>
            </div>
        </div>
    );
};

export default Noteitem;
