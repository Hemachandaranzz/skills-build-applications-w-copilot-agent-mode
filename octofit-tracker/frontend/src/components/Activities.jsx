import { useEffect, useState } from 'react';
import { fetchJson } from '../lib/api';

// API endpoint: https/${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities

export default function Activities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchJson('activities')
      .then((r) => {
        if (!mounted) return;
        setItems(r.items || []);
      })
      .catch((e) => setError(e.message || String(e)))
      .finally(() => setLoading(false));
    return () => (mounted = false);
  }, []);

  if (loading) return <div>Loading activities...</div>;
  if (error) return <div>Error loading activities: {error}</div>;

  return (
    <section>
      <h2>Activities</h2>
      {items.length === 0 ? (
        <div>No activities found</div>
      ) : (
        <ul>
          {items.map((a) => (
            <li key={a.id || a._id}>{a.user}: {a.type} {a.distance_km ? `- ${a.distance_km} km` : ''}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
