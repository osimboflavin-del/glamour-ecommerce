import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { items } = useCart();
  const { user } = useAuth();
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <header>
      <div className="nav">
        <NavLink to="/" className="logo-wrap">
          <div className="darling-part">
            <img src="/darling.jpg" alt="Darling" />
          </div>
          <div className="glamour-part">
            <span className="glamour-text">THE GLAMOUR</span>
            <span className="glamour-text">COSMETICS</span>
            <span className="distributor-badge">DARLING DISTRIBUTOR</span>
          </div>
        </NavLink>
        <nav className="navlinks">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/inquiry">Inquiry</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          {user?.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
        </nav>
        <div className="nav-icons">
          <NavLink to="/contact" className="help-link">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 2-3 4" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span>Need Help?</span>
          </NavLink>
          <NavLink to={user ? "/account" : "/login"} className="account-link">
            {user ? user.name.split(" ")[0] : "Log in"}
          </NavLink>
          <NavLink to="/cart" className="cart-link">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {count > 0 && <span className="cart-badge">{count}</span>}
          </NavLink>
        </div>
      </div>
    </header>
  );
}
