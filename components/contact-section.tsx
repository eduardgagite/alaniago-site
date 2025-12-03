"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission is disabled for now
  }

  return (
    <section
      id="contact"
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-alania-dark to-alania-dark/95 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border border-alania-orange/10 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-alania-amber/10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-alania-orange/30 rounded-full animate-pulse"></div>
        <div
          className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-alania-amber/40 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Свяжитесь с <span className="gradient-text">нами</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Готовы обсудить ваш проект? Заполните форму, и мы свяжемся с вами в ближайшее время
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 max-w-7xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 md:p-8 border border-white/10 gradient-border relative overflow-hidden">
            {/* Form background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-orange opacity-5 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6">
                <div className="p-2 bg-alania-orange/20 rounded-lg">
                  <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-alania-orange" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">Напишите нам</h3>
              </div>

              {submitSuccess && (
                <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                  <p className="text-green-400 text-sm sm:text-base">
                    ✅ Спасибо за сообщение! Мы получили вашу заявку и свяжемся с вами в ближайшее время.
                  </p>
                </div>
              )}

              {submitError && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                  <p className="text-red-400 text-sm sm:text-base">❌ {submitError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 text-gray-300">
                      Ваше имя *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Иван Иванов"
                      required
                      className="bg-white/5 border-white/10 focus:border-alania-orange transition-colors text-sm sm:text-base min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 text-gray-300">
                      Телефон
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+7 (999) 123-45-67"
                      className="bg-white/5 border-white/10 focus:border-alania-orange transition-colors text-sm sm:text-base min-h-[44px]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 text-gray-300">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@mail.ru"
                    required
                    className="bg-white/5 border-white/10 focus:border-alania-orange transition-colors text-sm sm:text-base min-h-[44px]"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 text-gray-300">
                    Сообщение *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Расскажите о вашем проекте..."
                    required
                    className="bg-white/5 border-white/10 focus:border-alania-orange min-h-[100px] sm:min-h-[120px] transition-colors resize-none text-sm sm:text-base"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-orange hover:opacity-90 transition-opacity text-white font-semibold py-3 min-h-[48px] text-sm sm:text-base"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Отправка...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Отправить сообщение <Send className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Контактная информация</h3>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="bg-alania-orange/20 p-2 sm:p-3 rounded-lg flex-shrink-0">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-alania-orange" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-medium mb-1">Email</h4>
                  <a href="mailto:info@alania-go.ru" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors break-all">
                    info@alania-go.ru
                  </a>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">Ответим в течение 2 часов</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="bg-alania-orange/20 p-2 sm:p-3 rounded-lg flex-shrink-0">
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-alania-orange" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-medium mb-1">Телефон</h4>
                  <a href="tel:+79991234567" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">
                    +7 (999) 123-45-67
                  </a>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">Звоните с 9:00 до 18:00 МСК</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="bg-alania-orange/20 p-2 sm:p-3 rounded-lg flex-shrink-0">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-alania-orange" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-medium mb-1">Местоположение</h4>
                  <p className="text-sm sm:text-base text-gray-300">Удаленная работа</p>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">Работаем по всей России</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="bg-alania-orange/20 p-2 sm:p-3 rounded-lg flex-shrink-0">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-alania-orange" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-medium mb-1">Время работы</h4>
                  <p className="text-sm sm:text-base text-gray-300">Пн-Пт: 9:00 - 18:00 МСК</p>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">Выходные: по договоренности</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
