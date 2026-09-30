export const EVENT_DETAILS = {
  name: "Fiesta Code & AI Community Code Jam",
  date: "February 15",
  startTime: "2:00 PM",
  endTime: "5:00 PM",
  timezone: "America/Denver",
  locationLabel: "La Nube - Galleria Room",
  audience: "Elementary + Middle School",
  notes: "Beginner-friendly coding stations. No experience required.",
}

export const SPONSOR_TIERS = [
  {
    id: "gold",
    name: "Gold",
    color: "fiesta-yellow" as const,
    benefits: [
      "Logo on homepage",
      "Stage shoutout at event",
      "Dedicated social media post",
      "Booth/table at event",
      "10 volunteer passes",
    ],
  },
  {
    id: "silver",
    name: "Silver",
    color: "fiesta-orange" as const,
    benefits: [
      "Logo on website",
      "Social media mention",
      "5 volunteer passes",
    ],
  },
  {
    id: "bronze",
    name: "Bronze",
    color: "fiesta-red" as const,
    benefits: [
      "Logo on website",
      "2 volunteer passes",
    ],
  },
]

export const PRESS_ITEMS = [
  {
    id: "ep-inc",
    title: "El Paso High Schoolers Develop App to Aid Caregivers",
    outlet: "El Paso Inc.",
    excerpt:
      "Local students are making waves in the tech community, building innovative solutions that address real-world challenges facing their community.",
    date: "2025",
    url: "https://www.elpasoinc.com/news/local_news/el-paso-high-schoolers-develop-app-to-aid-caregivers/article_8abf059d-206d-4cce-90d4-5c921aba8f9b.html",
    disclaimer: "External link opens El Paso Inc.",
  },
]

export const IMPACT_STATS = [
  { label: "Students Served", value: 150 },
  { label: "Volunteer Mentors", value: 25 },
  { label: "Coding Stations", value: 12 },
  { label: "Community Events", value: 8 },
]

export const PARTNER_LOGOS = [
  { name: "La Nube", color: "bg-fiesta-red" },
  { name: "EPISD", color: "bg-fiesta-orange" },
  { name: "UTEP", color: "bg-fiesta-green" },
  { name: "EP Tech Hub", color: "bg-fiesta-yellow" },
]

export const CODING_EXPERIENCE_LEVELS = [
  "None",
  "Beginner",
  "Intermediate",
  "Advanced",
] as const

export const VOLUNTEER_ROLES = [
  "Station Helper",
  "Floater",
  "Setup & Breakdown",
  "Photography",
] as const

export const TIME_BLOCKS = [
  "2:00 - 3:00 PM",
  "3:00 - 4:00 PM",
  "4:00 - 5:00 PM",
] as const

export function generateICS(): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Fiesta Code//EN",
    "BEGIN:VEVENT",
    "DTSTART;TZID=America/Denver:20260215T140000",
    "DTEND;TZID=America/Denver:20260215T170000",
    "SUMMARY:Fiesta Code & AI Community Code Jam",
    "LOCATION:La Nube - Galleria Room",
    "DESCRIPTION:Beginner-friendly coding stations. No experience required.",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
  return lines.join("\r\n")
}

/* ---- Next event (drives the Home page countdown) ----
 * Set `date` to an ISO string like "2026-11-14T14:00:00-07:00" once the next
 * workshop is scheduled. Leave it null to show a "date coming soon" message. */
export const NEXT_EVENT: { date: string | null; label: string } = {
  date: null,
  label: "",
}

