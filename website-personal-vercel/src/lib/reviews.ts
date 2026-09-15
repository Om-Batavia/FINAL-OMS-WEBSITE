export interface VisitorReview {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  createdAt: string;
}
export interface NewVisitorReview {
  name: string;
  role: string;
  rating: number;
  text: string;
  website: string;
  startedAt: number;
}

interface SupabaseReviewRow {
  id: string;
  name: string;
  role: string | null;
  rating: number;
  review_text: string;
  created_at: string;
}

const REVIEW_API_URL = import.meta.env.VITE_REVIEW_API_URL
  || 'https://xvjegzkhztuztamkwsqa.supabase.co/functions/v1/portfolio-reviews';

function reviewFromRow(row: SupabaseReviewRow): VisitorReview {
  return {
    id: row.id,
    name: row.name,
    role: row.role || '',
    rating: row.rating,
    text: row.review_text,
    createdAt: row.created_at
  };
}

async function request(path: string, init?: RequestInit) {
  const response = await fetch(`${REVIEW_API_URL}${path}`, init);
  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(typeof body.error === 'string' ? body.error : 'Review service unavailable.');
  }

  return body;
}

export async function fetchSharedReviews() {
  const body = await request('');
  return ((body.reviews || []) as SupabaseReviewRow[]).map(reviewFromRow);
}

export async function createSharedReview(review: NewVisitorReview) {
  await request('', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review)
  });
}
