import { useEffect, useState } from 'react';
import { fetchJson } from '../lib/api';

export default function Leaderboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchJson('leaderboard')
      .then((r) => { if (!mounted) return; setItems(r.items || []); })
      .catch((e) => setError(e.message || String(e)))
      .finally(() => setLoading(false));
    return () => (mounted = false);
  }, []);

  if (loading) return <div>Loading leaderboard...</div>;
  if (error) return <div>Error loading leaderboard: {error}</div>;

  return (
    <section>
      <h2>Leaderboard</h2>
      {items.length === 0 ? <div>No leaderboard entries</div> : (
        <ol>{items.map((l,i) => <li key={l._id || l.id}>{l.name || l.user} - {l.points || l.score || i+1}</li>)}</ol>
      )}
    </section>
  );
}
