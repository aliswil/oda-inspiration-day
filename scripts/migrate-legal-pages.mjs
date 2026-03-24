import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '8uk0dvi6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

function block(key, style, text) {
  return {
    _type: 'block', _key: key, style: style || 'normal',
    children: [{ _type: 'span', _key: `${key}s`, text }],
    markDefs: [],
  }
}

function bullet(key, text) {
  return {
    _type: 'block', _key: key, style: 'normal', listItem: 'bullet',
    level: 1,
    children: [{ _type: 'span', _key: `${key}s`, text }],
    markDefs: [],
  }
}

const privacyBlocks = [
  {
    _type: 'richText',
    _key: 'privacy',
    heading: 'Privacy Policy',
    backgroundColor: 'cream',
    narrowWidth: true,
    content: [
      block('p1', 'normal', 'Last updated: March 2026'),
      block('p2', 'h3', 'Who we are'),
      block('p3', 'normal', 'ODA Inspiration Day is organized by ODA — Women in Tech Network (org. nr. pending), Oslo, Norway. We are the data controller for personal data collected through this website and event registration.'),
      block('p4', 'h3', 'What data we collect'),
      block('p5', 'normal', 'We collect the following personal data:'),
      bullet('b1', 'Name and email address when you register for the event or newsletter'),
      bullet('b2', 'Company and job title for badge printing and event statistics'),
      bullet('b3', 'Dietary preferences for catering purposes'),
      bullet('b4', 'Payment information processed securely by our payment provider'),
      bullet('b5', 'Photos and video taken during the event for promotional purposes'),
      block('p6', 'h3', 'Why we collect it'),
      block('p7', 'normal', 'We process your data to:'),
      bullet('c1', 'Register and manage your event attendance'),
      bullet('c2', 'Communicate event updates and logistics'),
      bullet('c3', 'Improve our events and services'),
      bullet('c4', 'Send you relevant information about future ODA events (with your consent)'),
      block('p8', 'h3', 'Legal basis'),
      block('p9', 'normal', 'We process personal data based on: (a) your consent, (b) performance of a contract (ticket purchase), and (c) our legitimate interest in organizing and improving our events. You can withdraw consent at any time.'),
      block('p10', 'h3', 'How long we keep it'),
      block('p11', 'normal', 'Event registration data is kept for up to 12 months after the event. Newsletter subscriptions are kept until you unsubscribe. Financial records are kept as required by Norwegian accounting law (5 years).'),
      block('p12', 'h3', 'Your rights'),
      block('p13', 'normal', 'Under GDPR, you have the right to access, correct, delete, or port your personal data. You can also object to or restrict processing. Contact us at info@odanettverk.no to exercise your rights.'),
      block('p14', 'h3', 'Cookies'),
      block('p15', 'normal', 'This website uses essential cookies for functionality. We use privacy-friendly analytics that do not track individual users. No third-party advertising cookies are used.'),
      block('p16', 'h3', 'Third parties'),
      block('p17', 'normal', 'We may share data with event partners and sponsors only with your explicit consent. Our website is hosted on Vercel (certified green hosting). We use Sanity CMS for content management.'),
      block('p18', 'h3', 'Contact'),
      block('p19', 'normal', 'For questions about this privacy policy or your personal data, contact info@odanettverk.no.'),
      block('p20', 'h3', 'Supervisory authority'),
      block('p21', 'normal', 'You have the right to file a complaint with the Norwegian Data Protection Authority (Datatilsynet) at datatilsynet.no.'),
    ],
  },
]

const cocBlocks = [
  {
    _type: 'richText',
    _key: 'coc',
    heading: 'Code of Conduct',
    backgroundColor: 'cream',
    narrowWidth: true,
    content: [
      block('q1', 'normal', 'ODA Inspiration Day is dedicated to providing a safe, inclusive, and harassment-free experience for everyone, regardless of gender, gender identity and expression, age, sexual orientation, disability, physical appearance, body size, race, ethnicity, religion, or technology choices.'),
      block('q2', 'h3', 'Expected behavior'),
      bullet('e1', 'Be respectful and considerate in your speech and actions'),
      bullet('e2', 'Refrain from demeaning, discriminatory, or harassing behavior and speech'),
      bullet('e3', 'Be mindful of your surroundings and fellow participants'),
      bullet('e4', 'Alert event staff if you notice a dangerous situation or someone in distress'),
      bullet('e5', 'Participate in an authentic and active way — contribute to a welcoming environment'),
      block('q3', 'h3', 'Unacceptable behavior'),
      bullet('u1', 'Harassment, intimidation, or discrimination in any form'),
      bullet('u2', 'Verbal, physical, or visual abuse directed at any attendee, speaker, sponsor, or staff'),
      bullet('u3', 'Unwelcome sexual attention or advances'),
      bullet('u4', 'Deliberate disruption of talks or other events'),
      bullet('u5', 'Sustained disruption of the event program'),
      bullet('u6', 'Photography or recording without consent'),
      block('q4', 'h3', 'Consequences'),
      block('q5', 'normal', 'Anyone asked to stop unacceptable behavior is expected to comply immediately. Event organizers may take any action deemed necessary, including warning the offender, expulsion from the event without refund, or contacting local law enforcement.'),
      block('q6', 'h3', 'Reporting'),
      block('q7', 'normal', 'If you experience or witness unacceptable behavior, please report it to any event staff member or email conduct@odanettverk.no. All reports will be handled with discretion and confidentiality.'),
      block('q8', 'h3', 'Scope'),
      block('q9', 'normal', 'This Code of Conduct applies to all event venues, event-related social events, and online spaces associated with ODA Inspiration Day, including social media.'),
      block('q10', 'normal', 'Thank you for helping make ODA Inspiration Day a welcoming and safe space for everyone.'),
    ],
  },
]

async function main() {
  // Privacy Policy
  const existingPrivacy = await client.fetch(
    `*[_type == "page" && slug.current == "privacy-policy"][0]{ _id }`
  )
  if (existingPrivacy) {
    await client.patch(existingPrivacy._id).set({ blocks: privacyBlocks }).commit()
    console.log('Updated Privacy Policy page.')
  } else {
    await client.create({
      _type: 'page', title: 'Privacy Policy', published: true,
      slug: { _type: 'slug', current: 'privacy-policy' },
      blocks: privacyBlocks,
    })
    console.log('Created Privacy Policy page.')
  }

  // Code of Conduct
  const existingCoc = await client.fetch(
    `*[_type == "page" && slug.current == "code-of-conduct"][0]{ _id }`
  )
  if (existingCoc) {
    await client.patch(existingCoc._id).set({ blocks: cocBlocks }).commit()
    console.log('Updated Code of Conduct page.')
  } else {
    await client.create({
      _type: 'page', title: 'Code of Conduct', published: true,
      slug: { _type: 'slug', current: 'code-of-conduct' },
      blocks: cocBlocks,
    })
    console.log('Created Code of Conduct page.')
  }

  console.log('Done!')
}

main().catch(console.error)
