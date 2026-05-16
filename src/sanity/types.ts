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
  _id: string; name: string; slug?: string; role?: string; company?: string;
  photo?: SanityImage; portraitCutout?: SanityImage; secondaryPhoto?: SanityImage;
  bio?: string; presentationDescription?: string; isLightningTalk?: boolean;
  topic?: string; videoUrl?: string; linkedin?: string;
  sessions?: SpeakerSessionRef[]
}

export type SpeakerSessionRef = {
  _key: string; time?: string; title: string;
  format?: { title: string; color: ProgramFormatColor }
}

export type ProgramFormatColor =
  | 'red' | 'dark-blue' | 'mint' | 'lavender' | 'cream'
  | 'very-dark' | 'mint-dark' | 'lavender-dark'
  | 'red-soft' | 'mint-soft'

export type ProgramFormat = {
  title: string; slug: string; color: ProgramFormatColor;
  isBreak?: boolean; isSideEvent?: boolean
}

export type ProgramTopic = { _id: string; title: string; slug: string; order?: number }

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
  content?: PortableTextBlock[]; backgroundColor?: string; narrowWidth?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'xl'
}

export type SpeakerGridBlock = {
  _type: 'speakerGrid'; _key: string; heading?: string; subheading?: string;
  filter?: 'all' | 'keynote' | 'lightning'; backgroundColor?: string;
  showComingSoon?: boolean
}

export type ScheduleSession = {
  _key: string; time: string; title: string; description?: string;
  whatToExpect?: string;
  format?: ProgramFormat;
  speakers?: Pick<Speaker, '_id' | 'name' | 'role' | 'company' | 'slug' | 'photo'>[];
  topics?: ProgramTopic[];
  location?: string;
  linkUrl?: string; linkLabel?: string
}

export type ScheduleBlock = {
  _type: 'schedule'; _key: string; heading?: string;
  outcomesIntro?: string;
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
  _key: string; title: string; description?: PortableTextBlock[];
  link?: SanityLink; accentColor?: string
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

export type PersonSpotlightBlock = {
  _type: 'personSpotlight'; _key: string;
  enabled?: boolean;
  label?: string; heading?: string;
  name: string; role?: string; company?: string;
  bio?: string; image: SanityImage;
  imagePosition?: 'left' | 'right';
  backgroundColor?: 'cream' | 'lavender' | 'white' | 'mint' | 'dark-blue'
}

export type Participant = {
  _key: string; name: string; role?: string; company?: string;
  image?: SanityImage; bio?: string
}

export type ParticipantGridBlock = {
  _type: 'participantGrid'; _key: string;
  enabled?: boolean;
  heading?: string; subheading?: string;
  participants?: Participant[];
  backgroundColor?: 'cream' | 'lavender' | 'white' | 'mint' | 'dark-blue';
  showPlaceholders?: boolean
}

export type Block =
  | HeroBlock | RichTextBlock | SpeakerGridBlock | ScheduleBlock
  | ImageGalleryBlock | VideoEmbedBlock | CtaSectionBlock | StatsCounterBlock
  | TeamGridBlock | PartnerGridBlock | CardGridBlock | FaqAccordionBlock
  | QuoteBlock | VenueMapBlock | VideoCarouselBlock | PersonSpotlightBlock | ParticipantGridBlock
