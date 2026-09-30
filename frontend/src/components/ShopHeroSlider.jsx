import { useEffect, useState } from "react";
import "./ShopHeroSlider.css";

const COLORS = ["#E8AFA6", "#7EB5A6", "#A8C0B0", "#D6D6D6", "#4A4A4A"];

export default function ShopHeroSlider({ products }) {
  const [index, setIndex] = useState(0);

  // SAFE - never crash even if empty
  const items = (products && products.length ? products : []).slice(0, 5);

  useEffect(() => {
    if (!items.length) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [items.length]);

  if (!items.length) return null;

  return (
    <div className="slider-main">
      <div className="backgrounds">
        {items.map((p, i) => (
          <div
            key={i}
            className="background"
            style={{
              background: COLORS[i % COLORS.length],
              opacity: i === index ? 1 : 0,
            }}
          />
        ))}
      </div>

      <div className="container">
        <div className="slider-content-wrap">
          {items.map((p, i) => (
            <div key={i} style={{ display: i === index ? "block" : "none" }}>
              <p className="logo-text">Glamour Collection</p>
              <h1 className="heading-style-2">{p.name}</h1>
              <p className="desc">{p.description?.slice(0, 80)}</p>
              <h3 className="price">KSh {p.price}</h3>
              <button className="shop-btn">Shop Now</button>
            </div>
          ))}
        </div>

        <div className="slider-images">
          {items.map((p, i) => {
            let className = "inactive";
            if (i === index) className = "active";
            else if (i === (index - 1 + items.length) % items.length)
              className = "previous";
            else if (i === (index + 1) % items.length) className = "next";

            return (
              <img
                key={p.id || i}
                src={p.images?.[0] || p.image}
                className={className}
                alt={p.name}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
