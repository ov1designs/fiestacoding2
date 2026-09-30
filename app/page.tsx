import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { CodeBackground } from "@/components/code-background"
import { CustomCursor } from "@/components/custom-cursor"
import { HomeFounder } from "@/components/home-founder"
import { HomeImpact } from "@/components/home-impact"
import { HomeInsights } from "@/components/home-insights"
import { HomeVision } from "@/components/home-vision"
import { HomeInstagram } from "@/components/home-instagram"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground" suppressHydrationWarning>
      <CustomCursor />
      <Navbar />
      <main>
        <div className="relative overflow-hidden cursor-none">
          <CodeBackground />
          <HeroSection />
        </div>
        <HomeFounder />
        <HomeVision />
        <HomeInsights />
        <HomeImpact />
        <HomeInstagram />
      </main>
    </div>
  )
}
