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
}

interface SupabaseReviewRow {
  id: string;
  name: string;
  role: string | null;
  rating: number;
  review_text: string;
  created_at: string;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const hasSharedReviews = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

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

function getHeaders() {
  if (!SUPABASE_ANON_KEY) {
    throw new Error('Supabase anon key is missing.');
  }

  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json'
  };
}

export async function fetchSharedReviews() {
  if (!SUPABASE_URL) {
    throw new Error('Supabase URL is missing.');
  }

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/portfolio_reviews?select=id,name,role,rating,review_text,created_at&approved=eq.true&order=created_at.desc`,
    { headers: getHeaders() }
  );

  if (!response.ok) {
    throw new Error('Could not load shared reviews.');
  }

  const rows = (await response.json()) as SupabaseReviewRow[];
  return rows.map(reviewFromRow);
}

export async function createSharedReview(review: NewVisitorReview) {
  if (!SUPABASE_URL) {
    throw new Error('Supabase URL is missing.');
  }

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/portfolio_reviews?select=id,name,role,rating,review_text,created_at`,
    {
      method: 'POST',
      headers: {
        ...getHeaders(),
        Prefer: 'return=representation'
      },
      body: JSON.stringify({
        name: review.name,
        role: review.role || null,
        rating: review.rating,
        review_text: review.text,
        approved: true
      })
    }
  );

  if (!response.ok) {
    throw new Error('Could not publish this review.');
  }

  const rows = (await response.json()) as SupabaseReviewRow[];
  return reviewFromRow(rows[0]);
}
