import React, { useEffect, useRef, useState } from 'react'

function StressRelief() {
  const [activeSound, setActiveSound] = useState(null)
  const [ambientPlaying, setAmbientPlaying] = useState(false)
  const [bubblePops, setBubblePops] = useState(0)
  const [objects, setObjects] = useState([
    { id: 'deadline', label: 'Deadline', destroyed: false },
    { id: 'email', label: 'Endless email', destroyed: false },
    { id: 'noise', label: 'Traffic noise', destroyed: false },
    { id: 'pressure', label: 'Pressure', destroyed: false }
  ])
  const audioContextRef = useRef(null)
  const ambientSourceRef = useRef(null)
  const ambientGainRef = useRef(null)

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      audioContextRef.current = new AudioContext()
    }

    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume()
    }

    return audioContextRef.current
  }

  const createNoiseBuffer = (ctx, lengthSeconds = 2) => {
    const buffer = ctx.createBuffer(1, ctx.sampleRate * lengthSeconds, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < data.length; i += 1) {
      data[i] = Math.random() * 2 - 1
    }
    return buffer
  }

  const stopAmbient = () => {
    if (ambientSourceRef.current) {
      ambientSourceRef.current.stop()
      ambientSourceRef.current.disconnect()
      ambientSourceRef.current = null
    }
    if (ambientGainRef.current) {
      ambientGainRef.current.disconnect()
      ambientGainRef.current = null
    }
    setAmbientPlaying(false)
    setActiveSound(null)
  }

  const playAmbient = (sound) => {
    if (!(window.AudioContext || window.webkitAudioContext)) return

    if (activeSound === sound) {
      stopAmbient()
      return
    }

    stopAmbient()
    const ctx = getAudioContext()
    const source = ctx.createBufferSource()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()
    source.buffer = createNoiseBuffer(ctx, 2)
    source.loop = true

    if (sound === 'rain') {
      filter.type = 'highpass'
      filter.frequency.value = 700
      gain.gain.value = 0.03
    } else if (sound === 'ocean') {
      filter.type = 'lowpass'
      filter.frequency.value = 1200
      gain.gain.value = 0.025
    } else if (sound === 'lofi') {
      filter.type = 'bandpass'
      filter.frequency.value = 500
      gain.gain.value = 0.035
    }

    source.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    source.start()

    ambientSourceRef.current = source
    ambientGainRef.current = gain
    setAmbientPlaying(true)
    setActiveSound(sound)
  }

  const playPop = () => {
    if (!(window.AudioContext || window.webkitAudioContext)) return
    const ctx = getAudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.value = 400
    gain.gain.value = 0.12
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)
    osc.stop(ctx.currentTime + 0.15)
  }

  const playDestroy = () => {
    if (!(window.AudioContext || window.webkitAudioContext)) return
    const ctx = getAudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'square'
    osc.frequency.value = 120
    gain.gain.value = 0.08
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2)
    osc.stop(ctx.currentTime + 0.2)
  }

  const handleBubblePop = () => {
    playPop()
    setBubblePops((current) => current + 1)
  }

  const destroyObject = (id) => {
    playDestroy()
    setObjects((current) =>
      current.map((object) =>
        object.id === id ? { ...object, destroyed: true } : object
      )
    )
  }

  useEffect(() => {
    return () => {
      stopAmbient()
      if (audioContextRef.current) {
        audioContextRef.current.close()
        audioContextRef.current = null
      }
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <section className="mx-auto max-w-7xl px-6 pt-20 pb-16">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200 backdrop-blur-xl">
              ✨ Relaxation Space
            </div>
            <h1 className="text-5xl font-black leading-tight md:text-7xl">
              Calm your
              <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent"> mind</span>
            </h1>
            <p className="max-w-xl text-lg leading-8 text-slate-300">
              Escape stress with soothing sounds, satisfying interactions, and calming visual therapy designed to help you reset.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => playAmbient('rain')}
                className="rounded-2xl bg-cyan-400 px-6 py-4 font-semibold text-slate-900 transition hover:scale-105"
              >
                Start Relaxing
              </button>
              <button
                type="button"
                onClick={stopAmbient}
                className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold backdrop-blur-xl transition hover:bg-white/10"
              >
                Stop sound
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative flex h-[350px] w-[350px] items-center justify-center">
              <div className="absolute h-full w-full animate-ping rounded-full bg-cyan-400/20" />
              <div className="absolute h-[280px] w-[280px] animate-pulse rounded-full bg-violet-500/20 blur-2xl" />
              <div className="flex h-48 w-48 animate-[pulse_4s_ease-in-out_infinite] items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 to-violet-500 shadow-2xl shadow-cyan-500/30">
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-900">Breathe</p>
                  <p className="mt-1 text-3xl font-black text-slate-900">In • Out</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 pb-24">
        <section className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Relaxing Soundscapes</h2>
              <p className="mt-2 text-slate-300">Put on calming ambient sounds and slow down.</p>
            </div>
            <div className="rounded-full bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
              {ambientPlaying ? 'Now Playing' : 'Silent'}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              { id: 'rain', emoji: '🌧️', label: 'Rain' },
              { id: 'ocean', emoji: '🌊', label: 'Ocean' },
              { id: 'lofi', emoji: '🎵', label: 'Lo-fi' }
            ].map((sound) => (
              <button
                key={sound.id}
                type="button"
                onClick={() => playAmbient(sound.id)}
                className={`group rounded-3xl border p-6 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  activeSound === sound.id
                    ? 'border-cyan-400 bg-cyan-400/10'
                    : 'border-white/10 bg-white/5 hover:border-cyan-400/50'
                }`}
              >
                <div className="text-4xl">{sound.emoji}</div>
                <h3 className="mt-5 text-xl font-bold">{sound.label}</h3>
                <p className="mt-2 text-sm text-slate-300">Tap to enter a calming atmosphere</p>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-bold">Bubble Wrap Therapy</h2>
              <p className="mt-2 text-slate-300">Pop bubbles to release stress and tension.</p>
            </div>
            <div className="rounded-2xl bg-cyan-400/10 px-5 py-4">
              <p className="text-sm text-slate-300">Total Pops</p>
              <p className="text-3xl font-black text-cyan-300">{bubblePops}</p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-4 gap-5 sm:grid-cols-6 md:grid-cols-8">
            {Array.from({ length: 24 }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={handleBubblePop}
                className="h-16 w-16 rounded-full bg-gradient-to-br from-cyan-300/30 to-violet-400/20 shadow-lg backdrop-blur-xl transition-all duration-200 hover:scale-110 active:scale-75"
              />
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold">Destroy Your Stress</h2>
            <p className="mt-3 leading-8 text-slate-300">
              Click on things that are mentally exhausting you and release them.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {objects.map((obj) => (
              <button
                key={obj.id}
                type="button"
                onClick={() => !obj.destroyed && destroyObject(obj.id)}
                className={`rounded-3xl border p-8 text-left transition-all duration-300 ${
                  obj.destroyed
                    ? 'rotate-6 scale-90 border-white/5 bg-slate-900/40 text-slate-500 line-through'
                    : 'border-white/10 bg-white/5 hover:-translate-y-2 hover:border-cyan-400/50 hover:bg-cyan-400/10'
                }`}
              >
                <div className="text-4xl">💥</div>
                <h3 className="mt-5 text-xl font-bold">{obj.label}</h3>
                <p className="mt-2 text-sm text-slate-300">
                  {obj.destroyed ? 'Released ✨' : 'Tap to destroy'}
                </p>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default StressRelief