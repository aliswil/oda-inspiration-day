import { Container } from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'
import type { PdfEmbedBlock as PdfEmbedBlockType } from '@/sanity/types'

export function PdfEmbedBlock({ block }: { block: PdfEmbedBlockType }) {
  if (!block.fileUrl) return null

  const filename = block.originalFilename || 'document.pdf'
  const downloadUrl = `${block.fileUrl}?dl=${encodeURIComponent(filename)}`

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

        <AnimatedSection animation="scaleIn">
          {/* Lazy-loaded so the PDF only transfers once a visitor scrolls to it. */}
          <div className="relative w-full h-[80vh] overflow-hidden rounded-2xl shadow-2xl bg-very-dark/5">
            <iframe
              src={`${block.fileUrl}#view=FitH`}
              title={block.heading || 'PDF document'}
              loading="lazy"
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </AnimatedSection>

        <div className="mt-8 flex flex-col items-center gap-3">
          <Button href={downloadUrl} isExternal>
            {block.downloadLabel || 'Download PDF'}
          </Button>
          <p className="text-sm text-very-dark/50">
            Trouble viewing?{' '}
            <a
              href={block.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-very-dark/80"
            >
              Open the PDF in a new tab
            </a>
            .
          </p>
        </div>
      </Container>
    </SectionWrapper>
  )
}
