"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Globe, Bot } from "lucide-react"

export default function HeroSection() {
  // Функция для плавного скролла к секции
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="relative overflow-hidden py-12 sm:py-20 md:py-24 lg:py-32">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-alania-orange/20 via-transparent to-transparent opacity-30"></div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-2 h-2 bg-alania-orange/30 rounded-full animate-pulse"></div>
        <div
          className="absolute top-40 right-1/3 w-1 h-1 bg-alania-amber/40 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-60 left-1/2 w-1.5 h-1.5 bg-alania-orange/20 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-40 left-1/3 w-1 h-1 bg-alania-amber/30 rounded-full animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-60 right-1/4 w-2 h-2 bg-alania-orange/25 rounded-full animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>

        {/* Geometric shapes */}
        <div
          className="absolute top-32 right-1/2 w-8 h-8 border border-alania-orange/10 rotate-45 animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
        <div
          className="absolute bottom-32 left-2/3 w-6 h-6 border border-alania-amber/15 rotate-12 animate-spin"
          style={{ animationDuration: "15s", animationDirection: "reverse" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Разработка <span className="gradient-text">инновационных</span> IT решений
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
              Мы команда талантливых разработчиков, создающая качественные продукты для вашего бизнеса по доступным
              ценам.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                size="lg"
                className="bg-gradient-orange hover:opacity-90 transition-opacity"
                onClick={() => scrollToSection("#services")}
              >
                Наши услуги
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 hover:bg-white/5 bg-transparent"
                onClick={() => scrollToSection("#contact")}
              >
                Связаться с нами
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end relative order-1 lg:order-2">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-orange rounded-full opacity-10 blur-3xl scale-75"></div>

            {/* Orbiting elements - hidden on small mobile */}
            <div className="hidden sm:block absolute inset-0 animate-spin" style={{ animationDuration: "30s" }}>
              <div className="absolute top-8 left-8 w-3 h-3 bg-alania-orange/40 rounded-full"></div>
              <div className="absolute bottom-8 right-8 w-2 h-2 bg-alania-amber/40 rounded-full"></div>
            </div>

            <div
              className="hidden sm:block absolute inset-0 animate-spin"
              style={{ animationDuration: "25s", animationDirection: "reverse" }}
            >
              <div className="absolute top-16 right-16 w-2 h-2 bg-alania-orange/30 rounded-full"></div>
              <div className="absolute bottom-16 left-16 w-1.5 h-1.5 bg-alania-amber/30 rounded-full"></div>
            </div>

            <div className="relative h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] md:h-[350px] md:w-[350px] lg:h-[400px] lg:w-[400px] max-w-full z-10">
              <Image
                src="/images/logo.png"
                alt="Alania GO"
                fill
                priority
                className="object-contain animate-pulse"
                style={{ animationDuration: "3s" }}
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
          </div>
        </div>

        {/* Services preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16 md:mt-20 max-w-7xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 border border-white/10 gradient-border hover:scale-105">
            <Code className="h-8 w-8 sm:h-10 sm:w-10 text-alania-orange mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Разработка ПО</h3>
            <p className="text-sm sm:text-base text-gray-400">Создаем надежное программное обеспечение для решения ваших бизнес-задач.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 border border-white/10 gradient-border hover:scale-105">
            <Globe className="h-8 w-8 sm:h-10 sm:w-10 text-alania-orange mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Разработка сайтов</h3>
            <p className="text-sm sm:text-base text-gray-400">Проектируем и разрабатываем современные веб-сайты с адаптивным дизайном.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 border border-white/10 gradient-border hover:scale-105 sm:col-span-2 md:col-span-1">
            <Bot className="h-8 w-8 sm:h-10 sm:w-10 text-alania-orange mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Telegram боты</h3>
            <p className="text-sm sm:text-base text-gray-400">Создаем функциональных ботов для автоматизации и улучшения коммуникации.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
