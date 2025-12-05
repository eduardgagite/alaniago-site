import dynamic from "next/dynamic"
import HeroSection from "@/components/hero-section"
import { LazySection } from "@/components/lazy-section"

// Динамическая загрузка тяжелых компонентов для улучшения производительности
// Комбинация с LazySection обеспечивает:
// 1. Code splitting через dynamic imports
// 2. Intersection Observer для загрузки только видимых секций
const ServicesSection = dynamic(() => import("@/components/services-section"), {
  loading: () => <SectionSkeleton />,
})
const AboutSection = dynamic(() => import("@/components/about-section"), {
  loading: () => <SectionSkeleton />,
})
const ProjectsSection = dynamic(() => import("@/components/projects-section"), {
  loading: () => <SectionSkeleton />,
})
const ContactSection = dynamic(() => import("@/components/contact-section"), {
  loading: () => <SectionSkeleton minHeight="300px" />,
})

// Оптимизированный skeleton для секций
function SectionSkeleton({ minHeight = "500px" }: { minHeight?: string }) {
  return (
    <div 
      className="animate-pulse bg-gradient-to-b from-alania-dark/50 to-alania-dark"
      style={{ minHeight }}
      aria-hidden="true"
    >
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-8 w-48 bg-white/5 rounded-lg" />
          <div className="h-4 w-96 max-w-full bg-white/5 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full max-w-6xl">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-white/5 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      {/* Hero section загружается сразу - это above-the-fold контент */}
      <div id="home">
        <HeroSection />
      </div>
      
      {/* Остальные секции загружаются через Intersection Observer */}
      {/* rootMargin="200px" - начинаем загрузку за 200px до видимости */}
      <LazySection rootMargin="200px 0px" minHeight="600px">
        <ServicesSection />
      </LazySection>
      
      <LazySection rootMargin="200px 0px" minHeight="700px">
        <AboutSection />
      </LazySection>
      
      <LazySection rootMargin="200px 0px" minHeight="800px">
        <ProjectsSection />
      </LazySection>
      
      <LazySection rootMargin="100px 0px" minHeight="400px">
        <ContactSection />
      </LazySection>
    </>
  )
}
