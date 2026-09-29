const CONFIG = {
  pending: { label: 'Processing', className: 'status-pending' },
  paid: { label: 'Paid', className: 'status-paid' },
  shipped: { label: 'Shipped', className: 'status-shipped' },
  delivered: { label: 'Delivered', className: 'status-delivered' },
  completed: { label: 'Completed', className: 'status-delivered' },
  cancelled: { label: 'Cancelled', className: 'status-cancelled' },
};

export default function StatusBadge({ status }) {
  const cfg = CONFIG[status] || { label: status, className: 'status-pending' };
  return <span className={`status-badge ${cfg.className}`}>{cfg.label}</span>;
}
