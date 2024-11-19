'use client'

import React, { useRef, useState, useEffect } from 'react';
import { Code2, Layout, BarChart, Server, Cpu, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const services = [
  {
    title: "Front-End Development",
    description: "Building responsive and performant web applications using modern frameworks and best practices",
    icon: <Code2 className="w-8 h-8 mb-4" />,
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
  },
  {
    title: "UI/UX Design",
    description: "Creating user-centered design solutions with a focus on accessibility, usability, and modern aesthetics",
    icon: <Layout className="w-8 h-8 mb-4" />,
    technologies: ["Figma", "Framer", "Webflow", "Prototyping"]
  },
  {
    title: "API Integration",
    description: "Seamlessly connecting front-end applications with back-end services and third-party APIs",
    icon: <Server className="w-8 h-8 mb-4" />,
    technologies: ["RESTful APIs", "GraphQL", "Axios", "Fetch API"]
  },
  {
    title: "Performance Optimization",
    description: "Enhancing web application speed and efficiency for optimal user experience",
    icon: <BarChart className="w-8 h-8 mb-4" />,
    technologies: ["Lazy Loading", "Code Splitting", "Caching", "Lighthouse"]
  }
]

const portfolioItems = [
  {
    title: "E-commerce Platform",
    description: "Developed a responsive e-commerce platform with a seamless checkout process and real-time inventory management.",
    image: "/placeholder.svg?height=600&width=800",
    technologies: ["Next.js", "React", "Tailwind CSS", "Stripe API"]
  },
  {
    title: "Portfolio Website",
    description: "Designed and built a custom portfolio website showcasing projects and skills with a modern, interactive interface.",
    image: "/placeholder.svg?height=600&width=800",
    technologies: ["React", "Framer Motion", "Styled Components", "Netlify"]
  },
  {
    title: "Task Management App",
    description: "Created a feature-rich task management application with real-time updates and collaborative features.",
    image: "/placeholder.svg?height=600&width=800",
    technologies: ["React", "TypeScript", "Firebase", "Material-UI"]
  },
  {
    title: "Weather Dashboard",
    description: "Developed an interactive weather dashboard with location-based forecasts and historical data visualization.",
    image: "/placeholder.svg?height=600&width=800",
    technologies: ["React", "Chart.js", "OpenWeatherMap API", "Geolocation API"]
  }
]

  const carouselImages = [
    "/images/devv.png",
    "/images/pnngssr.png",
    "/images/yoour.png",
      "/images/myypnng.png"
  ]  
    

const smoothScroll = (targetId: string) => {
  const target = document.getElementById(targetId)
  if (target) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    const duration = 1000
    let start: number | null = null

    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = timestamp - start
      window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration))
      if (progress < duration) window.requestAnimationFrame(step)
    }

    window.requestAnimationFrame(step)
  }
}

const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
  t /= d / 2
  if (t < 1) return c / 2 * t * t * t + b
  t -= 2
  return c / 2 * (t * t * t + 2) + b
}

