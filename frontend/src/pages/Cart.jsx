import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api.js';
import { useCart } from '../context/CartContext.jsx';
import ProductImage from '../components/ProductImage.jsx';

const fmt = (n) => `KSh ${n.toLocaleString()}`;

export default function Cart() {
  const { items, changeQty } = useCart();
  const [products, setProducts] = useState({});

  useEffect(() => {
    Promise.all(items.map((i) => api.getProduct(i.productId).then((d) => d.product).catch(() => null)))
      .then((list) => setProducts(Object.fromEntries(list.filter(Boolean).map((p) => [p.id, p]))));
  }, [items]);

  const total = items.reduce((sum, i) => sum + (products[i.productId]?.price || 0) * i.quantity, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  if (!items.length) {
    return (
      <section className="wrap cart-empty">
        <div className="cart-empty-icon">🛍</div>
        <h2>Your bag is empty</h2>
        <p className="muted">Looks like you haven't added anything yet.</p>
        <Link to="/shop" className="btn">Start shopping</Link>
      </section>
    );
  }

  return (
    <section className="wrap">
      <h2>Your bag <span className="muted" style={{ fontWeight: 400, fontSize: 16 }}>({count} item{count !== 1 ? 's' : ''})</span></h2>
      <div className="cart-layout">
        <div className="cart-items">
          {items.map((i) => {
            const p = products[i.productId];
            if (!p) return null;
            return (
              <div key={i.productId} className="cart-line">
                <div className="cart-line-img"><ProductImage product={p} height={84} /></div>
                <div className="cart-line-info">
                  <div className="cart-line-name">{p.name}</div>
                  <div className="muted">{p.category}</div>
                  <div className="price">{fmt(p.price)}</div>
                </div>
                <div className="qty">
                  <button className="btn small ghost" onClick={() => changeQty(i.productId, -1)}>−</button>
                  <span>{i.quantity}</span>
                  <button className="btn small ghost" onClick={() => changeQty(i.productId, 1)}>+</button>
                </div>
                <div className="cart-line-total">{fmt(p.price * i.quantity)}</div>
              </div>
            );
          })}
        </div>

        <aside className="cart-summary">
          <h3>Order summary</h3>
          <div className="summary-row"><span>Subtotal</span><span>{fmt(total)}</span></div>
          <div className="summary-row muted"><span>Delivery</span><span>Calculated at checkout</span></div>
          <div className="summary-row summary-total"><span>Total</span><span>{fmt(total)}</span></div>
          <Link to="/checkout" className="btn" style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}>Checkout</Link>
          <Link to="/shop" className="see-all" style={{ display: 'block', textAlign: 'center', marginTop: 12 }}>Continue shopping</Link>
        </aside>
      </div>
    </section>
  );
}
