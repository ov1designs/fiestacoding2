export interface DonationTier {
  id: string
  name: string
  nameEs: string
  description: string
  descriptionEs: string
  priceInCents: number
}

export const DONATION_TIERS: DonationTier[] = [
  {
    id: "donation-10",
    name: "Supporter",
    nameEs: "Apoyo",
    description: "Covers supplies for one student at a workshop",
    descriptionEs: "Cubre materiales para un estudiante en un taller",
    priceInCents: 1000,
  },
  {
    id: "donation-25",
    name: "Champion",
    nameEs: "Campeon",
    description: "Sponsors a student's full workshop experience",
    descriptionEs: "Patrocina la experiencia completa de un estudiante",
    priceInCents: 2500,
  },
  {
    id: "donation-50",
    name: "Builder",
    nameEs: "Constructor",
    description: "Funds equipment and materials for a coding station",
    descriptionEs: "Financia equipo y materiales para una estacion de programacion",
    priceInCents: 5000,
  },
  {
    id: "donation-100",
    name: "Visionary",
    nameEs: "Visionario",
    description: "Helps launch a full workshop event for the community",
    descriptionEs: "Ayuda a lanzar un evento completo para la comunidad",
    priceInCents: 10000,
  },
]
