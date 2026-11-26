'use client'

import { useEffect, useRef, type RefObject, type SyntheticEvent } from 'react'

const YT_ORIGIN = 'https://www.youtube.com'

type PlayerMessage = { info?: { currentTime?: unknown } }

function getYouTubeId(url: string): string | null {
  if (url.includes('youtu.be/')) return url.split('youtu.be/')[1]?.split('?')[0] || null
  if (url.includes('youtube.com/watch')) return new URL(url).searchParams.get('v')
  return null
}

function readCurrentTime(raw: unknown): number | null {
  if (typeof raw !== 'string') return null
  try {
    const time = (JSON.parse(raw) as PlayerMessage).info?.currentTime
    return typeof time === 'number' ? time : null
  } catch {
    return null
  }
}

// YouTube's loop always restarts at 0:00 and ignores `start`, so we follow the
// player's time updates and jump back to the start time after each loop.
function useYouTubeLoopFromStart(frameRef: RefObject<HTMLIFrameElement | null>, start: number) {
  useEffect(() => {
    const frame = frameRef.current
    if (!frame || start <= 0) return

    const send = (message: object) => frame.contentWindow?.postMessage(JSON.stringify(message), YT_ORIGIN)
    const subscribe = window.setInterval(() => send({ event: 'listening' }), 500)

    const onMessage = (event: MessageEvent) => {
      if (event.source !== frame.contentWindow) return
      window.clearInterval(subscribe)
      const time = readCurrentTime(event.data)
      if (time !== null && time < start - 2) send({ event: 'command', func: 'seekTo', args: [start, true] })
    }

    window.addEventListener('message', onMessage)
    return () => {
      window.clearInterval(subscribe)
      window.removeEventListener('message', onMessage)
    }
  }, [frameRef, start])
}

export function HeroBackgroundVideo({ url, start }: { url: string; start: number }) {
  const frameRef = useRef<HTMLIFrameElement>(null)
  const ytId = getYouTubeId(url)
  useYouTubeLoopFromStart(frameRef, ytId ? start : 0)

  if (!ytId) {
    const restart = (event: SyntheticEvent<HTMLVideoElement>) => {
      event.currentTarget.currentTime = start
      void event.currentTarget.play()
    }
    return (
      <video autoPlay muted playsInline loop={start === 0} onEnded={restart} className="w-full h-full object-cover">
        <source src={start > 0 ? `${url}#t=${start}` : url} type="video/mp4" />
      </video>
    )
  }

  const startParams = start > 0 ? `&start=${start}&enablejsapi=1` : ''
  return (
    <iframe
      ref={frameRef}
      src={`${YT_ORIGIN}/embed/${ytId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&modestbranding=1&playsinline=1&rel=0&playlist=${ytId}${startParams}`}
      allow="autoplay"
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ border: 0, width: '100vw', height: '100vh', minWidth: '177.78vh', minHeight: '56.25vw' }}
      tabIndex={-1}
      aria-hidden="true"
    />
  )
}
