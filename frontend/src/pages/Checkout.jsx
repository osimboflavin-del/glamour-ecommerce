import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Checkout() {
  const { items, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ customerName: user?.name || '', phone: '', address: '', paymentMethod: 'M-Pesa' });
  const [error, setError] = useState('');
  const [placed, setPlaced] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setError('');
    try {
      const { order } = await api.checkout({
        ...form,
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
      });
      clear();
      setPlaced(order);
    } catch (err) {
      setError(err.message);
    }
  }

  if (placed) {
    return (
      <section className="wrap" style={{ maxWidth: 520, textAlign: 'center' }}>
        <h2>Order placed 🎉</h2>
        <p className="muted">Order #{placed.id} confirmed — total KSh {placed.total.toLocaleString()}, paying via {placed.paymentMethod}.</p>
        <button className="btn" onClick={() => navigate('/shop')}>Continue shopping</button>
      </section>
    );
  }

  if (!items.length) return <section className="wrap"><h2>Checkout</h2><p className="muted">Your bag is empty.</p></section>;

  return (
    <section className="wrap" style={{ maxWidth: 520 }}>
      <h2>Checkout</h2>
      {error && <div className="msg err">{error}</div>}
      <form onSubmit={submit}>
        <div className="field"><label>Full name</label>
          <input required value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} />
        </div>
        <div className="field"><label>Phone</label>
          <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>
        <div className="field"><label>Delivery address</label>
          <input required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        </div>
        <div className="field"><label>Payment method</label>
          <select value={form.paymentMethod} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}>
            <option>M-Pesa</option><option>Cash on delivery</option><option>Card</option>
          </select>
        </div>
        <button className="btn" style={{ width: '100%' }} type="submit">Place order</button>
      </form>
    </section>
  );
}
