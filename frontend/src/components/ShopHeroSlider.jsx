import { useEffect, useState } from "react";
import { imgSrc } from "../api.js";
import "./ShopHeroSlider.css";

const COLORS = ["#7EB5A6", "#E8AFA6", "#C9B6E4", "#F5D6A8", "#A8C0B0"];

export default function ShopHeroSlider({ products }) {
  const [index, setIndex] = useState(0);
  const items = (products || []).slice(0, 5);
  useEffect(() => {
    if (!items.length) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 3500);
    return () => clearInterval(id);
  }, [items.length]);
  if (!items.length) return null;
  const cur = items[index];
  return (
    <div
      className="slider-main"
      style={{ background: cur.color || COLORS[index % COLORS.length] }}
    >
      <div className="slider-inner">
        <div className="slider-left">
          <p className="logo-text">Glamour Collection</p>
          <h1>{cur.name}</h1>
          <p className="desc">{cur.description?.slice(0, 90)}.</p>
          <h3 className="price">KSh {cur.price}</h3>
          <button className="shop-btn">Shop Now</button>
        </div>
        <div className="slider-right">
          <img
            src={imgSrc(cur.imageUrl)}
            alt={cur.name}
            className="slider-product-img"
          />
        </div>
      </div>
      <div className="slider-dots">
        {items.map((_, i) => (
          <span
            key={i}
            className={i === index ? "dot active" : "dot"}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
