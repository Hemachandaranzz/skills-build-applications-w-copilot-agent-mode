import { useEffect, useState } from 'react';
import { fetchJson } from '../lib/api';

export default function Workouts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchJson('workouts')
      .then((r) => { if (!mounted) return; setItems(r.items || []); })
      .catch((e) => setError(e.message || String(e)))
      .finally(() => setLoading(false));
    return () => (mounted = false);
  }, []);

  if (loading) return <div>Loading workouts...</div>;
  if (error) return <div>Error loading workouts: {error}</div>;

  return (
    <section>
      <h2>Workouts</h2>
      {items.length === 0 ? <div>No workouts found</div> : (
        <ul>{items.map(w => <li key={w._id || w.id}>{w.title || `${w.type} - ${w.duration || ''}`}</li>)}</ul>
      )}
    </section>
  );
}
