import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const offers = [
  {
    id: 1,
    tag: "LIMITED OFFER",
    title: "Gold Hoop Earrings",
    price: "KSh 2,460",
    old: "KSh 3,198",
    img: "/hero10.jpg",
    link: "/shop",
  },
  {
    id: 2,
    tag: "HOT DEAL",
    title: "Darling Braids Collection",
    price: "KSh 1,200",
    old: "KSh 1,800",
    img: "/hero7.jpg",
    link: "/shop?category=Haircare",
  },
  {
    id: 3,
    tag: "NEW IN",
    title: "Glow Skincare Set",
    price: "KSh 3,500",
    old: "KSh 4,500",
    img: "/hero4.jpg",
    link: "/shop?category=Skincare",
  },
  {
    id: 4,
    tag: "Today's Mark",
    title: "Natural Glow Skincare",
    price: "KSh 500",
    old: "KSh 800",
    img: "/hero11.jpg",
    link: "/shop?category=Skincare",
  },
];

export default function OfferSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setCurrent((p) => (p + 1) % offers.length),
      4000,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ padding: "0 5% 40px" }}>
      <div
        style={{
          position: "relative",
          height: "200px",
          borderRadius: "18px",
          overflow: "hidden",
          background: "#f9ece6",
        }}
      >
        {offers.map((o, i) => (
          <div
            key={o.id}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 30px",
              opacity: i === current ? 1 : 0,
              transform: i === current ? "translateX(0)" : "translateX(30px)",
              transition: "all 1s ease",
              background: `url(${o.img}) center/cover`,
            }}
          >
            {/* Overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, #f9ece6 40%, rgba(249,236,230,0.2) 100%)",
              }}
            ></div>

            <div style={{ position: "relative", zIndex: 2 }}>
              <span
                style={{
                  background: "#d8b4a8",
                  color: "#5a2a2a",
                  padding: "4px 10px",
                  borderRadius: "12px",
                  fontSize: "11px",
                  fontWeight: "bold",
                }}
              >
                {o.tag}
              </span>
              <h3
                style={{
                  margin: "10px 0",
                  fontSize: "22px",
                  fontWeight: "800",
                  color: "#2b2b2b",
                }}
              >
                {o.title}
              </h3>
              <p>
                Now {o.price}{" "}
                <span
                  style={{
                    textDecoration: "line-through",
                    opacity: 0.6,
                    marginLeft: "8px",
                  }}
                >
                  {o.old}
                </span>
              </p>
            </div>

            <Link
              to={o.link}
              style={{
                position: "relative",
                zIndex: 2,
                background: "#2b233d",
                color: "white",
                padding: "12px 20px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Shop the sale
            </Link>
          </div>
        ))}
      </div>

      {/* dots */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          justifyContent: "center",
          marginTop: "12px",
        }}
      >
        {offers.map((_, i) => (
          <span
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? "20px" : "8px",
              height: "8px",
              borderRadius: "10px",
              background: i === current ? "#3d1752" : "#ddd",
              cursor: "pointer",
              transition: "0.5s",
            }}
          ></span>
        ))}
      </div>
    </div>
  );
}
