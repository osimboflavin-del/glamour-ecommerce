import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    setError('');
    try {
      const user = await login(email, password);
      navigate(user.role === 'admin' ? '/admin' : '/account');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="wrap" style={{ maxWidth: 400 }}>
      <h2>Log in</h2>
      {error && <div className="msg err">{error}</div>}
      <form onSubmit={submit}>
        <div className="field"><label>Email</label><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
        <div className="field"><label>Password</label><input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
        <button className="btn" style={{ width: '100%' }} type="submit">Log in</button>
      </form>
      <p className="muted" style={{ marginTop: 16 }}>No account? <Link to="/signup">Sign up</Link></p>
      <p className="muted">Admin demo: admin@glamour.com / admin123 (after running the seed script)</p>
      <p className="muted">Google/Facebook login: add Passport.js OAuth strategies to the backend and wire buttons here to <code>/api/auth/google</code> etc.</p>
    </section>
  );
}
