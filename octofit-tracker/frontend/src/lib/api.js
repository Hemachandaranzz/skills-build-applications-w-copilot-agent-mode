// Helper to build API URLs and normalize responses
const CODESPACE = typeof import.meta !== 'undefined' ? import.meta.env.VITE_CODESPACE_NAME : undefined;
const BASE = CODESPACE ? `https://${CODESPACE}-8000.app.github.dev` : `http://localhost:8000`;

export const apiBase = BASE + '/api';

export async function fetchJson(path, opts = {}) {
  const url = `${apiBase}/${path}`;
  const res = await fetch(url, opts);
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`${res.status} ${res.statusText} - ${txt}`);
  }
  const data = await res.json().catch(() => null);
  // Normalize paginated or array responses
  if (Array.isArray(data)) return { items: data };
  if (!data) return { items: [] };
  if (data.results) return { items: data.results, meta: data.meta };
  if (data.data) return { items: data.data, meta: data.meta };
  if (data.items) return { items: data.items, meta: data.meta };
  // fallback - if object contains plural key like users/activities/workouts/teams
  const pluralKeys = ['users', 'activities', 'workouts', 'teams', 'leaderboard'];
  for (const k of pluralKeys) {
    if (Array.isArray(data[k])) return { items: data[k], meta: data.meta };
  }
  // otherwise wrap object
  return { items: [data] };
}

export default { apiBase, fetchJson };
