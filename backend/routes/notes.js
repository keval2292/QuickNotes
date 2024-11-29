const express = require('express');
const router = express.Router();
const getuser = require('../middleware/getuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// Route to get notes for the authenticated user
router.get('/getnotes', getuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to add a new note for the authenticated user
router.post(
    '/addnotes',
    getuser,
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('description').notEmpty().withMessage('Description is required'),
        body('tag').optional().isString().withMessage('Tag must be a string')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, tag } = req.body;

        try {
            const newNote = new Notes({
                title,
                description,
                tag,
                user: req.user.id
            });

            const savedNote = await newNote.save();
            res.status(201).json(savedNote);
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }
);

// Route to update a note by ID
router.put(
    '/updatenote/:id',
    getuser,
    [
        body('title').optional().notEmpty().withMessage('Title cannot be empty'),
        body('description').optional().notEmpty().withMessage('Description cannot be empty'),
        body('tag').optional().isString().withMessage('Tag must be a string')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, tag } = req.body;
        const noteId = req.params.id;

        try {
            // Find the note and check if the user is the owner
            const note = await Notes.findById(noteId);
            if (!note) {
                return res.status(404).json({ error: 'Note not found' });
            }

            if (note.user.toString() !== req.user.id) {
                return res.status(403).json({ error: 'Not authorized to update this note' });
            }

            // Update the note
            note.title = title || note.title; // Keep existing value if new one is not provided
            note.description = description || note.description;
            note.tag = tag || note.tag;

            const updatedNote = await note.save();
            res.json(updatedNote);
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }
);

// Route to delete a note by ID
router.delete('/deletenote/:id', getuser, async (req, res) => {
    const noteId = req.params.id;

    try {
        // Find the note and check if the user is the owner
        const note = await Notes.findById(noteId);
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Not authorized to delete this note' });
        }

        // Delete the note
        await Notes.findByIdAndDelete(noteId);
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });

    }
});

module.exports = router;
