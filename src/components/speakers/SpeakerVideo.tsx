import { Container } from '@/components/ui/Container'

function getEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url)

    // YouTube: youtube.com/watch?v=ID or youtu.be/ID
    if (parsed.hostname.includes('youtube.com')) {
      const id = parsed.searchParams.get('v')
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null
    }
    if (parsed.hostname === 'youtu.be') {
      const id = parsed.pathname.slice(1)
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null
    }

    // Vimeo: vimeo.com/ID
    if (parsed.hostname.includes('vimeo.com')) {
      const id = parsed.pathname.split('/').filter(Boolean).pop()
      return id ? `https://player.vimeo.com/video/${id}` : null
    }
  } catch {
    return null
  }
  return null
}

const BLOB_CLIP = 'polygon(5% 0%, 95% 5%, 100% 40%, 98% 85%, 85% 100%, 15% 95%, 0% 60%, 2% 15%)'

export function SpeakerVideo({ url, name }: { url: string; name: string }) {
  const embedUrl = getEmbedUrl(url)
  if (!embedUrl) return null

  return (
    <section className="py-16 md:py-24 bg-cream">
      <Container>
        <h2 className="text-2xl md:text-3xl font-black text-dark-blue mb-10 text-center">
          Watch {name}
        </h2>
        <div className="relative max-w-3xl mx-auto">
          {/* Shadow blob */}
          <div
            className="absolute inset-0 translate-x-3 translate-y-3 bg-lavender/50"
            style={{ clipPath: BLOB_CLIP }}
            aria-hidden="true"
          />
          {/* Video blob */}
          <div className="relative" style={{ clipPath: BLOB_CLIP }}>
            <div className="aspect-video">
              <iframe
                src={embedUrl}
                title={`Video of ${name}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
