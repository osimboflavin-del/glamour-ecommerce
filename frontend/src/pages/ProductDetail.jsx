import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { api } from "../api.js";
import { useCart } from "../context/CartContext.jsx";
import ProductImage from "../components/ProductImage.jsx";

const fmt = (n) => `KSh ${n.toLocaleString()}`;

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { add } = useCart();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setProduct(null);
    setError("");
    setAdded(false);
    setQty(1);
    api
      .getProduct(id)
      .then((d) => setProduct(d.product))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return (
      <section className="wrap" style={{ maxWidth: 600 }}>
        <p className="msg err">{error}</p>
        <Link to="/shop" className="btn ghost small">
          Back to shop
        </Link>
      </section>
    );
  }
  if (!product)
    return (
      <section className="wrap">
        <p className="muted">Loading…</p>
      </section>
    );

  const out = product.stock <= 0;

  function handleAdd() {
    for (let i = 0; i < qty; i++) add(product);
    setAdded(true);
  }

  return (
    <section className="wrap">
      <div className="breadcrumb">
        <Link to="/shop">Shop</Link> <span>/</span>{" "}
        <Link to={`/shop?category=${encodeURIComponent(product.category)}`}>
          {product.category}
        </Link>{" "}
        <span>/</span> <span>{product.name}</span>
      </div>

      <div className="pdp-layout">
        <div className="pdp-image">
          {product.oldPrice && <span className="sale">SALE STOCK</span>}
          <ProductImage product={product} height={360} />
        </div>

        <div className="pdp-info">
          <div className="muted">{product.category}</div>
          <h1 style={{ fontSize: 26, margin: "4px 0 10px" }}>{product.name}</h1>
          <div style={{ marginBottom: 14 }}>
            <span className="price" style={{ fontSize: 22 }}>
              {fmt(product.price)}
            </span>
            {product.oldPrice && (
              <span className="oldprice" style={{ fontSize: 15 }}>
                {fmt(product.oldPrice)}
              </span>
            )}
          </div>

          <p>
            {product.description ||
              "No description available for this product yet."}
          </p>

          <div className={`stock-line ${out ? "stock-out" : "stock-ok"}`}>
            {out ? "Out of stock" : `${product.stock} in stock`}
          </div>

          {!out && (
            <div className="qty-row">
              <label>Quantity</label>
              <div className="qty">
                <button
                  className="btn small ghost"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  −
                </button>
                <span>{qty}</span>
                <button
                  className="btn small ghost"
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                >
                  +
                </button>
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            <button
              className="btn"
              disabled={out}
              onClick={handleAdd}
              style={{ flex: 1 }}
            >
              {out ? "Out of stock" : "Add to bag"}
            </button>
            {added && (
              <button className="btn ghost" onClick={() => navigate("/cart")}>
                View bag
              </button>
            )}
          </div>
          {added && (
            <p className="msg ok" style={{ marginTop: 14 }}>
              Added to your bag.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
