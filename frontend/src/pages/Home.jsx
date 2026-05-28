import React from 'react'
import { useContext } from 'react';
import { NoteContext } from '../context/NoteContext';

function Home() {
  const {notes,loading} = useContext(NoteContext);
  if(loading){
    return <div className = 'flex justify-center items-center h-screen'>
      <p className="text-lg font-semibold">Loading...</p></div>
  }

  if(notes.length === 0){
    return <div className='flex justify-center items-center h-screen'>
      <p className="text-lg font-semibold">No notes found. Create your first note!</p></div>
  }
  return (
    <div>
    <div>Home</div>
</div>
  )
}

export default Home