export const INSTAGRAM_HANDLE = "fiestacoding.ai"
export const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`

/* ---- Congressional App Challenge links ----
 * An empty string renders the button as "Link coming soon". */
export const APP_CHALLENGE_LINKS = {
  careCompanionApp: "", // TODO: link to the Care Companion app itself
  careCompanionFeature: "https://www.congressionalappchallenge.us/24-TX16/",
  winningProjectPage: "https://www.congressionalappchallenge.us/tx16-24/",
  houseOfCode: "https://www.congressionalappchallenge.us/students/houseofcode/",
  ambassadorProgram: "https://www.congressionalappchallenge.us/get-involved/alumni/",
  marcusAmbassador: "", // TODO: Marcus-specific Ambassador page, certificate, or profile
  challengeHome: "https://www.congressionalappchallenge.us/",
}

/* ---- In the News ----
 * `url: ""` shows "Link coming soon". `image` is a path in /public once a photo exists. */
export const NEWS_ITEMS: {
  id: string
  outlet: string
  headline: string
  description: string
  date: string
  url: string
  image?: string
  imageLabel: string
}[] = [
  {
    id: "ep-inc-care-companion",
    outlet: "El Paso Inc.",
    headline: "El Paso High Schoolers Develop App to Aid Caregivers",
    description:
      "Coverage of Care Companion, the caregiving app Marcus Hunt and Sebastian Ruiz built to help families manage medications, therapies, and care information.",
    date: "2025",
    url: "https://www.elpasoinc.com/news/local_news/el-paso-high-schoolers-develop-app-to-aid-caregivers/article_8abf059d-206d-4cce-90d4-5c921aba8f9b.html",
    image: "/images/webp/cac-marcus-sebastian-rep-escobar.webp",
    imageLabel: "Marcus Hunt and Sebastian Ruiz with Rep. Veronica Escobar",
  },
  {
    id: "cac-tx16-win",
    outlet: "Congressional App Challenge",
    headline: "Care Companion wins Rep. Veronica Escobar's 2024 Congressional App Challenge in Texas' 16th District",
    description:
      "The official Congressional App Challenge feature on Marcus and Sebastian's winning app and the stories that inspired it.",
    date: "2025",
    url: "https://www.congressionalappchallenge.us/24-TX16/",
    image: "/images/webp/cac-2024-winners-group.webp",
    imageLabel: "2024 Congressional App Challenge winners",
  },
  {
    id: "house-of-code",
    outlet: "House of Code",
    headline: "Presenting Care Companion in Washington, D.C.",
    description:
      "Marcus presented Care Companion on Capitol Hill as part of #HouseOfCode, the Congressional App Challenge's celebration of student winners.",
    date: "",
    url: "https://www.congressionalappchallenge.us/students/houseofcode/",
    image: "/images/webp/house-of-code-stage.webp",
    imageLabel: "The House of Code stage in Washington, D.C.",
  },
  {
    id: "ambassador",
    outlet: "Congressional App Challenge",
    headline: "Congressional App Challenge Ambassador",
    description:
      "After winning, Marcus became a Challenge Ambassador, encouraging more El Paso students to build apps and enter the Challenge.",
    date: "",
    url: "",
    imageLabel: "Ambassador photo",
  },
  {
    id: "fiesta-code-events",
    outlet: "Fiesta Code",
    headline: "Fiesta Code events and community partnerships",
    description:
      "Coverage of Fiesta Code workshops with partners like the Mexican American Cultural Center, El Paso Public Library, La Nube, and YWCA.",
    date: "",
    url: "",
    image: "/images/webp/workshop-room-wide.webp",
    imageLabel: "Students at a Fiesta Code workshop",
  },
]

/* ---- Testimonials ----
 * These are SAMPLE quotes from the site notes. Replace with real quotes and set
 * `sample: false`. Sample quotes show a small "Sample" tag on the page. */
export const TESTIMONIALS = [
  {
    quote: "I didn't know coding could be this fun. I liked making something that actually worked.",
    author: "Fiesta Code Student",
    category: "Student",
    sample: true,
  },
  {
    quote: "My child left the workshop asking when the next one was.",
    author: "Parent",
    category: "Parent",
    sample: true,
  },
  {
    quote: "The kids were engaged, curious, and excited to show each other what they created.",
    author: "Volunteer",
    category: "Volunteer",
    sample: true,
  },
  {
    quote: "Fiesta Code gives families a welcoming place to explore technology together.",
    author: "Community Partner",
    category: "Community Partner",
    sample: true,
  },
]

/* ---- Home page video insights (Marcus on coding, community, and AI) ----
 * TODO: replace the placeholder titles/topics with what each clip is about. */
export const INSIGHT_VIDEOS = [1, 2, 3, 4, 5, 6].map((n) => ({
  id: `insight-${n}`,
  title: `Insight #${n}`,
  topic: "Coding, Community & AI",
  src: `/videos/marcus-insight-${n}.mp4`,
  poster: `/videos/marcus-insight-${n}.webp`,
  duration: "0:30",
}))
