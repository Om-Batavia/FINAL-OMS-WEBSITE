import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { TestimonialSection } from './components/TestimonialSection';
import { PricingSection } from './components/PricingSection';
import { TestimonialCarousel } from './components/TestimonialCarousel';
import { ProjectsSection } from './components/ProjectsSection';
import { ResumeSection } from './components/ResumeSection';
import { CertificationsSection } from './components/CertificationsSection';
import { HobbiesSection } from './components/HobbiesSection';
import { PartnerSection } from './components/PartnerSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CopyrightBar } from './components/CopyrightBar';
import { BottomNav } from './components/BottomNav';
import { ProofSnapshot } from './components/ProofSnapshot';
import { PhotoStorySection } from './components/PhotoStorySection';

export default function App() {
  const tecTeenShopUrl = 'https://tecteenshop.com/';
  const linkedInUrl = 'https://www.linkedin.com/in/om-batavia-071bb0346/';
  const instagramUrl = 'https://www.instagram.com/omraces/';

  const marqueeCards = [
    { title: 'Travel mindset', label: 'Vietnam bridge', src: '/Photos/om-vietnam-bridge.jpeg' },
    { title: 'Race focus', label: 'go-karting', src: '/Photos/om-kart-portrait.jpeg' },
    { title: 'Creative spaces', label: 'lantern room', src: '/Photos/om-lanterns.png' },
    { title: 'Family first', label: 'outside the build', src: '/Photos/om-family-street.jpeg', imageFit: 'contain', imagePosition: 'center' },
    { title: 'Track discipline', label: 'karting sessions', src: '/Photos/om-kart-chase.jpeg' },
    { title: 'Family time', label: 'between projects', src: '/Photos/om-stroller-park.jpeg' }
  ];

  return (
    <div className="site-shell min-h-screen transition-colors duration-300 overflow-hidden relative">
      <div className="site-background-wash" aria-hidden="true" />

      <main className="site-content-reveal">
        <section id="home" aria-labelledby="page-title" className="race-hero">
          <header className="race-nav">
            <a href="#home" className="race-mark" aria-label="Om Batavia home">OB<span>°</span></a>
            <nav aria-label="Primary navigation" className="race-links">
              <a href="#projects">Work</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </nav>
            <a href="mailto:ombatavia23@gmail.com" className="race-contact">
              Start a project <ArrowUpRight aria-hidden="true" />
            </a>
          </header>

          <div className="race-hero-grid">
            <div className="race-copy">
              <p className="race-eyebrow"><span /> India · Building worldwide</p>
              <h1 id="page-title">
                <span>OM</span>
                <span>BATAVIA</span>
              </h1>
              <div className="race-intro">
                <p>Student founder building AI for invoice processing and model routing. Founder of Smart Invoices and ALTSELF; CEO of TEC Teen Shop.</p>
                <a href="#projects" aria-label="Explore selected projects" className="race-scroll">
                  <ArrowDownRight aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="race-portrait">
              <img
                src="/Photos/om-kart-portrait.jpeg"
                alt="Om Batavia at a karting track"
                fetchPriority="high"
                decoding="async"
              />
              <div className="race-photo-shade" aria-hidden="true" />
              <p className="race-photo-label">Focused on the next lap.</p>
              <span className="race-number" aria-hidden="true">23</span>
            </div>
          </div>

          <div className="race-roles" aria-label="Current roles">
            <span>Founder · ALTSELF</span>
            <span>Founder · Smart Invoices</span>
            <a href={tecTeenShopUrl} target="_blank" rel="noopener noreferrer">CEO · TEC Teen Shop <ArrowUpRight aria-hidden="true" /></a>
            <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight aria-hidden="true" /></a>
            <a href={instagramUrl} target="_blank" rel="me noopener noreferrer">Instagram · @omraces <ArrowUpRight aria-hidden="true" /></a>
          </div>
        </section>

        <ProofSnapshot />

        <div id="projects">
          <ProjectsSection />
        </div>

        <ResumeSection />

        {/* Personal photo reel */}
        <div className="visual-reel w-full overflow-hidden">
          <div className="visual-reel-heading">
            <p>Beyond the build</p>
            <h2>Always moving.</h2>
          </div>
          <div className="animate-marquee">
            {/* Double the array for seamless infinite scroll */}
            {[...marqueeCards, ...marqueeCards].map((card, i) => (
                <div
                  key={i}
                className="h-[280px] md:h-[500px] aspect-[4/3] mx-3 rounded-[28px] shadow-lg dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex-shrink-0 border border-black/5 dark:border-white/10 overflow-hidden relative bg-white/90 dark:bg-[#0D212C]/90 p-2"
              >
                  <div className="relative h-full w-full overflow-hidden rounded-[22px] bg-gray-200 dark:bg-[#1A3644]">
                    {card.imageFit === 'contain' && (
                      <img
                        src={card.src}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-45"
                        style={{ objectPosition: card.imagePosition || 'center' }}
                      />
                    )}
                    <img
                      src={card.src}
                      alt={card.title}
                      loading="lazy"
                      decoding="async"
                      className={`relative z-10 w-full h-full ${card.imageFit === 'contain' ? 'object-contain p-4 md:p-6' : 'object-cover'}`}
                      style={{ objectPosition: card.imagePosition || 'center' }}
                    />
                    <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  </div>
                  <div className="absolute top-8 left-8 right-8 z-30 flex items-center justify-between text-white">
                    <span className="font-mono text-xs uppercase tracking-[0.16em] opacity-80">Personal lens</span>
                    <span className="w-3 h-3 rounded-full bg-white" />
                  </div>
                  <div className="absolute bottom-8 left-8 right-8 z-30 text-white">
                    <p className="text-xl md:text-2xl font-medium mb-2">{card.title}</p>
                    <p className="text-sm md:text-base text-white/75">{card.label}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <TestimonialSection />

        <PricingSection />
        
        <TestimonialCarousel />
        
        <PhotoStorySection />
        
        <CertificationsSection />
        
        <HobbiesSection />

        <PartnerSection />
        
        <ContactSection />
        
        <Footer />
        
        <CopyrightBar />
        
        <BottomNav />
      </main>
    </div>
  );
}
