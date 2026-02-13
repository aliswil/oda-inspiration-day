import type { PortableTextBlock } from '@portabletext/types'

export type SanityImage = {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
  alt?: string
  caption?: string
}

export type SanityLink = { label: string; href: string; isExternal?: boolean }

export type Page = {
  _id: string; title: string; slug: string;
  seo?: { title?: string; description?: string; ogImage?: string }
  blocks: Block[]
}

export type Speaker = {
  _id: string; name: string; role?: string; company?: string; photo?: SanityImage;
  bio?: string; isLightningTalk?: boolean; topic?: string; linkedin?: string
}

export type TeamMember = { _id: string; name: string; role?: string; photo?: SanityImage; linkedin?: string }

export type Sponsor = {
  _id: string; name: string; logo?: SanityImage;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze' | 'partner'; url?: string
}

export type SiteSettings = {
  siteName?: string; siteDescription?: string; navigation?: NavItem[];
  footerNavigation?: SanityLink[]; socialLinks?: SocialLink[];
  defaultSeo?: { title?: string; description?: string; ogImage?: string };
  ticketUrl?: string; contactEmail?: string
}

export type NavItem = { label: string; href: string; children?: SanityLink[] }
export type SocialLink = { platform: string; url: string }

export type HeroBlock = {
  _type: 'hero'; _key: string; heading?: string; subheading?: string;
  backgroundImage?: SanityImage; backgroundVideo?: string;
  cta?: SanityLink; secondaryCta?: SanityLink;
  style?: 'fullscreen' | 'tall' | 'medium'
}

export type RichTextBlock = {
  _type: 'richText'; _key: string; heading?: string;
  content?: PortableTextBlock[]; backgroundColor?: string; narrowWidth?: boolean
}

export type SpeakerGridBlock = {
  _type: 'speakerGrid'; _key: string; heading?: string; subheading?: string;
  filter?: 'all' | 'keynote' | 'lightning'; backgroundColor?: string
}

export type ScheduleSession = {
  _key: string; time?: string; title: string; description?: string;
  speaker?: Pick<Speaker, 'name' | 'role' | 'company' | 'photo'>;
  tag?: 'keynote' | 'lightning' | 'panel' | 'workshop' | 'break' | 'networking';
  location?: string
}

export type ScheduleBlock = {
  _type: 'schedule'; _key: string; heading?: string;
  sessions?: ScheduleSession[]; backgroundColor?: string
}

export type ImageGalleryBlock = {
  _type: 'imageGallery'; _key: string; heading?: string;
  images?: (SanityImage & { alt?: string; caption?: string })[];
  layout?: 'grid' | 'masonry' | 'carousel'; columns?: number
}

export type VideoEmbedBlock = {
  _type: 'videoEmbed'; _key: string; heading?: string;
  url: string; thumbnail?: SanityImage; caption?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1'
}

export type CtaSectionBlock = {
  _type: 'ctaSection'; _key: string; heading: string; body?: string;
  cta?: SanityLink; secondaryCta?: SanityLink;
  backgroundImage?: SanityImage; backgroundColor?: string
}

export type StatItem = { _key: string; value: number; suffix?: string; label: string }

export type StatsCounterBlock = {
  _type: 'statsCounter'; _key: string; heading?: string;
  stats?: StatItem[]; backgroundColor?: string
}

export type TeamGridBlock = {
  _type: 'teamGrid'; _key: string; heading?: string;
  subheading?: string; backgroundColor?: string
}

export type PartnerGridBlock = {
  _type: 'partnerGrid'; _key: string; heading?: string;
  showTiers?: boolean; backgroundColor?: string
}

export type CardItem = {
  _key: string; title: string; description?: string;
  image?: SanityImage; link?: SanityLink; accentColor?: string
}

export type CardGridBlock = {
  _type: 'cardGrid'; _key: string; heading?: string;
  cards?: CardItem[]; columns?: number
}

export type FaqItem = { _key: string; question: string; answer?: PortableTextBlock[] }

export type FaqAccordionBlock = {
  _type: 'faqAccordion'; _key: string; heading?: string;
  items?: FaqItem[]; backgroundColor?: string
}

export type QuoteBlock = {
  _type: 'quote'; _key: string; text: string;
  author?: string; authorRole?: string; authorImage?: SanityImage;
  style?: 'centered' | 'large' | 'with-image'
}

export type VenueMapBlock = {
  _type: 'venueMap'; _key: string; heading?: string; description?: string;
  venueImage?: SanityImage; address?: string; googleMapsUrl?: string;
  details?: PortableTextBlock[]
}

export type VideoCarouselItem = { _key: string; title: string; url: string }

export type VideoCarouselBlock = {
  _type: 'videoCarousel'; _key: string; heading?: string;
  videos?: VideoCarouselItem[]; backgroundColor?: string
}

export type Block =
  | HeroBlock | RichTextBlock | SpeakerGridBlock | ScheduleBlock
  | ImageGalleryBlock | VideoEmbedBlock | CtaSectionBlock | StatsCounterBlock
  | TeamGridBlock | PartnerGridBlock | CardGridBlock | FaqAccordionBlock
  | QuoteBlock | VenueMapBlock | VideoCarouselBlock
