export default function Contact() {
  const mapQuery = encodeURIComponent('Talai Building, Moi University, Eldoret, Kenya');
  return (
    <section className="wrap">
      <div className="contact-banner">
        <div className="contact-banner-inner">
          <b>Glamour Cosmetics</b>
          <span>The Glamour Cosmetics — Darling Distributor</span>
        </div>
      </div>

      <h2>Contact us</h2>
      <div className="contact-grid">
        <div className="contact-details">
          <p><b>Glamour Cosmetics</b> — Darling Distributor</p>
          <p className="muted">
            Talai Building, Moi University<br />
            Eldoret, Kenya
          </p>
          <p className="muted">Phone / WhatsApp: 0797 530 286<br />Email: osimboflavin@gmail.com</p>
          <p className="muted">Visit our shop for the full range of skincare, haircare, fragrance and accessories.</p>
        </div>

        <div className="contact-map">
          <iframe
            title="Glamour Cosmetics location — Talai Building, Moi University"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
