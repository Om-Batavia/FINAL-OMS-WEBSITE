import { Camera } from 'lucide-react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

const photos = [
  {
    src: '/Photos/om-lanterns.png',
    title: 'Creative spaces',
    caption: 'Places, color, and texture that feed the imagination.'
  },
  {
    src: '/Photos/om-vietnam-bridge.jpeg',
    title: 'Travel mindset',
    caption: 'Exploring new environments and noticing how people move through them.'
  },
  {
    src: '/Photos/om-kart-portrait.jpeg',
    title: 'Race focus',
    caption: 'Karting turns fast decisions, pressure, and precision into muscle memory.'
  },
  {
    src: '/Photos/om-kart-chase.jpeg',
    title: 'Chasing pace',
    caption: 'The same instinct I bring to builds: read the track, adapt, and keep moving.'
  },
  {
    src: '/Photos/om-stroller-park.jpeg',
    title: 'Family first',
    caption: 'The grounded side behind the founder energy.',
    fit: 'contain'
  },
  {
    src: '/Photos/om-family-street.jpeg',
    title: 'Everyday perspective',
    caption: 'A reminder that useful products start with real people.',
    fit: 'contain'
  }
];

export function PhotoStorySection() {
  const refHeader = useInViewAnimation<HTMLDivElement>(0.1);

  return (
    <section id="photo-story" className="w-full py-24 px-6 bg-gray-50 dark:bg-[#051A24] border-t border-gray-100 dark:border-white/10 transition-colors scroll-mt-12">
      <div className="max-w-6xl mx-auto">
        <div ref={refHeader} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 text-[#273C46]/70 dark:text-[#E0EBF0]/70 mb-4">
              <Camera className="w-5 h-5" />
              <p className="font-mono text-xs uppercase tracking-[0.2em]">A little more human</p>
            </div>
            <h2 className="font-['PP_Mondwest'] text-[40px] md:text-[56px] text-[#0D212C] dark:text-white leading-none">
              Outside the build.
            </h2>
          </div>
          <p className="max-w-md text-[#051A24]/70 dark:text-[#E0EBF0]/70 leading-relaxed">
            A few moments that give the portfolio more texture: travel, family, and the real-world perspective behind the work.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {photos.map((photo, index) => (
            <figure
              key={photo.src}
              id={photo.src.includes('kart') && index === 2 ? 'karting-photos' : undefined}
              className={`group overflow-hidden rounded-[28px] bg-white/90 dark:bg-[#0D212C]/90 border border-gray-100 dark:border-white/10 shadow-sm dark:shadow-none p-2 ${index === 1 || index === 4 ? 'lg:translate-y-8' : ''} ${index === 2 || index === 5 ? 'lg:translate-y-4' : ''}`}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[22px] bg-gray-200 dark:bg-[#1A3644] border border-black/5 dark:border-white/10">
                {photo.fit === 'contain' && (
                  <img
                    src={photo.src}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl opacity-45"
                  />
                )}
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  decoding="async"
                  className={`relative z-10 h-full w-full transition-transform duration-500 group-hover:scale-105 ${photo.fit === 'contain' ? 'object-contain p-4 md:p-5' : 'object-cover'}`}
                />
              </div>
              <figcaption className="p-5">
                <h3 className="text-lg font-medium text-[#051A24] dark:text-white mb-2">{photo.title}</h3>
                <p className="text-sm text-[#051A24]/65 dark:text-[#E0EBF0]/65 leading-relaxed">{photo.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
