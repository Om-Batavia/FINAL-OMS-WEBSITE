import { useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { MessageSquarePlus, Send, Star } from 'lucide-react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';
import { createSharedReview, fetchSharedReviews } from '../lib/reviews';
import type { VisitorReview } from '../lib/reviews';

export function TestimonialCarousel() {
  const [reviews, setReviews] = useState<VisitorReview[]>([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [website, setWebsite] = useState('');
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const startedAt = useRef(0);
  const refHeader = useInViewAnimation<HTMLDivElement>(0.1);

  useEffect(() => {
    startedAt.current = Date.now();
    let active = true;
    const loadReviews = async () => {
      try {
        const sharedReviews = await fetchSharedReviews();
        if (active) setReviews(sharedReviews);
      } catch {
        if (active) setFormStatus('Reviews are temporarily unavailable.');
      } finally {
        if (active) setIsLoading(false);
      }
    };

    loadReviews();
    const interval = window.setInterval(loadReviews, 60_000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  const averageRating = useMemo(() => {
    if (!reviews.length) return null;
    return (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1);
  }, [reviews]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormStatus('');

    try {
      await createSharedReview({ name, role, rating, text, website, startedAt: startedAt.current });
      setName('');
      setRole('');
      setRating(5);
      setText('');
      setWebsite('');
      startedAt.current = Date.now();
      setFormStatus('Review submitted for approval. Thank you.');
    } catch (error) {
      setFormStatus(error instanceof Error ? error.message : 'Could not submit review.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="w-full py-20 px-6 overflow-hidden">
      <div ref={refHeader} className="max-w-6xl mx-auto" style={{ animationDelay: '0.1s' }}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#273C46]/60 dark:text-[#E0EBF0]/60 mb-3">Visitor notes</p>
            <h2 className="text-[32px] md:text-[44px] leading-[1.1] text-[#0D212C] dark:text-white tracking-tight">
              Leave a <span className="font-['PP_Mondwest']">real review.</span>
            </h2>
          </div>

          <div className="rounded-2xl border border-[#0D212C]/10 dark:border-white/15 bg-white dark:bg-[#0D212C] px-5 py-4 shadow-sm dark:shadow-none">
            <p className="text-xs uppercase tracking-[0.18em] text-[#273C46]/60 dark:text-[#E0EBF0]/60">Current rating</p>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex" aria-hidden="true">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className={`w-4 h-4 ${averageRating && index < Math.round(Number(averageRating)) ? 'fill-[#051A24] text-[#051A24] dark:fill-white dark:text-white' : 'text-[#051A24]/20 dark:text-white/20'}`} />
                ))}
              </div>
              <span className="text-sm font-semibold text-[#051A24] dark:text-white">
                {isLoading ? 'Loading approved reviews' : averageRating ? `${averageRating}/5 from ${reviews.length}` : 'No reviews yet'}
              </span>
            </div>
            <p className="mt-2 text-xs text-[#273C46]/60 dark:text-[#E0EBF0]/60">Approved reviews only</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-5">
          <form onSubmit={handleSubmit} className="relative rounded-[32px] bg-[#051A24] text-white p-6 md:p-8 shadow-2xl shadow-[#051A24]/20">
            <label className="absolute -left-[9999px]" aria-hidden="true">
              Website
              <input value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" />
            </label>

            <div className="w-12 h-12 rounded-2xl bg-white text-[#051A24] flex items-center justify-center mb-8">
              <MessageSquarePlus size={22} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex flex-col gap-2 text-sm">
                Name <span className="sr-only">required</span>
                <input value={name} onChange={(event) => setName(event.target.value)} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-white/50" placeholder="Your name" minLength={2} maxLength={60} required />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                Role
                <input value={role} onChange={(event) => setRole(event.target.value)} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-white/50" placeholder="Founder, student, etc." maxLength={80} />
              </label>
            </div>

            <fieldset className="mt-5">
              <legend className="text-sm mb-2">Rating</legend>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button key={value} type="button" onClick={() => setRating(value)} className="w-10 h-10 rounded-full border border-white/15 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label={`${value} star rating`} aria-pressed={value === rating}>
                    <Star className={`w-5 h-5 ${value <= rating ? 'fill-white text-white' : 'text-white/35'}`} />
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="flex flex-col gap-2 text-sm mt-5">
              Review <span className="sr-only">required</span>
              <textarea value={text} onChange={(event) => setText(event.target.value)} className="min-h-[140px] resize-none rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-white/50" placeholder="Write what you want to say..." minLength={10} maxLength={420} required />
            </label>

            <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3">
              <button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#051A24] hover:-translate-y-0.5 transition-transform disabled:cursor-not-allowed disabled:opacity-60">
                <Send size={16} />
                {isSubmitting ? 'Submitting...' : 'Submit review'}
              </button>
              <p className="text-xs text-white/65" role="status">{formStatus || 'Submissions appear after approval.'}</p>
            </div>
          </form>

          <div className="rounded-[32px] border border-[#0D212C]/10 dark:border-white/15 bg-white dark:bg-[#0D212C] p-4 md:p-5 shadow-sm dark:shadow-none">
            {reviews.length === 0 ? (
              <div className="h-full min-h-[420px] rounded-[24px] border border-dashed border-[#0D212C]/15 dark:border-white/20 bg-gray-50 dark:bg-white/5 flex flex-col items-center justify-center text-center px-8">
                <div className="w-14 h-14 rounded-2xl bg-[#051A24] dark:bg-white text-white dark:text-[#051A24] flex items-center justify-center mb-5"><Star size={24} /></div>
                <h3 className="text-2xl font-semibold text-[#051A24] dark:text-white">No fake reviews here.</h3>
                <p className="text-sm text-[#273C46] dark:text-[#E0EBF0] mt-3 max-w-sm leading-relaxed">Approved visitor reviews will appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {reviews.map((review) => (
                  <article key={review.id} className="rounded-[24px] bg-gray-50 dark:bg-white/5 border border-[#0D212C]/5 dark:border-white/10 p-5">
                    <div className="flex gap-1 mb-3" aria-label={`${review.rating} out of 5 stars`}>
                      {[...Array(5)].map((_, index) => <Star key={index} aria-hidden="true" className={`w-4 h-4 ${index < review.rating ? 'fill-[#051A24] text-[#051A24] dark:fill-white dark:text-white' : 'text-[#051A24]/20 dark:text-white/20'}`} />)}
                    </div>
                    <h3 className="font-semibold text-[#051A24] dark:text-white">{review.name}</h3>
                    {review.role && <p className="text-sm text-[#273C46] dark:text-[#E0EBF0] mt-1">{review.role}</p>}
                    <p className="text-sm text-[#051A24]/75 dark:text-[#E0EBF0]/80 leading-relaxed mt-5">{review.text}</p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
