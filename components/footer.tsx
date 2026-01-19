"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Code, ArrowUp } from "lucide-react"
import { TelegramIcon, WhatsAppIcon } from "./icons"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="bg-gradient-to-b from-alania-dark to-black border-t border-white/10 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-64 h-64 border border-alania-orange/5 rounded-full"></div>
        <div className="absolute bottom-10 right-1/4 w-48 h-48 border border-alania-amber/5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-orange opacity-5 rounded-full blur-3xl"></div>

        {/* Code-like decorative elements */}
        <div className="absolute top-20 right-20 text-alania-orange/10 font-mono text-sm">
          {'{ "status": "ready" }'}
        </div>
        <div className="absolute bottom-20 left-20 text-alania-amber/10 font-mono text-sm">{"<dev />"}</div>
      </div>

      <div className="container mx-auto py-8 md:py-12 relative z-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
            {/* Column 1: Company info */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex flex-col space-y-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-gradient-orange rounded-lg">
                    <Code className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold gradient-text">Alania GO</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-xs">
                  Команда талантливых разработчиков, создающая инновационные IT решения для вашего бизнеса.
                </p>
                <div className="flex space-x-3 pt-1">
                  <Link
                    href="https://t.me/alania_go"
                    className="p-2 bg-white/5 rounded-lg border border-white/10 hover:bg-alania-orange/20 hover:border-alania-orange/50 transition-all duration-300 group"
                  >
                    <TelegramIcon className="h-4 w-4 text-gray-400 group-hover:text-alania-orange transition-colors" />
                    <span className="sr-only">Telegram</span>
                  </Link>
                  <Link
                    href="https://wa.me/79064946024"
                    className="p-2 bg-white/5 rounded-lg border border-white/10 hover:bg-alania-orange/20 hover:border-alania-orange/50 transition-all duration-300 group"
                  >
                    <WhatsAppIcon className="h-4 w-4 text-gray-400 group-hover:text-alania-orange transition-colors" />
                    <span className="sr-only">WhatsApp</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Column 2: Services */}
            <div>
              <div className="flex flex-col space-y-3">
                <h3 className="text-sm font-semibold gradient-text uppercase tracking-wider flex items-center gap-2">
                  Услуги
                </h3>
                <div className="flex flex-col space-y-2">
                  <Link
                    href="#services"
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-alania-orange rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    Разработка ПО
                  </Link>
                  <Link
                    href="#services"
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-alania-orange rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    Веб-сайты
                  </Link>
                  <Link
                    href="#services"
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-alania-orange rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    Telegram боты
                  </Link>
                  <Link
                    href="#services"
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-alania-orange rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    Мобильные приложения
                  </Link>
                  <Link
                    href="#services"
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-alania-orange rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    Техподдержка
                  </Link>
                </div>
              </div>
            </div>

            {/* Column 3: Navigation */}
            <div>
              <div className="flex flex-col space-y-3">
                <h3 className="text-sm font-semibold gradient-text uppercase tracking-wider">Навигация</h3>
                <div className="flex flex-col space-y-2">
                  <Link href="#home" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Главная
                  </Link>
                  <Link href="#services" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Услуги
                  </Link>
                  <Link href="#about" className="text-sm text-gray-400 hover:text-white transition-colors">
                    О нас
                  </Link>
                  <Link href="#projects" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Проекты
                  </Link>
                  <Link href="#contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Контакты
                  </Link>
                </div>
              </div>
            </div>

            {/* Column 4: Contact info */}
            <div>
              <div className="flex flex-col space-y-3">
                <h3 className="text-sm font-semibold gradient-text uppercase tracking-wider">
                  Контакты
                </h3>
                <div className="flex flex-col space-y-3">
                  <div className="flex items-start gap-2">
                    <Mail className="h-4 w-4 text-alania-orange mt-0.5 flex-shrink-0" />
                    <a
                      href="mailto:eduardgagite@gmail.com"
                      className="text-gray-400 hover:text-white transition-colors text-sm break-all"
                    >
                      eduardgagite@gmail.com
                    </a>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 text-alania-orange mt-0.5 flex-shrink-0" />
                    <a href="tel:+79064946024" className="text-gray-400 hover:text-white transition-colors text-sm">
                      +7 (906) 494-60-24
                    </a>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-alania-orange mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-gray-400 text-sm block">Удаленная работа</span>
                      <span className="text-xs text-gray-500">по всей России</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 5: Additional */}
            <div>
              <div className="flex flex-col space-y-3">
                <h3 className="text-sm font-semibold gradient-text uppercase tracking-wider">Дополнительно</h3>
                <div className="flex flex-col space-y-2">
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Политика конфиденциальности
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Условия использования
                  </Link>
                  <div className="pt-2">
                    <Button
                      onClick={scrollToTop}
                      variant="outline"
                      size="sm"
                      className="border-alania-orange/50 hover:bg-alania-orange/10 text-alania-orange hover:text-alania-orange bg-transparent w-full sm:w-auto text-xs h-9 px-3"
                    >
                      <ArrowUp className="h-3 w-3 mr-2" />
                      Наверх
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-white/10 pt-6">
            <div className="text-center">
              <p className="text-gray-500 text-xs">&copy; {new Date().getFullYear()} Alania GO. Все права защищены.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
