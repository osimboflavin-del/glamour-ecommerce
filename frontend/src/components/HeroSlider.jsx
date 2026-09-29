import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const images = [
  "/darling.jpg",
  "/hero1.jpg",
  "/hero2.jpg",
  "/hero3.jpg",
  "/hero4.jpg",
  "/hero5.jpg",
  "/hero6.jpg",
  "/hero7.jpg",
  "/hero8.jpg",
  "/hero9.jpg",
  "/hero10.jpg",
  "/darling.jpg",
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <div className="wrap hero-inner">
        <div>
          <span className="eyebrow">Darling Official Distributor</span>
          <h1>Find your Beauty and Glow, every single day.</h1>
          <p>
            Skincare, haircare, fragrance and cosmetics - authentic products,
            curated for you.
          </p>
          <Link to="/shop" className="btn btn-light">
            Shop the collection
          </Link>
        </div>

        <div className="hero-images">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="Darling"
              className={i === current ? "slide active" : "slide"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
