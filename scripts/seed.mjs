import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { basename } from 'path'

const client = createClient({
  projectId: '8uk0dvi6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

const MEDIA = '/Users/alis/Projects/ID/media'

async function uploadImage(filename) {
  const filepath = `${MEDIA}/${filename}`
  const buffer = readFileSync(filepath)
  const asset = await client.assets.upload('image', buffer, {
    filename: basename(filename),
    contentType: 'image/jpeg',
  })
  console.log(`  Uploaded: ${filename} -> ${asset._id}`)
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

async function main() {
  console.log('Seeding Sanity project...\n')

  // Upload hero/background images
  console.log('Uploading images...')
  const heroImg = await uploadImage('DSC04152.jpg')
  const img1 = await uploadImage('DSC04181.jpg')
  const img2 = await uploadImage('DSC04192.jpg')
  const img3 = await uploadImage('DSC04209.jpg')
  const img4 = await uploadImage('DSC04559.jpg')
  const img5 = await uploadImage('DSC04600.jpg')
  const img6 = await uploadImage('DSC04642-3.jpg')
  const img7 = await uploadImage('DSC04817.jpg')
  const img8 = await uploadImage('DSC04904.jpg')
  const img9 = await uploadImage('DSC05007.jpg')
  const img10 = await uploadImage('DSC05140.jpg')
  const img11 = await uploadImage('DSC05166-2.jpg')
  const img12 = await uploadImage('DSC05310.jpg')
  const img13 = await uploadImage('DSC05377.jpg')
  const img14 = await uploadImage('DSC05406.jpg')
  const img15 = await uploadImage('DSC06494.jpg')
  const img16 = await uploadImage('DSC06599.jpg')
  const img17 = await uploadImage('DSC06805.jpg')
  const img18 = await uploadImage('DSC06829-Enhanced-NR-2.jpg')
  const img19 = await uploadImage('DSC06882-Enhanced-NR.jpg')
  const net1 = await uploadImage('ODA_Network-103.jpg')
  const net2 = await uploadImage('ODA_Network-105.jpg')
  const net3 = await uploadImage('ODA_Network-112.jpg')
  const net4 = await uploadImage('ODA_Network-114.jpg')
  const net5 = await uploadImage('ODA_Network-125.jpg')
  const net6 = await uploadImage('ODA_Network-130.jpg')
  const net7 = await uploadImage('ODA_Network-139.jpg')
  const net8 = await uploadImage('ODA_Network-144.jpg')
  const net9 = await uploadImage('ODA_Network-152.jpg')
  const net10 = await uploadImage('ODA_Network-159.jpg')
  const net11 = await uploadImage('ODA_Network-161.jpg')

  // Create speakers
  console.log('\nCreating speakers...')
  function toSlug(name) {
    return name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
  }

  const speakers = [
    { name: 'Maria Johansen', role: 'CTO', company: 'Nordic Tech', topic: 'Building Inclusive Engineering Teams', isLightningTalk: false, photo: img1 },
    { name: 'Aisha Patel', role: 'VP of Engineering', company: 'Spotify', topic: 'Scaling Diversity in Product Teams', isLightningTalk: false, photo: img2 },
    { name: 'Emma Lindqvist', role: 'Founder & CEO', company: 'TechShe', topic: 'The Future of Women in AI', isLightningTalk: false, photo: img3 },
    { name: 'Sara Nilsen', role: 'Director of Innovation', company: 'DNB', topic: 'Fintech and the Diversity Advantage', isLightningTalk: false, photo: net1 },
    { name: 'Karin Olsen', role: 'Head of Design', company: 'Figma', topic: 'Design Systems for Everyone', isLightningTalk: false, photo: net2 },
    { name: 'Ingrid Berg', role: 'Senior Developer', company: 'Equinor', topic: 'Energy Tech Meets Inclusion', isLightningTalk: false, photo: net3 },
    { name: 'Priya Sharma', role: 'Data Scientist', company: 'Cognite', topic: 'AI Ethics and Bias Detection', isLightningTalk: true, photo: net4 },
    { name: 'Tone Haugen', role: 'Product Manager', company: 'Vipps', topic: 'From Idea to Impact in 5 Minutes', isLightningTalk: true, photo: net5 },
    { name: 'Lin Chen', role: 'Security Engineer', company: 'Telenor', topic: 'Cybersecurity Careers for Women', isLightningTalk: true, photo: net6 },
    { name: 'Frida Andersen', role: 'Tech Lead', company: 'Schibsted', topic: 'Media Tech and Diverse Voices', isLightningTalk: true, photo: net7 },
  ]

  const speakerDocs = []
  for (const s of speakers) {
    const doc = await client.create({
      _type: 'speaker',
      name: s.name,
      slug: { _type: 'slug', current: toSlug(s.name) },
      role: s.role,
      company: s.company,
      topic: s.topic,
      isLightningTalk: s.isLightningTalk,
      photo: s.photo,
    })
    speakerDocs.push(doc)
    console.log(`  Created speaker: ${s.name}`)
  }

  // Create team members
  console.log('\nCreating team members...')
  const team = [
    { name: 'Lise Katrine Holter', role: 'Project Lead', photo: net8, order: 1 },
    { name: 'Mathilde Vik', role: 'Program Director', photo: net9, order: 2 },
    { name: 'Julie Strand', role: 'Communications', photo: net10, order: 3 },
    { name: 'Hanna Fossberg', role: 'Partnerships', photo: net11, order: 4 },
    { name: 'Siri Larsen', role: 'Logistics', photo: img11, order: 5 },
    { name: 'Camilla Ruud', role: 'Volunteer Coordinator', photo: img12, order: 6 },
  ]

  for (const m of team) {
    await client.create({
      _type: 'teamMember',
      name: m.name,
      role: m.role,
      photo: m.photo,
      order: m.order,
    })
    console.log(`  Created team member: ${m.name}`)
  }

  // Create sponsors
  console.log('\nCreating sponsors...')
  const sponsors = [
    { name: 'DNB', tier: 'platinum', url: 'https://dnb.no' },
    { name: 'Equinor', tier: 'platinum', url: 'https://equinor.com' },
    { name: 'Telenor', tier: 'gold', url: 'https://telenor.no' },
    { name: 'Schibsted', tier: 'gold', url: 'https://schibsted.com' },
    { name: 'Cognite', tier: 'silver', url: 'https://cognite.com' },
    { name: 'Vipps', tier: 'silver', url: 'https://vipps.no' },
    { name: 'Bekk', tier: 'bronze', url: 'https://bekk.no' },
    { name: 'Iterate', tier: 'bronze', url: 'https://iterate.no' },
  ]

  for (const s of sponsors) {
    await client.create({
      _type: 'sponsor',
      name: s.name,
      tier: s.tier,
      url: s.url,
    })
    console.log(`  Created sponsor: ${s.name}`)
  }

  // Create Home page
  console.log('\nCreating pages...')

  await client.create({
    _type: 'page',
    title: 'Home',
    slug: { _type: 'slug', current: 'home' },
    blocks: [
      {
        _type: 'hero',
        _key: 'hero1',
        heading: 'ODA Inspiration Day',
        subheading: 'Nordens største tech-konferanse for mangfold og inkludering. 11,000+ medlemmer. One powerful day.',
        backgroundImage: heroImg,
        style: 'fullscreen',
        cta: { _type: 'link', label: 'Get Tickets', href: '/tickets', isExternal: false },
        secondaryCta: { _type: 'link', label: 'Watch Aftermovie', href: '#aftermovie', isExternal: false },
      },
      {
        _type: 'statsCounter',
        _key: 'stats1',
        heading: 'ODA Inspiration Day in Numbers',
        backgroundColor: 'cream',
        stats: [
          { _key: 's1', value: 1200, suffix: '+', label: 'Attendees' },
          { _key: 's2', value: 30, suffix: '+', label: 'Speakers' },
          { _key: 's3', value: 11000, suffix: '+', label: 'Network Members' },
          { _key: 's4', value: 8, label: 'Years Running' },
        ],
      },
      {
        _type: 'videoEmbed',
        _key: 'video1',
        heading: 'Aftermovie 2025',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        aspectRatio: '16:9',
        caption: 'Relive the magic of ODA Inspiration Day 2025',
      },
      {
        _type: 'cardGrid',
        _key: 'cards1',
        heading: 'Explore the Event',
        columns: 3,
        cards: [
          { _key: 'c1', title: 'Program', description: [{ _type: 'block', _key: 'dc1', style: 'normal', children: [{ _type: 'span', _key: 'ds1', text: 'Discover keynotes, panels, and lightning talks from industry leaders.' }] }], link: { _type: 'link', label: 'View Program', href: '/program', isExternal: false }, accentColor: 'red' },
          { _key: 'c2', title: 'Speakers', description: [{ _type: 'block', _key: 'dc2', style: 'normal', children: [{ _type: 'span', _key: 'ds2', text: 'Meet the brilliant minds shaping the future of tech and diversity.' }] }], link: { _type: 'link', label: 'See Speakers', href: '/speakers', isExternal: false }, accentColor: 'lavender' },
          { _key: 'c3', title: 'Tickets', description: [{ _type: 'block', _key: 'dc3', style: 'normal', children: [{ _type: 'span', _key: 'ds3', text: 'Secure your spot at the most inspiring day of the year.' }] }], link: { _type: 'link', label: 'Get Tickets', href: '/tickets', isExternal: false }, accentColor: 'mint' },
          { _key: 'c4', title: 'Venue', description: [{ _type: 'block', _key: 'dc4', style: 'normal', children: [{ _type: 'span', _key: 'ds4', text: 'Oslo Spektrum — right in the heart of the city.' }] }], link: { _type: 'link', label: 'See Venue', href: '/venue', isExternal: false }, accentColor: 'dark-blue' },
          { _key: 'c5', title: 'ODA Awards', description: [{ _type: 'block', _key: 'dc5', style: 'normal', children: [{ _type: 'span', _key: 'ds5', text: 'Celebrating outstanding contributions to diversity in tech.' }] }], link: { _type: 'link', label: 'Learn More', href: '/oda-awards', isExternal: false }, accentColor: 'red' },
          { _key: 'c6', title: 'Afterparty', description: [{ _type: 'block', _key: 'dc6', style: 'normal', children: [{ _type: 'span', _key: 'ds6', text: 'The networking continues after hours. Don\'t miss it.' }] }], link: { _type: 'link', label: 'Details', href: '/afterparty', isExternal: false }, accentColor: 'lavender' },
        ],
      },
      {
        _type: 'imageGallery',
        _key: 'gallery1',
        heading: 'Moments from 2025',
        layout: 'masonry',
        columns: 3,
        images: [
          { ...img4, _key: 'g1', alt: 'Conference attendees networking' },
          { ...img5, _key: 'g2', alt: 'Keynote speaker on stage' },
          { ...img6, _key: 'g3', alt: 'Panel discussion' },
          { ...img7, _key: 'g4', alt: 'Workshop session' },
          { ...img8, _key: 'g5', alt: 'Audience engagement' },
          { ...img9, _key: 'g6', alt: 'Networking break' },
          { ...img10, _key: 'g7', alt: 'Award ceremony' },
          { ...img13, _key: 'g8', alt: 'Tech exhibition' },
          { ...img14, _key: 'g9', alt: 'Group photo' },
        ],
      },
      {
        _type: 'speakerGrid',
        _key: 'speakers1',
        heading: 'Featured Speakers',
        subheading: 'Industry leaders sharing their vision for a more inclusive tech future.',
        filter: 'keynote',
        backgroundColor: 'lavender',
      },
      {
        _type: 'ctaSection',
        _key: 'cta1',
        heading: 'Ready to be Inspired?',
        body: 'Join 1,200+ tech professionals for a day of inspiration, learning, and connection.',
        backgroundColor: 'red',
        cta: { _type: 'link', label: 'Get Your Ticket Now', href: '/tickets', isExternal: false },
        secondaryCta: { _type: 'link', label: 'Become a Partner', href: '/venue', isExternal: false },
      },
      {
        _type: 'partnerGrid',
        _key: 'partners1',
        heading: 'Our Partners',
        showTiers: true,
        backgroundColor: 'white',
      },
    ],
  })
  console.log('  Created: Home')

  // Speakers page
  await client.create({
    _type: 'page',
    title: 'Speakers',
    slug: { _type: 'slug', current: 'speakers' },
    blocks: [
      {
        _type: 'hero',
        _key: 'hero1',
        heading: 'Speakers',
        subheading: 'Meet the brilliant minds taking the stage at ODA Inspiration Day.',
        style: 'medium',
        backgroundImage: img15,
      },
      {
        _type: 'speakerGrid',
        _key: 'sg1',
        heading: 'Keynote Speakers',
        subheading: 'Our main stage presenters bringing bold ideas and fresh perspectives.',
        filter: 'keynote',
      },
    ],
  })
  console.log('  Created: Speakers')

  // Program page
  await client.create({
    _type: 'page',
    title: 'Program',
    slug: { _type: 'slug', current: 'program' },
    blocks: [
      {
        _type: 'hero',
        _key: 'hero1',
        heading: 'Program',
        subheading: 'A full day of keynotes, panels, workshops, and networking.',
        style: 'medium',
        backgroundImage: img16,
      },
      {
        _type: 'schedule',
        _key: 'sched1',
        heading: 'Conference Schedule',
        sessions: [
          { _key: 'se1', time: '08:30', title: 'Registration & Coffee', tag: 'break', location: 'Main Lobby' },
          { _key: 'se2', time: '09:00', title: 'Opening Ceremony', tag: 'keynote', description: 'Welcome to ODA Inspiration Day!', location: 'Main Stage' },
          { _key: 'se3', time: '09:30', title: 'Building Inclusive Engineering Teams', tag: 'keynote', description: 'How to create engineering cultures where everyone thrives.', speaker: { _type: 'reference', _ref: speakerDocs[0]._id }, location: 'Main Stage' },
          { _key: 'se4', time: '10:15', title: 'Scaling Diversity in Product Teams', tag: 'keynote', description: 'Lessons from building diverse product teams at scale.', speaker: { _type: 'reference', _ref: speakerDocs[1]._id }, location: 'Main Stage' },
          { _key: 'se5', time: '11:00', title: 'Coffee Break', tag: 'break', location: 'Exhibition Area' },
          { _key: 'se6', time: '11:30', title: 'The Future of Women in AI', tag: 'keynote', description: 'Shaping AI development with diverse perspectives.', speaker: { _type: 'reference', _ref: speakerDocs[2]._id }, location: 'Main Stage' },
          { _key: 'se7', time: '12:15', title: 'Lightning Talks Round 1', tag: 'lightning', description: 'Four rapid-fire talks on innovation and inclusion.', location: 'Main Stage' },
          { _key: 'se8', time: '12:45', title: 'Lunch & Networking', tag: 'break', location: 'Exhibition Area' },
          { _key: 'se9', time: '14:00', title: 'Panel: Fintech and the Diversity Advantage', tag: 'panel', description: 'Industry leaders discuss how diversity drives innovation in financial technology.', location: 'Main Stage' },
          { _key: 'se10', time: '15:00', title: 'Design Systems for Everyone', tag: 'keynote', speaker: { _type: 'reference', _ref: speakerDocs[4]._id }, location: 'Main Stage' },
          { _key: 'se11', time: '15:45', title: 'Lightning Talks Round 2', tag: 'lightning', location: 'Main Stage' },
          { _key: 'se12', time: '16:15', title: 'ODA Awards Ceremony', tag: 'keynote', description: 'Celebrating outstanding contributions to diversity in tech.', location: 'Main Stage' },
          { _key: 'se13', time: '17:00', title: 'Closing & Afterparty', tag: 'networking', description: 'Wrap up the day and continue the conversation.', location: 'Main Stage & Venue Bar' },
        ],
      },
    ],
  })
  console.log('  Created: Program')

  // Tickets page
  await client.create({
    _type: 'page',
    title: 'Tickets',
    slug: { _type: 'slug', current: 'tickets' },
    seo: {
      _type: 'seo',
      title: 'Tickets — ODA Inspiration Day 2026',
      description: 'Get your ticket for ODA Inspiration Day 2026. Physical and digital tickets available from 29th April. Includes exhibition access, main stage, lunch, and more.',
    },
    blocks: [
      // Block 1: Hero
      {
        _type: 'hero',
        _key: 'hero1',
        heading: 'Get Your Tickets',
        subheading: 'Tickets available 29th April 2026',
        style: 'medium',
        backgroundImage: img17,
        cta: { _type: 'link', label: 'Become an ODA Member', href: 'https://www.odanettverk.no/bli-medlem', isExternal: true },
        secondaryCta: { _type: 'link', label: 'Update Your Profile', href: 'https://www.odanettverk.no/min-side', isExternal: true },
      },
      // Block 2: Ticket info intro
      {
        _type: 'richText',
        _key: 'info1',
        narrowWidth: true,
        backgroundColor: 'cream',
        content: [
          {
            _type: 'block', _key: 'b1', style: 'normal',
            children: [
              { _type: 'span', _key: 's1', text: 'Tickets will be available on 29th April 2026!' },
            ],
          },
          {
            _type: 'block', _key: 'b2', style: 'normal',
            children: [
              { _type: 'span', _key: 's2', text: 'Make sure to ' },
              {
                _type: 'span', _key: 's3', text: 'update your ODA membership profile',
                marks: ['link1'],
              },
              { _type: 'span', _key: 's4', text: ' or ' },
              {
                _type: 'span', _key: 's5', text: 'become an ODA member',
                marks: ['link2'],
              },
              { _type: 'span', _key: 's6', text: ' to secure your ticket once registration opens.' },
            ],
            markDefs: [
              { _type: 'link', _key: 'link1', href: 'https://www.odanettverk.no/min-side' },
              { _type: 'link', _key: 'link2', href: 'https://www.odanettverk.no/bli-medlem' },
            ],
          },
          {
            _type: 'block', _key: 'b3', style: 'normal',
            children: [
              { _type: 'span', _key: 's7', text: 'To improve the experience of ODA Inspiration Day, we are introducing a ticket fee this year. The cost will be XXX NOK and the ticket includes:' },
            ],
          },
        ],
      },
      // Block 3: What's included (card grid)
      {
        _type: 'cardGrid',
        _key: 'inclusions1',
        heading: "What's Included in Your Ticket",
        columns: 3,
        cards: [
          {
            _key: 'c1', title: 'Partner Exhibition',
            description: [{ _type: 'block', _key: 'd1', style: 'normal', children: [{ _type: 'span', _key: 't1', text: 'Access to the Inspiration Day exhibition with all our partners.' }] }],
            accentColor: 'lavender',
          },
          {
            _key: 'c2', title: 'Main Stage Programme',
            description: [{ _type: 'block', _key: 'd2', style: 'normal', children: [{ _type: 'span', _key: 't2', text: 'The full main stage programme with inspiring speakers and interesting talks.' }] }],
            accentColor: 'red',
          },
          {
            _key: 'c3', title: 'Fish Bowl Side Event',
            description: [{ _type: 'block', _key: 'd3', style: 'normal', children: [{ _type: 'span', _key: 't3', text: 'Our "fish bowl" side event hosted during the lunch break.' }] }],
            accentColor: 'mint',
          },
          {
            _key: 'c4', title: 'Lunch, Coffee & Tea',
            description: [{ _type: 'block', _key: 'd4', style: 'normal', children: [{ _type: 'span', _key: 't4', text: 'Lunch, coffee and tea is included in the price.' }] }],
            accentColor: 'dark-blue',
          },
          {
            _key: 'c5', title: 'Coworking Space',
            description: [{ _type: 'block', _key: 'd5', style: 'normal', children: [{ _type: 'span', _key: 't5', text: 'Access to our new coworking space and start-up wall.' }] }],
            accentColor: 'lavender',
          },
          {
            _key: 'c6', title: 'And More',
            description: [{ _type: 'block', _key: 'd6', style: 'normal', children: [{ _type: 'span', _key: 't6', text: 'Stay tuned for additional surprises and experiences.' }] }],
            accentColor: 'red',
          },
        ],
      },
      // Block 4: Why attend CTA
      {
        _type: 'ctaSection',
        _key: 'ctaWhyAttend',
        heading: 'Want to Know More?',
        body: 'Learn about everything ODA Inspiration Day has to offer.',
        backgroundColor: 'lavender',
        cta: { _type: 'link', label: 'Why Attend', href: '/why-attend', isExternal: false },
      },
      // Block 5: Digital attendance
      {
        _type: 'ctaSection',
        _key: 'ctaDigital',
        heading: 'Join Us Digitally',
        body: 'If you are unable to attend ODA Inspiration Day physically, we offer online tickets to follow the streaming of the conference. Attending digitally is free and open for everyone. Registration opens 29th April.',
        backgroundColor: 'dark-blue',
        cta: { _type: 'link', label: 'Register for Streaming', href: 'https://odanettverk.no/streaming', isExternal: true },
      },
      // Block 6: Cancellation
      {
        _type: 'ctaSection',
        _key: 'ctaCancel',
        heading: "Can't Attend? Here's How to Cancel",
        body: 'Can\'t make it to ODA Inspiration Day? To cancel your physical ticket, please send an e-mail to inspirationday@odanettverk.no.',
        backgroundColor: 'mint',
        cta: { _type: 'link', label: 'Send Cancellation Email', href: 'mailto:inspirationday@odanettverk.no', isExternal: true },
      },
      // Block 7: Event participation policy
      {
        _type: 'richText',
        _key: 'policy1',
        heading: 'Event Participation Policy',
        narrowWidth: true,
        backgroundColor: 'cream',
        content: [
          {
            _type: 'block', _key: 'p1', style: 'normal', listItem: 'bullet', level: 1,
            children: [{ _type: 'span', _key: 'ps1', text: 'By registering for this event, you agree that ODA Network reserves the right to use photos and video material captured during the event for marketing and communication purposes.' }],
          },
          {
            _type: 'block', _key: 'p2', style: 'normal', listItem: 'bullet', level: 1,
            children: [{ _type: 'span', _key: 'ps2', text: 'Cancellations after May 23rd will incur a cancellation fee of NOK 300.' }],
          },
          {
            _type: 'block', _key: 'p3', style: 'normal', listItem: 'bullet', level: 1,
            children: [{ _type: 'span', _key: 'ps3', text: 'Please note that ODA Network operates with a no-show fee of NOK 500.' }],
          },
        ],
      },
    ],
  })
  console.log('  Created: Tickets')

  // Venue page
  await client.create({
    _type: 'page',
    title: 'Venue',
    slug: { _type: 'slug', current: 'venue' },
    blocks: [
      {
        _type: 'hero',
        _key: 'hero1',
        heading: 'The Venue',
        subheading: 'Oslo Spektrum — in the heart of the city.',
        style: 'medium',
        backgroundImage: img18,
      },
      {
        _type: 'venueMap',
        _key: 'vm1',
        heading: 'Oslo Spektrum',
        description: 'Located in the center of Oslo, just steps from Oslo Central Station. Easy access by public transport, with plenty of hotels nearby.',
        address: 'Sonja Henies plass 2, 0185 Oslo, Norway',
        venueImage: img19,
        googleMapsUrl: 'https://maps.google.com/?q=Oslo+Spektrum',
      },
    ],
  })
  console.log('  Created: Venue')

  // Team page
  await client.create({
    _type: 'page',
    title: 'Team',
    slug: { _type: 'slug', current: 'team' },
    blocks: [
      {
        _type: 'hero',
        _key: 'hero1',
        heading: 'Our Team',
        subheading: 'The amazing people behind ODA Inspiration Day.',
        style: 'medium',
      },
      {
        _type: 'teamGrid',
        _key: 'tg1',
        heading: 'Meet the Team',
        subheading: 'Dedicated volunteers making it all happen.',
      },
    ],
  })
  console.log('  Created: Team')

  // ODA Awards page
  await client.create({
    _type: 'page',
    title: 'ODA Awards',
    slug: { _type: 'slug', current: 'oda-awards' },
    blocks: [
      {
        _type: 'hero',
        _key: 'hero1',
        heading: 'ODA Awards',
        subheading: 'Celebrating outstanding contributions to diversity in Nordic tech.',
        style: 'medium',
        backgroundImage: img15,
      },
      {
        _type: 'richText',
        _key: 'rt1',
        heading: 'About the ODA Awards',
        content: [
          { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'The ODA Awards recognize individuals and organizations making exceptional efforts to promote diversity and inclusion in the Nordic tech industry. Winners are selected by a jury of industry leaders and previous award recipients.' }] },
          { _type: 'block', _key: 'b2', style: 'normal', children: [{ _type: 'span', _key: 's2', text: 'Categories include Role Model of the Year, Company of the Year, and Rising Star. The awards ceremony takes place during ODA Inspiration Day.' }] },
        ],
      },
      {
        _type: 'imageGallery',
        _key: 'ig1',
        heading: 'Previous Award Winners',
        layout: 'grid',
        columns: 3,
        images: [
          { ...img4, _key: 'g1', alt: 'Award ceremony 2025' },
          { ...img9, _key: 'g2', alt: 'Award winner speech' },
          { ...img10, _key: 'g3', alt: 'Award celebration' },
        ],
      },
      {
        _type: 'ctaSection',
        _key: 'cta1',
        enabled: true,
        heading: 'Learn More About ODA-prisen',
        body: 'Discover the history, categories, and previous winners of the ODA Awards on our main site.',
        cta: { _type: 'link', label: 'Read more about ODA-prisen', href: 'https://odanettverk.no/initiativer/oda-prisen/', isExternal: true },
        backgroundColor: 'dark-blue',
      },
    ],
  })
  console.log('  Created: ODA Awards')

  // Theme page
  await client.create({
    _type: 'page',
    title: 'Theme',
    slug: { _type: 'slug', current: 'theme' },
    blocks: [
      {
        _type: 'hero',
        _key: 'hero1',
        heading: 'Theme',
        subheading: 'This year\'s theme explores how diversity drives innovation across the Nordic tech landscape.',
        style: 'medium',
        backgroundImage: img16,
      },
      {
        _type: 'richText',
        _key: 'rt1',
        heading: 'Diversity Drives Innovation',
        content: [
          { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'ODA Inspiration Day centres around the idea that diverse teams build better technology. From inclusive hiring practices to equitable product design, we explore every angle of what it means to create tech that works for everyone.' }] },
          { _type: 'block', _key: 'b2', style: 'normal', children: [{ _type: 'span', _key: 's2', text: 'Through keynotes, panels, and interactive workshops, our speakers will share real-world strategies for fostering inclusion at every level of your organisation.' }] },
        ],
      },
    ],
  })
  console.log('  Created: Theme')

  // Afterparty page
  await client.create({
    _type: 'page',
    title: 'Afterparty',
    slug: { _type: 'slug', current: 'afterparty' },
    blocks: [
      {
        _type: 'hero',
        _key: 'hero1',
        heading: 'Afterparty',
        subheading: 'The networking continues after dark.',
        style: 'medium',
        backgroundImage: img18,
      },
      {
        _type: 'richText',
        _key: 'rt1',
        heading: 'Continue the Conversation',
        content: [
          { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'The afterparty is included in your ticket. Join us for drinks, music, and networking in a relaxed atmosphere. It\'s the perfect opportunity to connect with speakers, sponsors, and fellow attendees.' }] },
        ],
      },
      {
        _type: 'ctaSection',
        _key: 'cta1',
        heading: 'Don\'t Miss the Party',
        body: 'The afterparty starts right after the closing ceremony. Your conference ticket is your entry pass.',
        backgroundColor: 'dark-blue',
        cta: { _type: 'link', label: 'Get Your Ticket', href: '/tickets', isExternal: false },
      },
    ],
  })
  console.log('  Created: Afterparty')

  // Lightning Talks page
  await client.create({
    _type: 'page',
    title: 'Lightning Talks',
    slug: { _type: 'slug', current: 'lightning-talks' },
    blocks: [
      {
        _type: 'hero',
        _key: 'hero1',
        heading: 'Lightning Talks',
        subheading: 'Quick, powerful talks that pack a punch. 5 minutes to change your perspective.',
        style: 'medium',
      },
      {
        _type: 'speakerGrid',
        _key: 'sg1',
        heading: 'Lightning Talk Speakers',
        subheading: 'Bold ideas delivered at lightning speed.',
        filter: 'lightning',
      },
    ],
  })
  console.log('  Created: Lightning Talks')

  // Site Settings
  console.log('\nCreating site settings...')
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteName: 'ODA Inspiration Day',
    siteDescription: 'Nordens største tech-konferanse for mangfold og inkludering.',
    ticketUrl: 'https://tickets.odanettverk.no',
    contactEmail: 'hello@odanettverk.no',
    mainNav: [
      { _key: 'n1', _type: 'navItem', label: 'Program', href: '/program' },
      { _key: 'n2', _type: 'navItem', label: 'Speakers', href: '/speakers' },
      { _key: 'n3', _type: 'navItem', label: 'Tickets', href: '/tickets' },
      { _key: 'n4', _type: 'navItem', label: 'Venue', href: '/venue' },
      { _key: 'n5', _type: 'navItem', label: 'ODA Awards', href: '/oda-awards' },
      { _key: 'n6', _type: 'navItem', label: 'Team', href: '/team' },
    ],
    socialLinks: [
      { _key: 'sl1', _type: 'socialLink', platform: 'linkedin', url: 'https://www.linkedin.com/company/oda---women-in-tech-network/' },
      { _key: 'sl2', _type: 'socialLink', platform: 'instagram', url: 'https://instagram.com/odanettverk' },
    ],
  })
  console.log('  Created: Site Settings')

  console.log('\nDone! All content has been seeded.')
}

main().catch(console.error)
