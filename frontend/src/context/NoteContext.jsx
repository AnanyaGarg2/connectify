import {createContext, useState,useEffect} from 'react';
import{ BACKEND_URL }from '../api/url';

export const NoteContext = createContext();

export const NoteProvider = ({children})=>{
const[notes, setNotes] = useState([]);
const[loading, setLoading] = useState(false);

const getNotes=async()=>{
    setLoading(true);
    try{
        const response = await BACKEND_URL.get('/notes/get');
        setNotes(response.data.notes);
    }
    catch(err){
        console.error("Error fetching notes", err);
    }
    finally{
        setLoading(false);
    }
}

useEffect(()=>{
    getNotes();
},[]);

const createNote = async(note)=>{
        try {
            const res = await BACKEND_URL.post('/notes/create', note);
      setNotes(prevNotes => [res.data.note, ...prevNotes]);
      return res.data.note;
    } catch (err) {
      console.error('Error creating note', err);
      throw err;
    }
}

const updateNote = async(noteId, updatedNote)=>{
    try {
        const res = await BACKEND_URL.put(`/notes/update/${noteId}`, updatedNote);
        setNotes(prevNotes => prevNotes.map(note => note._id === noteId ? res.data.note : note));
    } catch (err) {
        console.error("Error updating note", err);
    }
}

const getNoteById = async(noteId)=>{
    try {
        const res = await BACKEND_URL.get(`/notes/${noteId}`);
        return res.data.note;
    } catch (err) {
        console.error("Error fetching note", err);
        throw err;
    }
}

const deleteNote = async(noteId)=>{
    try {
        await BACKEND_URL.delete(`/notes/delete/${noteId}`);
        await getNotes();
    } catch (err) {
        console.error("Error deleting note", err);
    }
}

const addComment = async(noteId, comment)=>{
    try {
        const res = await BACKEND_URL.post(`/notes/${noteId}/comments`, comment);
        setNotes(prevNotes => prevNotes.map(note => note._id === noteId ? res.data.note : note));
    } catch (err) {
        console.error("Error adding comment", err);
    }
}

const deleteComment = async(noteId, commentId)=>{
    try {
        const res = await BACKEND_URL.delete(`/notes/${noteId}/comments/${commentId}`);
        setNotes(prevNotes => prevNotes.map(note => note._id === noteId ? {...note, comments: note.comments.filter(comment => comment._id !== commentId)} : note));
    } catch (err) {
        console.error("Error deleting comment", err);
    }
}

const addReply = async(noteId, commentId, reply)=>{
    try {
        const res = await BACKEND_URL.post(
            `/notes/${noteId}/comments/${commentId}/replies`,
            reply
        );

        setNotes(prevNotes =>
            prevNotes.map(note =>
                note._id === noteId
                    ? res.data.note
                    : note
            )
        );

    } catch (err) {
        console.error("Error adding reply", err);
    }
}

return (
    <NoteContext.Provider value={{notes,loading,getNotes, createNote,updateNote,
        getNoteById, deleteNote, addComment, deleteComment, addReply
    }}>
        {children}
    </NoteContext.Provider>
)}