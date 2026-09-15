export interface ReviewPayload {
  name: string;
  role: string;
  rating: number;
  text: string;
  website: string;
  startedAt: number;
}

export type ReviewValidation =
  | { ok: true; review: Omit<ReviewPayload, 'website' | 'startedAt'> }
  | { ok: false; error: string; silent?: boolean };

function clean(value: unknown) {
  return typeof value === 'string'
    ? [...value]
        .map((character) => {
          const code = character.charCodeAt(0);
          return code <= 31 || code === 127 ? ' ' : character;
        })
        .join('')
        .replace(/\s+/g, ' ')
        .trim()
    : '';
}

export function validateReview(payload: unknown, now = Date.now()): ReviewValidation {
  if (!payload || typeof payload !== 'object') return { ok: false, error: 'Invalid request.' };

  const input = payload as Partial<ReviewPayload>;
  if (clean(input.website)) return { ok: false, error: 'Accepted.', silent: true };

  const name = clean(input.name);
  const role = clean(input.role);
  const text = clean(input.text);
  const rating = input.rating;
  const startedAt = input.startedAt;

  if (!Number.isFinite(startedAt) || now - Number(startedAt) < 3000 || now - Number(startedAt) > 86_400_000) {
    return { ok: false, error: 'Please reload and try again.' };
  }
  if (name.length < 2 || name.length > 60) return { ok: false, error: 'Name must be 2–60 characters.' };
  if (role.length > 80) return { ok: false, error: 'Role must be 80 characters or fewer.' };
  if (!Number.isInteger(rating) || Number(rating) < 1 || Number(rating) > 5) return { ok: false, error: 'Rating must be 1–5.' };
  if (text.length < 10 || text.length > 420) return { ok: false, error: 'Review must be 10–420 characters.' };
  if ((text.match(/https?:\/\/|www\./gi) || []).length > 1) return { ok: false, error: 'Review contains too many links.' };

  return { ok: true, review: { name, role, rating: Number(rating), text } };
}
