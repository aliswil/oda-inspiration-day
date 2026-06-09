import { Container } from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'
import type { PdfEmbedBlock as PdfEmbedBlockType } from '@/sanity/types'

function formatSize(bytes?: number): string | null {
  if (!bytes) return null
  const mb = bytes / 1_000_000
  return mb >= 1 ? `${Math.round(mb)} MB` : `${Math.round(bytes / 1000)} KB`
}

export function PdfEmbedBlock({ block }: { block: PdfEmbedBlockType }) {
  if (!block.fileUrl) return null

  const filename = block.originalFilename || 'document.pdf'
  const downloadUrl = `${block.fileUrl}?dl=${encodeURIComponent(filename)}`
  const downloadLabel = block.downloadLabel || 'Download PDF'
  const size = formatSize(block.fileSize)

  return (
    <SectionWrapper backgroundColor="cream">
      <Container>
        {block.heading && (
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-black text-dark-blue mb-8 text-center">
              {block.heading}
            </h2>
          </AnimatedSection>
        )}

        {/* Desktop: inline viewer. Browsers render PDFs in an iframe; lazy +
            hidden-on-mobile means the file is never fetched on phones. */}
        <AnimatedSection animation="scaleIn" className="hidden md:block">
          <div className="relative w-full h-[80vh] overflow-hidden rounded-2xl shadow-2xl bg-very-dark/5">
            <iframe
              src={`${block.fileUrl}#view=FitH`}
              title={block.heading || 'PDF document'}
              loading="lazy"
              className="absolute inset-0 h-full w-full"
            />
          </div>
          <div className="mt-6 text-center">
            <Button href={downloadUrl} isExternal variant="outline">
              {downloadLabel}
            </Button>
          </div>
        </AnimatedSection>

        {/* Mobile: phones don't render PDFs inline (iOS Safari shows a blank
            frame), so tapping opens the native full-screen viewer instead. */}
        <AnimatedSection animation="scaleIn" className="md:hidden">
          <a
            href={block.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center rounded-2xl bg-dark-blue px-6 py-10 text-center text-white shadow-xl"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-8 w-8">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="mt-5 text-xl font-black">View the summary</span>
            <span className="mt-1 text-sm text-white/70">
              Opens the full PDF{size ? ` · ${size}` : ''}
            </span>
          </a>
          <div className="mt-4 text-center">
            <Button href={downloadUrl} isExternal variant="outline">
              {downloadLabel}
            </Button>
          </div>
        </AnimatedSection>
      </Container>
    </SectionWrapper>
  )
}
