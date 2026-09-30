import { useEffect, useState } from "react";
import { FastAverageColor } from "fast-average-color";
import "./ShopHeroSlider.css";

const fac = new FastAverageColor();

export default function ShopHeroSlider({ products }) {
  const [index, setIndex] = useState(0);
  const [bgColors, setBgColors] = useState({});
  const items = products.slice(0, 5);

  // AUTO EXTRACT COLOR FROM IMAGE
  useEffect(() => {
    items.forEach(async (p) => {
      const imgUrl = p.image || p.images?.[0];
      if (!imgUrl || bgColors[imgUrl]) return;

      try {
        const color = await fac.getColorAsync(imgUrl, {
          crossOrigin: "anonymous",
        });
        setBgColors((prev) => ({ ...prev, [imgUrl]: color.hex }));
      } catch (e) {
        // fallback if CORS blocks - use default colors
        const fallbacks = [
          "#E8AFA6",
          "#7EB5A6",
          "#A8C0B0",
          "#D6D6D6",
          "#4A4A4A",
        ];
        setBgColors((prev) => ({
          ...prev,
          [imgUrl]: fallbacks[Math.floor(Math.random() * fallbacks.length)],
        }));
      }
    });
  }, [products]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [items.length]);

  if (!items.length) return null;

  return (
    <div className="slider-main">
      {/* BACKGROUNDS WITH AUTO COLOR */}
      <div className="backgrounds">
        {items.map((p, i) => {
          const imgUrl = p.image || p.images?.[0];
          const color = bgColors[imgUrl] || "#7CB686";
          return (
            <div
              key={i}
              className="background"
              style={{
                background: `radial-gradient(50% 50% at 50% 50%, ${color} 0%, ${color}CC 92.19%)`,
                opacity: i === index ? 1 : 0,
              }}
            />
          );
        })}
      </div>

      <div className="container">
        <div className="slider-content-wrap">
          {items.map((p, i) => (
            <div key={i} style={{ display: i === index ? "block" : "none" }}>
              <p className="logo-text">Glamour Collection</p>
              <h1 className="heading-style-2">{p.name}</h1>
              <p className="desc">{p.description?.slice(0, 90)}...</p>
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
                key={i}
                src={p.image || p.images?.[0]}
                className={className}
                crossOrigin="anonymous"
                alt={p.name}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
