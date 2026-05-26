import Note from "../models/note.model.js";

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        const newNote = new Note({ title, content });

        await newNote.save();

        res.status(201).json({
            message: "Note created successfully",
            note: newNote
        });

    } catch (err) {
        res.status(500).json({
            message: "Error creating note",
            error: err
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
    }
}
