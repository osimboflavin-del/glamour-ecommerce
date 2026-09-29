import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';
import StatusBadge from '../components/StatusBadge.jsx';

const fmt = (n) => `KSh ${n.toLocaleString()}`;

export default function Account() {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) api.myOrders().then((d) => setOrders(d.orders)).catch(() => {});
  }, [user]);

  if (!user) {
    return <section className="wrap"><h2>My account</h2><p className="muted">Please <Link to="/login">log in</Link> to view your account.</p></section>;
  }

  return (
    <section className="wrap">
      <h2>Welcome, {user.name}</h2>
      <p className="muted">{user.email}</p>
      <button className="btn ghost small" onClick={logout}>Log out</button>
      {user.role === 'admin' && <p style={{ marginTop: 14 }}><Link to="/admin" className="btn small">Go to admin dashboard</Link></p>}

      <h3 style={{ marginTop: 30 }}>Order history</h3>
      {orders.length ? orders.map((o) => (
        <div key={o.id} className="cartrow">
          <div style={{ flex: 1 }}>
            <b>Order #{o.id}</b>
            <div className="muted">{o.items.length} item(s) · {fmt(o.total)} · {new Date(o.createdAt).toLocaleDateString()}</div>
          </div>
          <StatusBadge status={o.status} />
        </div>
      )) : <p className="muted">No orders yet.</p>}
    </section>
  );
}