const SideNav = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void }) => {
  return (
    <div className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-[#0e1a34] to-[#0ea5e9] text-white transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
    
          <button onClick={() => setIsOpen(false)} className="text-white" aria-label="Close menu">
            <X className="w-6 h-6" />
          </button>
        </div>
        <ul className="space-y-4">
          <li><a href="#about" onClick={(e) => { e.preventDefault(); smoothScroll('about'); setIsOpen(false); }} className="block py-2 hover:text-yellow-300 transition-colors">About</a></li>
          <li><a href="#services" onClick={(e) => { e.preventDefault(); smoothScroll('services'); setIsOpen(false); }} className="block py-2 hover:text-yellow-300 transition-colors">Services</a></li>
          <li><a href="#work" onClick={(e) => { e.preventDefault(); smoothScroll('work'); setIsOpen(false); }} className="block py-2 hover:text-yellow-300 transition-colors">Our Work</a></li>
          <li><a href="#skills" onClick={(e) => { e.preventDefault(); smoothScroll('skills'); setIsOpen(false); }} className="block py-2 hover:text-yellow-300 transition-colors">Skills</a></li>
          <li><a href="#stack" onClick={(e) => { e.preventDefault(); smoothScroll('stack'); setIsOpen(false); }} className="block py-2 hover:text-yellow-300 transition-colors">Tech Stack</a></li>
        </ul>
      </div>
    </div>
  )
}

const AnimatedButton = ({ children, onClick, className }: { children: React.ReactNode, onClick?: () => void, className?: string }) => {
  return (
    <Button 
      onClick={onClick} 
      className={`px-7 py-4 bg-[#0ea5e9] text-white hover:bg-[#0c93d1] transition-colors duration-300 ${className}`}
    >
      {children}
    </Button>
  )
}

const SkillCategory = ({ title, skills }: { title: string; skills: string[] }) => (
  <div>
    <h3 className="font-semibold mb-4 text-xl text-[#adc8f3]">{title}</h3>
    <ul className="space-y-2 text-gray-300">
      {skills.map((skill, index) => (
        <li key={index}>{skill}</li>
      ))}
    </ul>
  </div>
)

export function OlashNetworkPortfolio() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isNavOpen, setIsNavOpen] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
        setCanScrollLeft(scrollLeft > 0)
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth)
      }
    }

    const scrollContainer = scrollRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
      handleScroll() // Initial check
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0e1a34] to-[#0ea5e9] text-white pr-0 md:pr-16">
      <SideNav isOpen={isNavOpen} setIsOpen={setIsNavOpen} />
      <button
        onClick={() => setIsNavOpen(true)}
        className="fixed top-4 right-4 z-40 bg-[#0ea5e9] text-white p-2 rounded-full shadow-lg hover:bg-[#0c93d1]"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>
      
      {/* Hero Section */}
      <header className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-[#0e1a34] via-[#0e1a34] to-[#0ea5e9]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white mt-16 sm:mt-0">
                Olash <span className="text-pink-400">Network</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-gray-100">Front-End Engineer & UI/UX Designer</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <AnimatedButton onClick={() => smoothScroll('about')}>
                  About Us
                </AnimatedButton>
              </div>
            </div>
            <div className="lg:w-1/2 relative mt-10 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-800 opacity-20 rounded-lg"></div>
              <div className="relative w-full h-[300px] sm:h-[400px] overflow-hidden rounded-lg shadow-2xl">
                <Image
                  src="/images/devv.png"
                  alt="Tech illustration 1"
                  width={800}
                  height={600}
                  priority
                  className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    currentImageIndex === 0 ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <Image
                  src="/images/yoour.jpg"
                  alt="Tech illustration 2"
                  width={800}
                  height={600}
                  className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    currentImageIndex === 1 ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <Image
                  src="/images/pnngssr.png"
                  alt="Tech illustration 3"
                  width={800}
                  height={600}
                  className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    currentImageIndex === 2 ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <Image
                  src="/images/pictures.png"
                  alt="Tech illustration 4"
                  width={800}
                  height={600}
                  className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    currentImageIndex === 3 ? 'opacity-100' : 'opacity-0'
                  }`}
                />                  
              
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-pink-500 rounded-full w-32 h-32 flex items-center justify-center z-20">
                <Cpu className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* About Section */}
        <section id="about" className="py-16 px-4 bg-gradient-to-br from-[#0e1a34] via-[#0e1a34] to-[#0ea5e9]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400">
              About Me
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
              <Avatar className="w-32 h-32 border-4 border-pink-400">
                <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Olash Network Avatar" />
                <AvatarFallback>ON</AvatarFallback>
              </Avatar>
              <div className="text-lg text-gray-300 max-w-2xl text-center md:text-left">
                <p className="mb-4">
                  I am a passionate front-end engineer specializing in creating engaging and responsive web applications. 
                  With expertise in modern JavaScript frameworks and UI/UX design, I bring ideas to life through clean, 
                  efficient code and intuitive user interfaces.
                </p>
                <p>
                  My goal is to craft beautiful, high-performance web experiences that delight users and drive business success.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-12 mt-12">
              <div className="text-center">
                <Code2 className="w-12 h-12 mx-auto mb-4 text-emerald-400" />
                <p className="font-semibold text-lg">Clean Code</p>
              </div>
              <div className="text-center">
                <Layout className="w-12 h-12 mx-auto mb-4 text-teal-400" />
                <p className="font-semibold text-lg">Responsive Design</p>
              </div>
              <div className="text-center">
                <Cpu className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
                <p className="font-semibold text-lg">Performance Optimization</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 px-4 bg-gradient-to-tl from-[#0e1a34] via-[#0e1a34] to-[#0ea5e9]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400">
              My Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="group relative bg-gradient-to-br from-[#0f2657] to-[#1e40af] border-[#3b82f6] hover:border-[#60a5fa] transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-[-50%] top-[-50%] animate-spin-slow bg-gradient-to-r from-transparent via-white to-transparent opacity-30 w-[200%] h-[200%]"></div>
                  </div>
                  <CardContent className="p-8 relative z-10">
                    <div className="text-[#3b82f6]">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-semibold mb-3 text-white">{service.title}</h3>
                    <p className="text-[#60a5fa] mb-4">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, i) => (
                        <span key={i} className="bg-[#1e3a8a] text-white px-3 py-1 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="work" className="py-16 px-4 bg-gradient-to-br from-[#0e1a34] via-[#0e1a34] to-[#0ea5e9] relative">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400">
              My Portfolio
            </h2>
            <div className="relative">
              <div 
                ref={scrollRef}
                className="flex overflow-x-scroll scrollbar-hide snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {portfolioItems.map((item, index) => (
                  <div key={index} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 p-4 snap-start">
                    <div className="bg-gradient-to-br from-[#0f2657] to-[#1e40af] rounded-xl overflow-hidden shadow-lg">
                      <Image src={item.image} alt={item.title} width={800} height={600} className="w-full h-48 object-cover" />
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2 text-[#3b82f6]">{item.title}</h3>
                        <p className="text-[#60a5fa] mb-4">{item.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {item.technologies.map((tech, i) => (
                            <span key={i} className="bg-[#1e3a8a] text-white px-2 py-1 rounded-full text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => scroll('left')} 
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#0ea5e9] text-white p-2 rounded-full shadow-lg disabled:opacity-50 hover:bg-[#0c93d1]"
                aria-label="Scroll left"
                disabled={!canScrollLeft}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={() => scroll('right')} 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#0ea5e9] text-white p-2 rounded-full shadow-lg disabled:opacity-50 hover:bg-[#0c93d1]"
                aria-label="Scroll right"
                disabled={!canScrollRight}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16 px-4 bg-gradient-to-br from-[#0e1a34] via-[#0e1a34] to-[#0ea5e9]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400">
              My Skills
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <SkillCategory title="Front-End" skills={["JavaScript", "TypeScript", "React", "Next.js"]} />
              <SkillCategory title="Styling" skills={["CSS", "Tailwind CSS", "Styled Components", "Sass"]} />
              <SkillCategory title="Design" skills={["Figma", "Framer", "Webflow", "UI/UX Principles"]} />
              <SkillCategory title="Tools" skills={["Git", "Webpack", "Jest", "Storybook"]} />
            </div>
          </div>
        </section>

        {/* Tech Stack Banner */}
        <section id="stack" className="py-16 px-4 bg-gradient-to-tr from-[#0e1a34] via-[#0e1a34] to-[#0ea5e9] relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <Image 
              src="/placeholder.svg?height=1080&width=1920" 
              alt="Tech background" 
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <h2 className="text-3xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400">
              My Tech Stack
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold mb-4 text-xl text-emerald-400">Front-End</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>React</li>
                  <li>Next.js</li>
                  <li>TypeScript</li>
                  <li>JavaScript</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-xl text-teal-400">Styling</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>CSS</li>
                  <li>Tailwind CSS</li>
                  <li>Styled Components</li>
                  <li>Sass</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-xl text-yellow-400">Design</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>Figma</li>
                  <li>Framer</li>
                  <li>Webflow</li>
                  <li>Adobe XD</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-xl text-green-400">Other</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>Git</li>
                  <li>API Integration</li>
                  <li>Responsive Design</li>
                  <li>Performance Optimization</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section id="contact" className="py-20 px-4 bg-gradient-to-r from-[#0e1a34] via-[#0ea5e9] to-[#0ea5e9]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-white">Ready to Bring Your Ideas to Life?</h2>
            <p className="text-xl mb-8 text-gray-200">
              Let us collaborate on your next project and create something amazing together.
            </p>
            <AnimatedButton>
              Contact Us
            </AnimatedButton>
          </div>
        </section>
      </main>
    </div>
  )
}