import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion
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

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3, delayChildren: 0.3 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const buttonVariants = {
        hover: { scale: 1.05, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" },
        tap: { scale: 0.95 },
    };

    return (
        <motion.div
            className="container form-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Title */}
            <motion.h1
                className="text-center mb-4"
                variants={itemVariants}
            >
                Add Notes
            </motion.h1>

            {/* Form */}
            <motion.form
                className="shadow-lg p-4 rounded bg-white"
                variants={containerVariants}
            >
                {/* Error Message */}
                {error && (
                    <motion.div
                        className="alert alert-danger"
                        role="alert"
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {error}
                    </motion.div>
                )}

                {/* Title Field */}
                <motion.div className="form-group mb-3" variants={itemVariants}>
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
                </motion.div>

                {/* Description Field */}
                <motion.div className="form-group mb-3" variants={itemVariants}>
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
                </motion.div>

                {/* Tags Field */}
                <motion.div className="form-group mb-3" variants={itemVariants}>
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
                </motion.div>

                {/* Add Note Button */}
                <motion.button
                    type="submit"
                    onClick={handleClick}
                    className="btn btn-dark btn-block w-100 mt-3"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    Add Note
                </motion.button>
            </motion.form>
        </motion.div>
    );
};

export default AddNote;