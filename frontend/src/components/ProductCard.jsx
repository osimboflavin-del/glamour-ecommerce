import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import ProductImage from './ProductImage.jsx';

const fmt = (n) => `KSh ${n.toLocaleString()}`;

export default function ProductCard({ product }) {
  const { add } = useCart();
  const out = product.stock <= 0;

  function handleAdd(e) {
    e.preventDefault(); // don't follow the card's link
    e.stopPropagation();
    add(product);
  }

  return (
    <Link to={`/product/${product.id}`} className="card">
      {product.oldPrice && <span className="sale">SALE</span>}
      <ProductImage product={product} />
      <div className="cardbody">
        <div className="muted">{product.category}</div>
        <h4 style={{ margin: 0, fontSize: 15 }}>{product.name}</h4>
        <div>
          <span className="price">{fmt(product.price)}</span>
          {product.oldPrice && <span className="oldprice">{fmt(product.oldPrice)}</span>}
        </div>
        <button className="btn small" disabled={out} onClick={handleAdd}>{out ? 'Out of stock' : 'Add to bag'}</button>
      </div>
    </Link>
  );
}
