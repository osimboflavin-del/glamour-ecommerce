import { imgSrc } from '../api.js';

// Real photo if the product has one; otherwise a clean illustration by category.
export default function ProductImage({ product, height = 170 }) {
  const c = product.color || '#5A1F52';
  if (product.imageUrl) {
    return (
      <div className="pimg" style={{ height }}>
        <img src={imgSrc(product.imageUrl)} alt={product.name} loading="lazy" className="pimg-real" />
      </div>
    );
  }
  const shapes = {
    Skincare: <><rect x="70" y="70" width="60" height="45" rx="6" fill={c} /><rect x="66" y="58" width="68" height="16" rx="5" fill="#fff" opacity=".85" /><rect x="78" y="86" width="44" height="16" rx="3" fill="#fff" opacity=".6" /></>,
    Haircare: <><rect x="82" y="50" width="36" height="76" rx="8" fill={c} /><rect x="90" y="34" width="20" height="18" rx="3" fill="#fff" opacity=".85" /><rect x="94" y="26" width="30" height="7" rx="3" fill="#fff" opacity=".85" /><rect x="88" y="78" width="24" height="26" rx="3" fill="#fff" opacity=".6" /></>,
    Fragrance: <><rect x="72" y="62" width="56" height="60" rx="10" fill={c} opacity=".9" /><rect x="90" y="44" width="20" height="18" rx="3" fill="#fff" opacity=".85" /><rect x="84" y="34" width="32" height="12" rx="4" fill="#fff" opacity=".85" /><rect x="82" y="80" width="36" height="20" rx="3" fill="#fff" opacity=".6" /></>,
    'Bath & Body': <><path d="M78 56 h44 l6 66 a8 8 0 0 1 -8 8 h-40 a8 8 0 0 1 -8 -8 z" fill={c} /><rect x="88" y="40" width="24" height="18" rx="4" fill="#fff" opacity=".85" /><rect x="84" y="84" width="32" height="24" rx="3" fill="#fff" opacity=".6" /></>,
    Cosmetics: <><rect x="88" y="78" width="24" height="46" rx="4" fill="#2b1a22" /><rect x="90" y="46" width="20" height="34" rx="3" fill={c} /><path d="M90 46 l20 0 l-4 -12 l-12 0 z" fill={c} /></>,
    Accessories: <><circle cx="82" cy="84" r="22" fill="none" stroke={c} strokeWidth="7" /><circle cx="122" cy="84" r="22" fill="none" stroke="#fff" strokeOpacity=".85" strokeWidth="7" /></>,
  };
  return (
    <div className="pimg" style={{ height, background: `${c}22` }}>
      <svg viewBox="0 0 200 150" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label={product.name}>
        <ellipse cx="100" cy="132" rx="46" ry="6" fill="#000" opacity=".1" />
        {shapes[product.category] || shapes.Skincare}
      </svg>
    </div>
  );
}
