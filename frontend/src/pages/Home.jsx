import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { NoteContext } from '../context/NoteContext'

function Home() {
  const { notes, loading, updateNote, deleteNote, addComment, addReply } = useContext(NoteContext)
  const [editNoteId, setEditNoteId] = useState(null)
  const [editData, setEditData] = useState({ title: '', content: '' })
  const [replyNoteId, setReplyNoteId] = useState(null)
  const [replyCommentId, setReplyCommentId] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [replyTo, setReplyTo] = useState('')

  const startEdit = (note) => {
    setEditNoteId(note._id)
    setEditData({ title: note.title, content: note.content })
    setReplyNoteId(null)
    setReplyCommentId(null)
    setReplyTo('')
  }

  const cancelEdit = () => {
    setEditNoteId(null)
    setEditData({ title: '', content: '' })
  }

  const handleSave = async (noteId) => {
    if (!editData.title.trim() || !editData.content.trim()) return
    await updateNote(noteId, editData)
    cancelEdit()
  }

  const handleReply = async (noteId, commentId = null) => {
    if (!replyText.trim()) return

    if (commentId) {
      await addReply(noteId, commentId, { username: 'Guest', comment: replyText })
    } else {
      await addComment(noteId, { username: 'Guest', comment: replyText })
    }

    setReplyText('')
    setReplyNoteId(null)
    setReplyCommentId(null)
    setReplyTo('')
  }

  const openNoteReply = (noteId) => {
    setReplyNoteId(noteId)
    setReplyCommentId(null)
    setReplyTo('')
    setEditNoteId(null)
  }

  const openCommentReply = (noteId, commentId, username) => {
    setReplyNoteId(noteId)
    setReplyCommentId(commentId)
    setReplyTo(username)
    setEditNoteId(null)
  }

  return (
    <div className="space-y-12">
      <section className="rounded-[32px] border border-slate-800 bg-slate-950 p-8 shadow-xl shadow-slate-950/40">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300 ring-1 ring-cyan-300/20">
              New at Connectify
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                Create notes fast, keep ideas alive.
              </h1>
              <p className="mt-5 max-w-xl text-slate-400 leading-8">
                Build your note collection with a beautiful, distraction-free experience. Add titles, jot down content, and manage every note with update, delete, and reply controls.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/create"
                className="inline-flex items-center justify-center rounded-3xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Create a note
              </Link>
              <Link
                to="/stress"
                className="inline-flex items-center justify-center rounded-3xl border border-cyan-500 px-6 py-3 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/10 hover:text-white"
              >
                Stress relief
              </Link>
              <a className="inline-flex items-center justify-center rounded-3xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 hover:border-slate-500 hover:text-white transition" href="#features">
                See features
              </a>
            </div>
            <div className="mt-6 rounded-[28px] border border-slate-800 bg-slate-900 p-5 text-slate-300">
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Stress relief</p>
              <p className="mt-3 text-white text-lg font-semibold">Visit the Stress Relief page for soothing sounds, bubble wrap popping, and destroyable stress objects.</p>
            </div>
          </div>

          <div className="rounded-[28px] bg-slate-900 p-6 ring-1 ring-white/10">
            <h2 className="text-xl font-semibold text-white">Why create notes here?</h2>
            <div className="mt-6 space-y-4 text-slate-300">
              <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
                <h3 className="font-semibold text-white">Title + Content</h3>
                <p className="mt-2 text-sm text-slate-400">Give each note a clear title and rich content so your ideas stay easy to find.</p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
                <h3 className="font-semibold text-white">Fast note actions</h3>
                <p className="mt-2 text-sm text-slate-400">Update, delete, or reply to each note right from the homepage.</p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
                <h3 className="font-semibold text-white">Organized work flow</h3>
                <p className="mt-2 text-sm text-slate-400">Keep your ideas in one place and return to them with confidence.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: 'Craft strong titles',
            description: 'Use clear headings so your notes are easy to scan when you return later.'
          },
          {
            title: 'Write with focus',
            description: 'Capture your content in a clean editor optimized for quick note-taking.'
          },
          {
            title: 'Note actions ready',
            description: 'Every note includes update, delete, and reply controls right after creation.'
          }
        ].map((feature) => (
          <div key={feature.title} className="rounded-[32px] border border-slate-800 bg-slate-950 p-6 shadow-sm shadow-slate-950/10">
            <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
            <p className="mt-3 text-slate-400 leading-7">{feature.description}</p>
          </div>
        ))}
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Your notes</p>
            <h2 className="text-3xl font-bold text-white">Recent notes</h2>
          </div>
          <Link
            to="/create"
            className="inline-flex items-center justify-center rounded-3xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/10 transition hover:bg-slate-100"
          >
            Create a new note
          </Link>
        </div>

        {loading ? (
          <div className="rounded-[32px] border border-slate-800 bg-slate-950 p-12 text-center text-slate-400">Loading notes…</div>
        ) : notes.length === 0 ? (
          <div className="rounded-[32px] border border-dashed border-slate-700 bg-slate-950 p-12 text-center text-slate-400">
            No notes yet. Start by creating your first note.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {notes.map((note) => (
              <article key={note._id} className="group rounded-[32px] border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-0.5 hover:border-cyan-500/40 hover:bg-slate-950">
                {editNoteId === note._id ? (
                  <div className="space-y-4">
                    <input
                      value={editData.title}
                      onChange={(e) => setEditData((prev) => ({ ...prev, title: e.target.value }))}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
                      placeholder="Note title"
                    />
                    <textarea
                      value={editData.content}
                      onChange={(e) => setEditData((prev) => ({ ...prev, content: e.target.value }))}
                      className="w-full min-h-[160px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
                      placeholder="Note content"
                    />
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => handleSave(note._id)}
                        className="rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="rounded-2xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-slate-500 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-semibold text-white">{note.title}</h3>
                        <p className="mt-3 text-slate-400 leading-7 whitespace-pre-line">{note.content}</p>
                      </div>
                    </div>
                    <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                      <span className="rounded-full bg-white/5 px-3 py-1">{note.comments?.length ?? 0} replies</span>
                      <span className="rounded-full bg-white/5 px-3 py-1">{new Date(note.createdAt).toLocaleDateString()}</span>
                    </div>
                  </>
                )}

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => (editNoteId === note._id ? cancelEdit() : startEdit(note))}
                    className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-500 hover:text-cyan-300"
                  >
                    {editNoteId === note._id ? 'Editing' : 'Update'}
                  </button>
                  <button
                    onClick={() => {
                      deleteNote(note._id)
                      setReplyNoteId(null)
                    }}
                    className="rounded-2xl border border-rose-500/30 bg-rose-500/5 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/10"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => openNoteReply(note._id)}
                    className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-500 hover:text-cyan-300"
                  >
                    Reply
                  </button>
                </div>

                {replyNoteId === note._id && replyCommentId === null && (
                  <div className="mt-5 rounded-3xl border border-slate-800 bg-slate-950 p-4">
                    <p className="text-sm font-semibold text-white">Leave a reply to the note</p>
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="mt-3 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
                      rows={3}
                      placeholder="Write your reply..."
                    />
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() => handleReply(note._id)}
                        className="rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                      >
                        Send reply
                      </button>
                      <button
                        onClick={() => {
                          setReplyNoteId(null)
                          setReplyCommentId(null)
                          setReplyTo('')
                        }}
                        className="rounded-2xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-slate-500 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {note.comments?.length > 0 && (
                  <div className="mt-6 space-y-3 rounded-3xl border border-slate-800 bg-slate-950 p-4">
                    <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Replies</h4>
                    <div className="space-y-4">
                      {note.comments.slice(0, 3).map((comment) => (
                        <div key={comment._id} className="rounded-2xl bg-slate-900 p-4 text-slate-300">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-sm font-semibold text-white">{comment.username}</p>
                              <p className="mt-2 text-sm leading-6">{comment.comment}</p>
                            </div>
                            <button
                              onClick={() => openCommentReply(note._id, comment._id, comment.username)}
                              className="rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm font-semibold text-white transition hover:border-cyan-500 hover:text-cyan-300"
                            >
                              Reply
                            </button>
                          </div>

                          {replyNoteId === note._id && replyCommentId === comment._id && (
                            <div className="mt-4 rounded-3xl border border-slate-800 bg-slate-950 p-4">
                              <p className="text-sm font-semibold text-white">Replying to {replyTo}</p>
                              <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                className="mt-3 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
                                rows={3}
                                placeholder="Write your reply to this comment..."
                              />
                              <div className="mt-3 flex items-center gap-3">
                                <button
                                  onClick={() => handleReply(note._id, comment._id)}
                                  className="rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                                >
                                  Send reply
                                </button>
                                <button
                                  onClick={() => {
                                    setReplyNoteId(null)
                                    setReplyCommentId(null)
                                    setReplyTo('')
                                  }}
                                  className="rounded-2xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-slate-500 hover:text-white"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}

                          {comment.replies?.length > 0 && (
                            <div className="mt-4 space-y-3 rounded-3xl border border-slate-800 bg-slate-950 p-4">
                              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Thread</p>
                              <div className="space-y-3">
                                {comment.replies.map((reply) => (
                                  <div key={reply._id || reply.createdAt} className="rounded-2xl bg-slate-900 p-4 text-slate-300">
                                    <p className="text-sm font-semibold text-white">{reply.username}</p>
                                    <p className="mt-2 text-sm leading-6">{reply.comment}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home