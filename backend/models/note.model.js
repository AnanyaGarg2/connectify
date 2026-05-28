import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required : true,
        trim : true
    },
    comments: [{
        username: {
            type: String,
            required: true,
            trim: true
        },
        comment: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {timestamps : true});

const Note = mongoose.model("Note", noteSchema);
export default Note;