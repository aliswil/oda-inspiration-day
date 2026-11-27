const YT_ORIGIN = 'https://www.youtube.com'

function getYouTubeId(url: string): string | null {
  if (url.includes('youtu.be/')) return url.split('youtu.be/')[1]?.split('?')[0] || null
  if (url.includes('youtube.com/watch')) return new URL(url).searchParams.get('v')
  return null
}

export function HeroBackgroundVideo({ url, start }: { url: string; start: number }) {
  const ytId = getYouTubeId(url)

  if (!ytId) {
    return (
      <video autoPlay muted loop playsInline className="w-full h-full object-cover">
        <source src={start > 0 ? `${url}#t=${start}` : url} type="video/mp4" />
      </video>
    )
  }

  const startParam = start > 0 ? `&start=${start}` : ''
  return (
    <iframe
      src={`${YT_ORIGIN}/embed/${ytId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&modestbranding=1&playsinline=1&rel=0&playlist=${ytId}${startParam}`}
      allow="autoplay"
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ border: 0, width: '100vw', height: '100vh', minWidth: '177.78vh', minHeight: '56.25vw' }}
      tabIndex={-1}
      aria-hidden="true"
    />
  )
}
