import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Float } from '@react-three/drei'

// Import GSAP from CDN
const gsap = window.gsap || (() => {
  const script = document.createElement('script')
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'
  document.head.appendChild(script)
  return window.gsap
})()

// Floating Geometry Component for 3D Background
const FloatingGeometry = () => {
  const meshRef = useRef()
  const mesh2Ref = useRef()
  const mesh3Ref = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2
      meshRef.current.rotation.y = time * 0.3
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.5
    }
    
    if (mesh2Ref.current) {
      mesh2Ref.current.rotation.x = time * -0.1
      mesh2Ref.current.rotation.z = time * 0.2
      mesh2Ref.current.position.x = Math.cos(time * 0.3) * 2
    }
    
    if (mesh3Ref.current) {
      mesh3Ref.current.rotation.y = time * 0.4
      mesh3Ref.current.rotation.z = time * -0.1
      mesh3Ref.current.position.z = Math.sin(time * 0.2) * 1
    }
  })

  return (
    <>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={meshRef} position={[-2, 0, -2]}>
          <torusGeometry args={[1, 0.3, 16, 32]} />
          <meshStandardMaterial color="#ff6b6b" transparent opacity={0.3} />
        </mesh>
      </Float>
      
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1}>
        <mesh ref={mesh2Ref} position={[2, 1, -1]}>
          <octahedronGeometry args={[0.8]} />
          <meshStandardMaterial color="#4ecdc4" transparent opacity={0.4} />
        </mesh>
      </Float>
      
      <Float speed={1} rotationIntensity={0.5} floatIntensity={3}>
        <mesh ref={mesh3Ref} position={[0, -1, -3]}>
          <icosahedronGeometry args={[0.6]} />
          <meshStandardMaterial color="#45b7d1" transparent opacity={0.3} />
        </mesh>
      </Float>
    </>
  )
}

