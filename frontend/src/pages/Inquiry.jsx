import { useState } from 'react';
import { api } from '../api.js';

export default function Inquiry() {
  const [form, setForm] = useState({ name: '', contact: '', message: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    setError('');
    try {
      await api.sendInquiry(form);
      setSent(true);
      setForm({ name: '', contact: '', message: '' });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="wrap" style={{ maxWidth: 560 }}>
      <h2>Product inquiry</h2>
      <p className="muted">Can't find a product, or want to ask about stock, shades or bulk pricing? Send us a note.</p>
      {sent && <div className="msg ok">Thanks — we'll get back to you shortly.</div>}
      {error && <div className="msg err">{error}</div>}
      <form onSubmit={submit}>
        <div className="field"><label>Name</label><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
        <div className="field"><label>Phone or email</label><input required value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} /></div>
        <div className="field"><label>Your question</label><textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></div>
        <button className="btn" type="submit">Send inquiry</button>
      </form>
    </section>
  );
}
