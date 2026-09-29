import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";
import ProductCard from "../components/ProductCard.jsx";
import HeroSlider from "../components/HeroSlider.jsx";
import CategoryShop from "../components/CategoryShop.jsx";
import OfferSlider from "../components/OfferSlider.jsx";

// const categories = [
//   {
//     name: "Skincare",
//     img: "https://images.unsplash.com/photo-1556228720-195a672e8a69?w=200&q=80",
//     cat: "Skincare",
//   },
//   {
//     name: "Haircare",
//     img: "https://images.unsplash.com/photo-1522337360788-8b13ee7a37e?w=200&q=80",
//     cat: "Haircare",
//   },
//   {
//     name: "Fragrance",
//     img: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&q=80",
//     cat: "Fragrance",
//   },
//   {
//     name: "Bath & Body",
//     img: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=200&q=80",
//     cat: "Bath & Body",
//   },
//   {
//     name: "Cosmetics",
//     img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80",
//     cat: "Cosmetics",
//   },
//   {
//     name: "Accessories",
//     img: "https://images.unsplash.com/photo-1611652022419-a9419f74343?w=200&q=80",
//     cat: "Accessories",
//   },
// ];

const CATS = [
  { name: "Skincare", icon: "🧴" },
  { name: "Haircare", icon: "💇" },
  { name: "Fragrance", icon: "🌸" },
  { name: "Bath & Body", icon: "🛁" },
  { name: "Cosmetics", icon: "💄" },
  { name: "Accessories", icon: "💎" },
];

const BADGES = [
  { icon: "📍", title: "Official Store", sub: "Curated Kenyan beauty brands" },
  {
    icon: "✅",
    title: "100% Original Products",
    sub: "Sourced and verified stock",
  },
  { icon: "🚚", title: "Fast Delivery", sub: "Nairobi & countrywide" },
  {
    icon: "🔒",
    title: "Secure Checkout",
    sub: "M-Pesa, card & cash on delivery",
  },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [promo, setPromo] = useState(null);

  useEffect(() => {
    api
      .getProducts()
      .then((d) => {
        setProducts(d.products.slice(0, 8));
        setPromo(d.products.find((p) => p.oldPrice) || null);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <HeroSlider />
      <CategoryShop />
      <OfferSlider />
      {/* <section className="hero">
        <div className="wrap hero-inner">
          <div>
            <span className="eyebrow">Darling Official Distributor</span>
            <h1>Find your beautiful, every single day.</h1>
            <p>
              Skincare, haircare, fragrance and cosmetics — authentic products,
              curated for you.
            </p>
            <Link to="/shop" className="btn btn-light">
              Shop the collection
            </Link>
          </div>
        </div>
      </section> */}

      {/* <section className="wrap">
        <div className="section-head">
          <h2>Shop by category</h2>
        </div>
        <div className="cat-row">
          {CATS.map((c) => (
            <Link
              key={c.name}
              to={`/shop?category=${encodeURIComponent(c.name)}`}
              className="cat-tile"
            >
              <span className="cat-icon">{c.icon}</span>
              <b>{c.name}</b>
            </Link>
          ))}
        </div>
      </section> */}

      {/* {promo && (
        <section className="wrap">
          <div className="promo-banner">
            <div>
              <span className="pill">Limited offer</span>
              <h3>{promo.name}</h3>
              <p className="muted">
                Now KSh {promo.price.toLocaleString()}{" "}
                <span className="oldprice">
                  KSh {promo.oldPrice.toLocaleString()}
                </span>
              </p>
            </div>
            <Link to="/shop?sort=promo" className="btn">
              Shop the sale
            </Link>
          </div>
        </section>
      )} */}

      <section className="wrap">
        <div className="section-head">
          <h2>Best sellers</h2>
          <Link to="/shop" className="see-all">
            See all →
          </Link>
        </div>
        <p className="muted" style={{ marginTop: -8, marginBottom: 18 }}>
          Our most popular products, picked by our customers.
        </p>
        <div className="grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="wrap">
        <div className="badge-row">
          {BADGES.map((b) => (
            <div key={b.title} className="badge-item">
              <span className="badge-icon">{b.icon}</span>
              <div>
                <b>{b.title}</b>
                <div className="muted">{b.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
