import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';
import ProductImage from '../components/ProductImage.jsx';

const fmt = (n) => `KSh ${n.toLocaleString()}`;
const CATS = ['Skincare', 'Haircare', 'Fragrance', 'Bath & Body', 'Cosmetics', 'Accessories'];

export default function Admin() {
  const { user } = useAuth();
  const [tab, setTab] = useState('products');

  if (!user || user.role !== 'admin') {
    return <section className="wrap"><h2>Admin</h2><p className="muted">Admin access only. <Link to="/login">Log in as admin</Link>.</p></section>;
  }

  return (
    <section className="wrap">
      <h2>Admin dashboard</h2>
      <div className="tabs">
        <button className={tab === 'products' ? 'active' : ''} onClick={() => setTab('products')}>Products</button>
        <button className={tab === 'orders' ? 'active' : ''} onClick={() => setTab('orders')}>Orders</button>
        <button className={tab === 'inquiries' ? 'active' : ''} onClick={() => setTab('inquiries')}>Inquiries</button>
      </div>
      {tab === 'products' && <ProductsTab />}
      {tab === 'orders' && <OrdersTab />}
      {tab === 'inquiries' && <InquiriesTab />}
    </section>
  );
}

function ProductsTab() {
  const blank = { name: '', category: CATS[0], price: '', oldPrice: '', stock: 10, description: '', imageUrl: '' };
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(blank);
  const [msg, setMsg] = useState({ type: 'ok', text: '' });
  const [uploading, setUploading] = useState(false);

  function load() { api.getProducts().then((d) => setProducts(d.products)); }
  useEffect(load, []);

  async function pickImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const { url } = await api.uploadImage(file);
      setForm((f) => ({ ...f, imageUrl: url }));
    } catch (err) { setMsg({ type: 'err', text: err.message }); }
    setUploading(false);
  }
  async function addProduct(e) {
    e.preventDefault();
    try {
      await api.createProduct(form);
      setMsg({ type: 'ok', text: 'Product added.' });
      setForm(blank);
      load();
    } catch (err) { setMsg({ type: 'err', text: err.message }); }
  }
  async function changeImage(id, file) {
    if (!file) return;
    try {
      const { url } = await api.uploadImage(file);
      await api.updateProduct(id, { imageUrl: url });
      load();
    } catch (err) { setMsg({ type: 'err', text: err.message }); }
  }
  async function remove(id) {
    if (!confirm('Remove this product?')) return;
    await api.deleteProduct(id);
    load();
  }

  return (
    <>
      {msg.text && <div className={`msg ${msg.type}`}>{msg.text}</div>}
      <form onSubmit={addProduct} className="adminform">
        <div className="field"><label>Product name</label><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
        <div className="field"><label>Category</label>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {CATS.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="field"><label>Price (KSh)</label><input required type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></div>
        <div className="field"><label>Old price (optional, shows as a sale)</label><input type="number" min="0" value={form.oldPrice} onChange={(e) => setForm({ ...form, oldPrice: e.target.value })} /></div>
        <div className="field"><label>Stock</label><input required type="number" min="0" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} /></div>
        <div className="field"><label>Product photo</label>
          <input type="file" accept="image/*" onChange={pickImage} />
          {uploading && <span className="muted">Uploading…</span>}
        </div>
        {form.imageUrl && <div style={{ gridColumn: '1/-1', width: 120 }}><ProductImage product={{ ...form, name: 'preview' }} height={100} /></div>}
        <div className="field" style={{ gridColumn: '1/-1' }}><label>Description</label><input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
        <div style={{ gridColumn: '1/-1' }}><button className="btn" type="submit" disabled={uploading}>Add product</button></div>
      </form>
      <table>
        <thead><tr><th></th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th></th></tr></thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td style={{ width: 60 }}><ProductImage product={p} height={44} /></td>
              <td>{p.name}</td><td>{p.category}</td><td>{fmt(p.price)}</td><td>{p.stock}</td>
              <td style={{ whiteSpace: 'nowrap' }}>
                <label className="btn small ghost" style={{ marginBottom: 0, cursor: 'pointer' }}>
                  Photo<input type="file" accept="image/*" hidden onChange={(e) => changeImage(p.id, e.target.files[0])} />
                </label>{' '}
                <button className="btn small danger" onClick={() => remove(p.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function OrdersTab() {
  const [orders, setOrders] = useState([]);
  useEffect(() => { api.allOrders().then((d) => setOrders(d.orders)); }, []);

  async function setStatus(id, status) {
    await api.updateOrderStatus(id, status);
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }

  if (!orders.length) return <p className="muted">No orders yet.</p>;
  return (
    <table>
      <thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th></tr></thead>
      <tbody>
        {orders.map((o) => (
          <tr key={o.id}>
            <td>#{o.id}</td>
            <td>{o.customerName}<br /><span className="muted">{o.phone}</span></td>
            <td>{o.items.reduce((s, i) => s + i.quantity, 0)}</td>
            <td>{fmt(o.total)}</td>
            <td>
              <select value={o.status} onChange={(e) => setStatus(o.id, e.target.value)}>
                {['pending', 'paid', 'shipped', 'delivered', 'completed', 'cancelled'].map((s) => <option key={s}>{s}</option>)}
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function InquiriesTab() {
  const [inquiries, setInquiries] = useState([]);
  useEffect(() => { api.allInquiries().then((d) => setInquiries(d.inquiries)); }, []);

  if (!inquiries.length) return <p className="muted">No inquiries yet.</p>;
  return inquiries.map((i) => (
    <div key={i.id} className="cartrow">
      <div><b>{i.name}</b> — <span className="muted">{i.contact}</span><div>{i.message}</div></div>
    </div>
  ));
}
