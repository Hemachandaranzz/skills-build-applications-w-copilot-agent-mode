import { useEffect, useState } from 'react';
import { fetchJson } from '../lib/api';

// API endpoint: https/${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users

export default function Users() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchJson('users')
      .then((r) => { if (!mounted) return; setItems(r.items || []); })
      .catch((e) => setError(e.message || String(e)))
      .finally(() => setLoading(false));
    return () => (mounted = false);
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error loading users: {error}</div>;

  return (
    <section>
      <h2>Users</h2>
      {items.length === 0 ? <div>No users found</div> : (
        <ul>{items.map(u => <li key={u._id || u.id}>{u.name} ({u.email})</li>)}</ul>
      )}
    </section>
  );
}
