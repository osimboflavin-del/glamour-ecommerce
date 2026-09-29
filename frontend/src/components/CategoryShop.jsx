import { Link } from "react-router-dom";

const categories = [
  {
    name: "Skincare",
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80",
    cat: "Skincare",
  },

  {
    name: "Fragrance",
    img: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&q=80",
    cat: "Fragrance",
  },
  {
    name: "Bath & Body",
    img: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=200&q=80",
    cat: "Bath & Body",
  },
  {
    name: "Cosmetics",
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80",
    cat: "Cosmetics",
  },
  {
    name: "Accessories",
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80",
    cat: "Accessories",
  },
];

export default function CategoryShop() {
  return (
    <div style={{ padding: "30px 5%" }}>
      <h2
        style={{
          fontFamily: "Georgia",
          fontSize: "28px",
          marginBottom: "20px",
        }}
      >
        Shop By Category
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "15px",
        }}
      >
        {categories.map((c) => (
          <Link
            key={c.name}
            to={`/shop?category=${c.cat}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                background: "#faf6f9",
                borderRadius: "16px",
                padding: "15px",
                textAlign: "center",
                border: "1px solid #eee",
                transition: "0.3s",
              }}
              className="cat-card"
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  margin: "0 auto 10px",
                  borderRadius: "505",
                  overflow: "hidden",
                  background: "white",
                }}
              >
                <img
                  src={c.img}
                  alt={c.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <p style={{ fontWeight: "600", fontSize: "14px" }}>{c.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
