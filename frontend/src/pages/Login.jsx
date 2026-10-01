import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      const user = await login(email, password);
      navigate(user.role === "admin" ? "/admin" : "/account");
    } catch (err) {
      setError(err.message);
    }
  }

  function continueWithGoogle() {
    window.location.href = `${import.meta.env.VITE_API_URL || "https://glamour-backend-cbs5.onrender.com"}/api/auth/google`;
  }

  return (
    <section className="wrap" style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>Log in</h2>
      {error && <div className="msg err">{error}</div>}

      <form onSubmit={submit}>
        <div className="field">
          <label>Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Password</label>
          <div style={{ position: "relative" }}>
            <input
              required
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", paddingRight: "40px" }}
            />
            <span
              onClick={() => setShowPass(!showPass)}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              {showPass ? "👁️‍🗨️" : "👁️"}
            </span>
          </div>
        </div>

        <button
          className="btn"
          style={{ width: "100%", marginTop: 12 }}
          type="submit"
        >
          Log in
        </button>
      </form>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          margin: "18px 0",
        }}
      >
        <div style={{ flex: 1, height: 1, background: "#ddd" }}></div>
        <span style={{ fontSize: 12, color: "#888" }}>OR</span>
        <div style={{ flex: 1, height: 1, background: "#ddd" }}></div>
      </div>

      <button
        onClick={continueWithGoogle}
        style={{
          width: "100%",
          padding: "12px",
          border: "1px solid #ddd",
          borderRadius: 8,
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="google"
          width="20"
        />
        Continue with Google
      </button>

      <p className="muted" style={{ marginTop: 16 }}>
        No account? <Link to="/signup">Sign up</Link>
      </p>
    </section>
  );
}