const Home = () => {
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const sections = ['Hero', 'About', 'Projects', 'Skills', 'Contact']
  
  // Refs for GSAP animations
  const navRef = useRef()
  const heroRef = useRef()
  const aboutRef = useRef()
  const projectsRef = useRef()
  const skillsRef = useRef()
  const contactRef = useRef()

  useEffect(() => {
    // Wait for GSAP to load
    const initGSAP = () => {
      if (typeof gsap !== 'undefined') {
        setIsLoaded(true)
        initializeAnimations()
      } else {
        setTimeout(initGSAP, 100)
      }
    }
    initGSAP()
  }, [])

  const initializeAnimations = () => {
    if (typeof gsap === 'undefined') return

    // Timeline for initial page load
    const tl = gsap.timeline()
    
    // Nav animation
    tl.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    
    // Hero animations
    tl.fromTo(".hero-title", 
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
      "-=0.5"
    )
    
    tl.fromTo(".hero-subtitle", 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.8"
    )
    
    tl.fromTo(".hero-description", 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.6"
    )
    
    tl.fromTo(".hero-buttons", 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.4"
    )

    // Set up scroll-triggered animations
    setupScrollAnimations()
  }

  const setupScrollAnimations = () => {
    if (typeof gsap === 'undefined') return

    // About section animation
    gsap.fromTo(".about-content", 
      { y: 100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.5, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#section-1",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // Projects stagger animation
    gsap.fromTo(".project-card", 
      { y: 80, opacity: 0, scale: 0.8 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#section-2",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // Skills bars animation
    gsap.fromTo(".skill-bar", 
      { scaleX: 0 },
      { 
        scaleX: 1,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: "#section-3",
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // Contact section animation
    gsap.fromTo(".contact-item", 
      { x: -50, opacity: 0 },
      { 
        x: 0, 
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: "#section-4",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    )
  }

  const scrollToSection = (index) => {
    setCurrentSection(index)
    const element = document.getElementById(`section-${index}`)
    
    if (typeof gsap !== 'undefined') {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: element, offsetY: 0 },
        ease: "power3.inOut"
      })
    } else {
      element?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Add hover animations
  const handleProjectHover = (e, isEntering) => {
    if (typeof gsap === 'undefined') return
    
    gsap.to(e.currentTarget, {
      duration: 0.3,
      scale: isEntering ? 1.05 : 1,
      rotationY: isEntering ? 5 : 0,
      ease: "power2.out"
    })
  }

  const handleSkillHover = (e, isEntering) => {
    if (typeof gsap === 'undefined') return
    
    gsap.to(e.currentTarget.querySelector('.skill-bar'), {
      duration: 0.3,
      scaleY: isEntering ? 1.1 : 1,
      ease: "power2.out"
    })
  }

  return (
    <div className="relative w-full overflow-hidden">
      {/* Load GSAP and ScrollTrigger */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollToPlugin.min.js"></script>
      
      {/* CSS Styles */}
      <style jsx>{`
        .animated-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          z-index: 1;
        }

        .stars-layer-1, .stars-layer-2, .stars-layer-3 {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(2px 2px at 20px 30px, #eee, transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
            radial-gradient(1px 1px at 90px 40px, #fff, transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
            radial-gradient(2px 2px at 160px 30px, #ddd, transparent);
          background-repeat: repeat;
          background-size: 200px 100px;
        }

        .stars-layer-1 {
          animation: sparkle 3s linear infinite;
          opacity: 0.8;
        }

        .stars-layer-2 {
          animation: sparkle 2s linear infinite reverse;
          opacity: 0.6;
          background-size: 150px 80px;
        }

        .stars-layer-3 {
          animation: sparkle 4s linear infinite;
          opacity: 0.4;
          background-size: 250px 120px;
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        .shooting-stars {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .shooting-star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          animation: shoot 3s linear infinite;
        }

        .shooting-star:nth-child(1) {
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .shooting-star:nth-child(2) {
          top: 40%;
          left: 70%;
          animation-delay: 1s;
        }

        .shooting-star:nth-child(3) {
          top: 60%;
          left: 30%;
          animation-delay: 2s;
        }

        .shooting-star:nth-child(4) {
          top: 80%;
          left: 80%;
          animation-delay: 1.5s;
        }

        @keyframes shoot {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateX(300px) translateY(300px);
            opacity: 0;
          }
        }

        .floating-particles {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }

        .particle:nth-child(1) { left: 10%; animation-delay: 0s; }
        .particle:nth-child(2) { left: 20%; animation-delay: 1s; }
        .particle:nth-child(3) { left: 30%; animation-delay: 2s; }
        .particle:nth-child(4) { left: 40%; animation-delay: 3s; }
        .particle:nth-child(5) { left: 50%; animation-delay: 4s; }
        .particle:nth-child(6) { left: 60%; animation-delay: 5s; }
        .particle:nth-child(7) { left: 70%; animation-delay: 1.5s; }
        .particle:nth-child(8) { left: 80%; animation-delay: 2.5s; }
        .particle:nth-child(9) { left: 90%; animation-delay: 3.5s; }

        @keyframes float {
          0%, 100% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10%, 90% { opacity: 1; }
          50% { transform: translateY(-10px) rotate(180deg); }
        }

        .pulsing-stars {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .pulse-star {
          position: absolute;
          width: 6px;
          height: 6px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        .pulse-star:nth-child(1) { top: 15%; left: 15%; animation-delay: 0s; }
        .pulse-star:nth-child(2) { top: 25%; left: 85%; animation-delay: 0.4s; }
        .pulse-star:nth-child(3) { top: 75%; left: 25%; animation-delay: 0.8s; }
        .pulse-star:nth-child(4) { top: 85%; left: 75%; animation-delay: 1.2s; }
        .pulse-star:nth-child(5) { top: 50%; left: 50%; animation-delay: 1.6s; }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.5); opacity: 1; }
        }

        .hero-subtitle-text {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 4s ease infinite;
        }

        .hero-button-gradient {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
          color: white;
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .skill-bar {
          transform-origin: left;
        }
      `}</style>

      {/* Animated Background */}
      <div className="animated-background">
        {/* Multiple star layers */}
        <div className="stars-layer-1"></div>
        <div className="stars-layer-2"></div>
        <div className="stars-layer-3"></div>
        
        {/* Shooting stars */}
        <div className="shooting-stars">
          <div className="shooting-star"></div>
          <div className="shooting-star"></div>
          <div className="shooting-star"></div>
          <div className="shooting-star"></div>
        </div>
        
        {/* Floating particles */}
        <div className="floating-particles">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="particle"></div>
          ))}
        </div>
        
        {/* Pulsing stars */}
        <div className="pulsing-stars">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="pulse-star"></div>
          ))}
        </div>
      </div>

      {/* Three.js Canvas Overlay */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <FloatingGeometry />
          <Stars
            radius={100}
            depth={50}
            count={3000}
            factor={4}
            saturation={0}
            fade
            speed={0.5}
          />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* Navigation */}
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 p-6">
        <div className="flex justify-between items-center backdrop-blur-sm bg-white/5 rounded-full px-6 py-3 border border-white/10">
          <div className="text-2xl font-bold">
            <span className="hero-subtitle-text">Portfolio</span>
          </div>
          <div className="hidden md:flex space-x-4">
            {sections.map((section, index) => (
              <button
                key={section}
                onClick={() => scrollToSection(index)}
                className={`px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
                  currentSection === index
                    ? 'hero-button-gradient text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content Sections */}
      <div className="relative z-20 pointer-events-auto">
        {/* Hero Section */}
        <section id="section-0" className="h-screen flex items-center justify-center px-4">
          <div className="max-w-4xl text-center">
            <h1 className="hero-title text-6xl md:text-8xl font-bold mb-6 hero-subtitle-text">
              John Doe
            </h1>
            <h2 className="hero-subtitle text-2xl md:text-3xl text-white/90 mb-8">
              Full Stack Developer & 3D Artist
            </h2>
            <p className="hero-description text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              Creating immersive digital experiences with modern web technologies and cutting-edge 3D graphics
            </p>
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection(2)}
                className="px-8 py-4 rounded-full font-semibold hero-button-gradient shadow-lg hover:shadow-xl transition-all duration-300"
              >
                View Projects
              </button>
              <button 
                onClick={() => scrollToSection(4)}
                className="px-8 py-4 rounded-full font-semibold border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                Contact Me
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="section-1" className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="about-content max-w-4xl backdrop-blur-sm bg-white/5 rounded-3xl p-8 border border-white/10">
            <h2 className="text-5xl font-bold mb-12 text-center hero-subtitle-text">About Me</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-white/80 leading-relaxed">
                  I'm a passionate developer with 5+ years of experience creating digital experiences that blend functionality with beautiful design. My expertise spans from responsive web applications to immersive 3D environments.
                </p>
                <p className="text-lg text-white/80 leading-relaxed">
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or experimenting with 3D art and animations.
                </p>
              </div>
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/15 transition-all duration-300">
                  <h3 className="text-xl font-semibold text-white mb-3">Experience</h3>
                  <p className="text-white/70">5+ Years in Web Development</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/15 transition-all duration-300">
                  <h3 className="text-xl font-semibold text-white mb-3">Location</h3>
                  <p className="text-white/70">Based in San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="section-2" className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center hero-subtitle-text">Featured Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "3D Portfolio Website",
                  description: "Interactive portfolio built with Three.js and React",
                  tech: ["React", "Three.js", "Tailwind"],
                  color: "from-purple-500 to-blue-500"
                },
                {
                  title: "E-commerce Platform",
                  description: "Full-stack e-commerce solution with modern design",
                  tech: ["Next.js", "Stripe", "PostgreSQL"],
                  color: "from-pink-500 to-purple-500"
                },
                {
                  title: "AR Mobile App",
                  description: "Augmented reality app for product visualization",
                  tech: ["React Native", "ARKit", "WebRTC"],
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  title: "AI Dashboard",
                  description: "Real-time analytics dashboard with AI insights",
                  tech: ["Vue.js", "Python", "TensorFlow"],
                  color: "from-green-500 to-blue-500"
                },
                {
                  title: "Blockchain DApp",
                  description: "Decentralized application for digital assets",
                  tech: ["Solidity", "Web3.js", "React"],
                  color: "from-yellow-500 to-orange-500"
                },
                {
                  title: "IoT Controller",
                  description: "Smart home automation control system",
                  tech: ["Node.js", "MQTT", "React Native"],
                  color: "from-indigo-500 to-purple-500"
                }
              ].map((project, index) => (
                <div 
                  key={index} 
                  className="project-card bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 cursor-pointer"
                  onMouseEnter={(e) => handleProjectHover(e, true)}
                  onMouseLeave={(e) => handleProjectHover(e, false)}
                >
                  <div className={`h-48 bg-gradient-to-br ${project.color} rounded-lg mb-4 flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <span className="text-white font-semibold text-lg z-10">Project {index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-white/70 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-white/20 rounded-full text-sm text-white hover:bg-white/30 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="section-3" className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-4xl w-full backdrop-blur-sm bg-white/5 rounded-3xl p-8 border border-white/10">
            <h2 className="text-5xl font-bold mb-12 text-center hero-subtitle-text">Skills & Technologies</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-white mb-4">Frontend</h3>
                {[
                  { name: "React/Next.js", level: 95 },
                  { name: "Three.js/WebGL", level: 85 },
                  { name: "TypeScript", level: 90 },
                  { name: "Tailwind CSS", level: 95 }
                ].map((skill, index) => (
                  <div 
                    key={index} 
                    className="space-y-2 skill-item"
                    onMouseEnter={(e) => handleSkillHover(e, true)}
                    onMouseLeave={(e) => handleSkillHover(e, false)}
                  >
                    <div className="flex justify-between">
                      <span className="text-white/80">{skill.name}</span>
                      <span className="text-white/60">{skill.level}%</span>
                    </div>
                    <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="skill-bar h-full hero-button-gradient"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-white mb-4">Backend</h3>
                {[
                  { name: "Node.js", level: 90 },
                  { name: "Python", level: 85 },
                  { name: "PostgreSQL", level: 80 },
                  { name: "AWS/Docker", level: 75 }
                ].map((skill, index) => (
                  <div 
                    key={index} 
                    className="space-y-2 skill-item"
                    onMouseEnter={(e) => handleSkillHover(e, true)}
                    onMouseLeave={(e) => handleSkillHover(e, false)}
                  >
                    <div className="flex justify-between">
                      <span className="text-white/80">{skill.name}</span>
                      <span className="text-white/60">{skill.level}%</span>
                    </div>
                    <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="skill-bar h-full hero-button-gradient"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="section-4" className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-4xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center hero-subtitle-text">Get In Touch</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6 backdrop-blur-sm bg-white/5 rounded-3xl p-8 border border-white/10">
                <h3 className="text-2xl font-semibold text-white mb-6">Let's Connect</h3>
                <p className="text-lg text-white/80 leading-relaxed">
                  I'm always interested in hearing about new opportunities and exciting projects. 
                  Whether you have a question or just want to say hi, feel free to reach out!
                </p>
                <div className="space-y-4">
                  <div className="contact-item flex items-center space-x-3 cursor-pointer">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <span className="text-white text-xl">📧</span>
                    </div>
                    <span className="text-white/80">john.doe@email.com</span>
                  </div>
                  <div className="contact-item flex items-center space-x-3 cursor-pointer">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <span className="text-white text-xl">💼</span>
                    </div>
                    <span className="text-white/80">linkedin.com/in/johndoe</span>
                  </div>
                  <div className="contact-item flex items-center space-x-3 cursor-pointer">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <span className="text-white text-xl">🐙</span>
                    </div>
                    <span className="text-white/80">github.com/johndoe</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <div className="space-y-4">
                  <div className="contact-item">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all backdrop-blur-sm"
                    />
                  </div>
                  <div className="contact-item">
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all backdrop-blur-sm"
                    />
                  </div>
                  <div className="contact-item">
                    <textarea
                      rows={4}
                      placeholder="Your Message"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all backdrop-blur-sm"
                    />
                  </div>
                  <div className="contact-item">
                    <button
                      type="submit"
                      className="w-full px-6 py-3 rounded-full font-semibold hero-button-gradient shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      onMouseEnter={(e) => {
                        if (typeof gsap !== 'undefined') {
                          gsap.to(e.target, { duration: 0.3, scale: 1.05, ease: "power2.out" })
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (typeof gsap !== 'undefined') {
                          gsap.to(e.target, { duration: 0.3, scale: 1, ease: "power2.out" })
                        }
                      }}
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home