import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    setError('');
    try {
      await signup(form.name, form.email, form.password);
      navigate('/account');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="wrap" style={{ maxWidth: 400 }}>
      <h2>Create account</h2>
      {error && <div className="msg err">{error}</div>}
      <form onSubmit={submit}>
        <div className="field"><label>Full name</label><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
        <div className="field"><label>Email</label><input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
        <div className="field"><label>Password</label><input required type="password" minLength={4} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
        <button className="btn" style={{ width: '100%' }} type="submit">Sign up</button>
      </form>
      <p className="muted" style={{ marginTop: 16 }}>Already have an account? <Link to="/login">Log in</Link></p>
    </section>
  );
}
