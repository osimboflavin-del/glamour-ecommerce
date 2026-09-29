import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Account from './pages/Account.jsx';
import Admin from './pages/Admin.jsx';
import Inquiry from './pages/Inquiry.jsx';
import Contact from './pages/Contact.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<Account />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/inquiry" element={<Inquiry />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <footer>
        <div className="wrap footer-grid">
          <div className="footer-col">
            <b className="footer-logo">Glamour Cosmetics</b>
            <p className="muted">
              Glamour Cosmetics is your one-stop beauty store and source of
              authentic makeup, skincare, haircare and fragrance.
            </p>
          </div>
          <div className="footer-col">
            <h4>Shop</h4>
            <Link to="/shop">All products</Link>
            <Link to="/shop?sort=promo">Offers &amp; promotions</Link>
            <Link to="/inquiry">Product inquiry</Link>
            <Link to="/contact">Contact us</Link>
          </div>
          <div className="footer-col">
            <h4>Follow</h4>
            <a href="#" onClick={(e) => e.preventDefault()}>Facebook</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Instagram</a>
            <a href="#" onClick={(e) => e.preventDefault()}>TikTok</a>
          </div>
          <div className="footer-col">
            <h4>Get in touch</h4>
            <span className="muted">WhatsApp / Phone: 0797 530 286</span>
            <span className="muted">Email: osimboflavin@gmail.com</span>
          </div>
        </div>
        <div className="wrap footer-bottom">
          <span>© 2026 Glamour Cosmetics</span>
          <div className="footer-pay">
            <span>M-Pesa</span><span>Visa</span><span>Mastercard</span><span>PayPal</span>
          </div>
        </div>
      </footer>
    </>
  );
}
