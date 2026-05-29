import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NoteContext } from '../context/NoteContext'

function CreateNote() {
  const { createNote } = useContext(NoteContext)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!title.trim() || !content.trim()) {
      setError('Please provide both a title and content for your note.')
      return
    }

    try {
      await createNote({ title: title.trim(), content: content.trim() })
      setSuccess('Note created successfully!')
      setTitle('')
      setContent('')
      setTimeout(() => {
        navigate('/')
      }, 600)
    } catch (err) {
      setError('Unable to create the note right now. Please try again.')
    }
  }

  return (
    <div className="mx-auto max-w-4xl rounded-[32px] border border-slate-800 bg-slate-950 p-8 shadow-xl shadow-slate-950/30">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Create your note</p>
        <h1 className="text-4xl font-bold text-white">Write a note that works for you.</h1>
        <p className="max-w-2xl text-slate-400 leading-7">
          Add a title and content so you can save ideas, reminders, and plans in one place. After creation, your note will include update, delete, and reply actions automatically.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-200">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-900 px-5 py-4 text-white outline-none transition focus:border-cyan-400"
            placeholder="Your note title"
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-3 w-full min-h-[220px] rounded-3xl border border-slate-700 bg-slate-900 px-5 py-4 text-white outline-none transition focus:border-cyan-400"
            placeholder="Write the note details here..."
          />
        </div>

        {error && <p className="text-sm text-rose-400">{error}</p>}
        {success && <p className="text-sm text-emerald-400">{success}</p>}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-3xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Save note
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="rounded-3xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white"
          >
            Back to home
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateNote