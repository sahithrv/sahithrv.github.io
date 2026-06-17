import Link from "next/link";
import { profile, travelPhotos } from "@/data/portfolio";

function AppNav() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Products", href: "/#products" },
    { label: "Architecture", href: "/#architecture" },
    { label: "Travel", href: "/travel" },
    { label: "Blog", href: "/blog" },
    { label: "Skills", href: "/#skills" },
    { label: "Education", href: "/#education" },
    { label: "Contact", href: "/#contact" },
    { label: "Notes", href: "/interests" }
  ];

  return (
    <header className="site-nav">
      <Link href="/" className="brand">
        <span className="brand__name">Sahith</span>
        <p className="brand__role">{profile.role}</p>
      </Link>

      <nav className="nav-links" aria-label="Primary">
        {navItems.map((item) => (
          <Link className="nav-link" href={item.href} key={item.label}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

function PhotoCard({
  photo
}: {
  photo: (typeof travelPhotos)[number];
}) {
  return (
    <article className="photo-card">
      <img className="photo-image" src={photo.src} alt={photo.title} loading="lazy" />
      <div className="photo-content">
        <h4>{photo.title}</h4>
        <p className="photo-caption">{photo.caption}</p>
        <div className="photo-meta">
          <span>{photo.location}</span>
          <span>{photo.date}</span>
        </div>
      </div>
    </article>
  );
}

export default function TravelPage() {
  return (
    <div className="portfolio-shell">
      <a href="#top" className="skip-link">
        Skip to content
      </a>
      <AppNav />

      <main id="top">
        <section className="section-shell">
          <p className="section-kicker">Travel gallery</p>
          <h1>Photos from places I’ve visited</h1>
          <p className="section-lead">
            A curated set of scenes, city moments, and stills from trips where I capture what I noticed
            while moving through different places.
          </p>
          <div className="photo-grid">
            {travelPhotos.map((photo) => (
              <PhotoCard key={photo.title} photo={photo} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
