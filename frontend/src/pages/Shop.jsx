import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../api.js';
import ProductCard from '../components/ProductCard.jsx';

const CATS = ['Skincare', 'Haircare', 'Fragrance', 'Bath & Body', 'Cosmetics', 'Accessories'];

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const search = params.get('search') || '';
  const category = params.get('category') || 'All';
  const sort = params.get('sort') || 'featured';

  useEffect(() => {
    setLoading(true);
    api.getProducts({ search, category, sort })
      .then((d) => setProducts(d.products))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [search, category, sort]);

  function update(key, value) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value); else next.delete(key);
    setParams(next);
  }

  return (
    <section className="wrap">
      <h2>Shop all</h2>
      <div className="toolbar">
        <input placeholder="Search products…" value={search} onChange={(e) => update('search', e.target.value)} style={{ flex: 1, minWidth: 180 }} />
        <select value={category} onChange={(e) => update('category', e.target.value)}>
          <option value="All">All categories</option>
          {CATS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={sort} onChange={(e) => update('sort', e.target.value)}>
          <option value="featured">Featured</option>
          <option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option>
          <option value="promo">On promotion</option>
        </select>
      </div>
      {loading ? <p className="muted">Loading…</p> : (
        <div className="grid">
          {products.length ? products.map((p) => <ProductCard key={p.id} product={p} />) : <p className="muted">No products match.</p>}
        </div>
      )}
    </section>
  );
}
