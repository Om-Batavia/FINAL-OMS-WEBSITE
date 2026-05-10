import { useInViewAnimation } from './hooks/useInViewAnimation';
import { Button } from './components/Button';
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
import { LoadingScreen } from './components/LoadingScreen';

export default function App() {
  const tecTeenShopUrl = 'https://tecteenshop.com/';
  const linkedInUrl = 'https://www.linkedin.com/in/om-batavia-071bb0346/';

  const heroRef1 = useInViewAnimation<HTMLDivElement>(0.1);
  const heroRef2 = useInViewAnimation<HTMLParagraphElement>(0.1);
  const heroRef3 = useInViewAnimation<HTMLHeadingElement>(0.1);
  const heroRef4 = useInViewAnimation<HTMLDivElement>(0.1);
  const heroRef5 = useInViewAnimation<HTMLDivElement>(0.1);

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
      <video
        className="site-background-video"
        src="/loader-animation.mp4"
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="site-background-wash" aria-hidden="true" />
      <LoadingScreen />

      <div className="site-content-reveal">
        {/* 1. HERO SECTION */}
        <section className="mx-auto max-w-[440px] px-6 pt-12 md:pt-16 flex flex-col items-center text-center">
          <div ref={heroRef1} style={{ animationDelay: '0.1s' }} className="font-['PP_Mondwest'] text-[32px] md:text-[40px] lg:text-[44px] font-semibold text-[#051A24] dark:text-white tracking-tight mb-4">
            Om Batavia
          </div>
          
          <p ref={heroRef2} style={{ animationDelay: '0.2s' }} className="font-mono text-xs md:text-sm text-[#051A24] dark:text-[#E0EBF0] mb-2">
            The AI studio of Om Batavia
          </p>
          
          <h1 ref={heroRef3} style={{ animationDelay: '0.3s' }} className="text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-[#0D212C] dark:text-white tracking-tight whitespace-nowrap">
            I build AI systems,<br />
            <span className="font-['PP_Mondwest']">that solve problems.</span>
          </h1>
          
          <div ref={heroRef4} style={{ animationDelay: '0.4s' }} className="flex flex-col gap-5 text-sm md:text-base text-[#051A24] dark:text-[#E0EBF0] leading-relaxed mt-5 md:mt-6">
            <p>Dynamic student entrepreneur building AI systems that solve real business problems.</p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs md:text-sm">
              <span className="rounded-full border border-[#051A24]/10 dark:border-white/15 bg-white dark:bg-[#0D212C] px-4 py-2 shadow-sm">
                Founder: ALTSELF
              </span>
              <span className="rounded-full border border-[#051A24]/10 dark:border-white/15 bg-white dark:bg-[#0D212C] px-4 py-2 shadow-sm">
                Founder: Smart Invoices
              </span>
              <a href={tecTeenShopUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#051A24]/10 dark:border-white/15 bg-white dark:bg-[#0D212C] px-4 py-2 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all">
                CEO: TEC Teen Shop
              </a>
              <span className="rounded-full border border-[#051A24]/10 dark:border-white/15 bg-white dark:bg-[#0D212C] px-4 py-2 shadow-sm">
                Jumpstart
              </span>
            </div>
          </div>

          <div ref={heroRef5} style={{ animationDelay: '0.5s' }} className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-5 md:mt-6">
            <Button variant="primary" href="#contact">Contact Me</Button>
            <Button variant="secondary" href="#projects">View Projects</Button>
            <Button variant="secondary" href={linkedInUrl} target="_blank" rel="noopener noreferrer">LinkedIn</Button>
          </div>
        </section>

        {/* 2. INFINITE MARQUEE */}
        <div className="w-full mt-16 md:mt-20 mb-16 overflow-hidden">
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
                        className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-45"
                        style={{ objectPosition: card.imagePosition || 'center' }}
                      />
                    )}
                    <img
                      src={card.src}
                      alt={card.title}
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
                    <h3 className="text-xl md:text-2xl font-medium mb-2">{card.title}</h3>
                    <p className="text-sm md:text-base text-white/75">{card.label}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <ProofSnapshot />

        <TestimonialSection />
        
        <div id="projects">
          <ProjectsSection />
        </div>

        <PricingSection />
        
        <TestimonialCarousel />
        
        <ResumeSection />

        <PhotoStorySection />
        
        <CertificationsSection />
        
        <HobbiesSection />

        <PartnerSection />
        
        <ContactSection />
        
        <Footer />
        
        <CopyrightBar />
        
        <BottomNav />
      </div>
    </div>
  );
}
