import { useEffect, useState } from 'react';
import { fetchJson } from '../lib/api';

export default function Teams() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchJson('teams')
      .then((r) => { if (!mounted) return; setItems(r.items || []); })
      .catch((e) => setError(e.message || String(e)))
      .finally(() => setLoading(false));
    return () => (mounted = false);
  }, []);

  if (loading) return <div>Loading teams...</div>;
  if (error) return <div>Error loading teams: {error}</div>;

  return (
    <section>
      <h2>Teams</h2>
      {items.length === 0 ? <div>No teams found</div> : (
        <ul>{items.map(t => <li key={t._id || t.id}>{t.name}</li>)}</ul>
      )}
    </section>
  );
}
