import { groq } from 'next-sanity'

export const allTeamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc, name asc) {
    _id, name, role, photo, linkedin
  }
`
