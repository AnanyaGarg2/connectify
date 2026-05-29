import mongoose from "mongoose";
import Note from "../models/note.model.js";

const validateObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        const newNote = new Note({ title, content, comments: [] });

        await newNote.save();

        res.status(201).json({
            message: "Note created successfully",
            note: newNote
        });

    } catch (err) {
        res.status(500).json({
            message: "Error creating note",
            error: err.message
        });
    }
};

export const getNotes = async (req, res) => {
    try {
        const Notes = await Note.find().sort({ createdAt: -1 });

        res.status(200).json({
            message: "Notes fetched successfully",
            notes: Notes
        });

    } catch (err) {
        console.error("Error fetching notes", err);

        res.status(500).json({
            message: "Error fetching notes",
            error: err
        });
    }
};

export const updateNotes = async(req,res)=>{
    try{
        const{title,content} = req.body;

        if(!title || !content){
            return res.status(400).json({
                message : "Title and content are required"
            });
        }

        if (!validateObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid note id"
            });
        }

        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new : true});

        if (!updatedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json({
            message: "Note updated successfully",
            note: updatedNote
        });
    }
    catch(err){
        console.error("Error updating note", err);

        res.status(500).json({
            message: "Error updating note",
            error: err
        });
    }
}

export const deleteNotes = async(req,res)=>{
    try{
        if (!validateObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid note id"
            });
        }

        const deleteNote = await Note.findByIdAndDelete(req.params.id);

        if(!deleteNote){
            return res.status(404).json({
                message : "Note not found"
            });
        }

        res.status(200).json({
            message: "Note deleted successfully"
        });
    }
    catch(err){
        console.error("Error deleting note", err);
        res.status(500).json({
            message: "Error deleting note",
            error: err.message
        });
    }
}

export const getNoteById = async (req, res) => {
    try {
        if (!validateObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid note id"
            });
        }

        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json({
            message: "Note fetched successfully",
            note
        });
    } catch (err) {
        console.error("Error fetching note", err);
        res.status(500).json({
            message: "Error fetching note",
            error: err.message
        });
    }
};

export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, comment } = req.body;

    if (!validateObjectId(id)) {
      return res.status(400).json({
        message: "Invalid note id"
      });
    }

    if (!username || !comment) {
      return res.status(400).json({
        message: "Username and comment are required"
      });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    note.comments.push({ username, comment });
    await note.save();

    res.status(201).json({
      message: "Comment added successfully",
      note
    });
  } catch (err) {
    console.error("Error adding comment", err);
    res.status(500).json({
      message: "Error adding comment",
      error: err.message
    });
  }
};

export const addReply = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const { username, comment } = req.body;

    if (!validateObjectId(id) || !validateObjectId(commentId)) {
      return res.status(400).json({
        message: "Invalid note or comment id"
      });
    }

    if (!username || !comment) {
      return res.status(400).json({
        message: "Username and reply are required"
      });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    const targetComment = note.comments.id(commentId);

    if (!targetComment) {
      return res.status(404).json({
        message: "Comment not found"
      });
    }

    targetComment.replies.push({ username, comment });
    await note.save();

    res.status(201).json({
      message: "Reply added successfully",
      note
    });
  } catch (err) {
    console.error("Error adding reply", err);
    res.status(500).json({
      message: "Error adding reply",
      error: err.message
    });
  }
};

export const deleteComment = async (req, res) => {
    try {
        const { id, commentId } = req.params;
        if (!validateObjectId(id)) {
            return res.status(400).json({
                message: "Invalid note id"
            });
        }

        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({
                message : "Note not found"
            });
        }

        // If commentId looks like an ObjectId, remove by matching _id
        if (mongoose.Types.ObjectId.isValid(commentId)) {
            const before = note.comments.length;
            note.comments = note.comments.filter(c => String(c._id) !== commentId);
            if (note.comments.length === before) {
                return res.status(404).json({ message: "Comment not found" });
            }
        } else {
            // allow deleting by numeric index (e.g., 0) for convenience
            const idx = Number(commentId);
            if (!Number.isNaN(idx) && idx >= 0 && idx < note.comments.length) {
                note.comments.splice(idx, 1);
            } else {
                // fallback: try matching stringified _id
                const fallback = note.comments.find(c => String(c._id) === commentId);
                if (!fallback) {
                    return res.status(404).json({
                        message: "Comment not found"
                    });
                }

                note.comments = note.comments.filter(c => String(c._id) !== String(fallback._id));
            }
        }

        await note.save();

        res.status(200).json({
            message: "Comment deleted successfully",
            note
        });
    } catch (err) {
        res.status(500).json({
            message: "Error deleting comment",
            error: err.message
        });
    }
};

