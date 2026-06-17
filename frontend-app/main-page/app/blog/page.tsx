import Link from "next/link";
import { profile, blogPosts } from "@/data/portfolio";

function isConfiguredLink(value: string) {
  const normalized = value.trim();
  return (
    Boolean(normalized) &&
    normalized !== "#" &&
    !normalized.includes("your-") &&
    !normalized.includes("TODO") &&
    !normalized.includes("placeholder")
  );
}

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

function BlogCard({
  post
}: {
  post: (typeof blogPosts)[number];
}) {
  return (
    <article className="blog-post compact-card">
      <p className="blog-post__topic">{post.topic}</p>
      <h4>{post.title}</h4>
      <p className="blog-post__date">{post.date}</p>
      <p>{post.excerpt}</p>
      <div className="tag-row" aria-label="Post tags">
        {post.tags.map((tag) => (
          <span className="pill" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      {isConfiguredLink(post.href) ? (
        <Link href={post.href} className="blog-post__link" rel={post.href.startsWith("http") ? "noopener noreferrer" : undefined} target={post.href.startsWith("http") ? "_blank" : undefined}>
          Read article
        </Link>
      ) : null}
    </article>
  );
}

export default function BlogPage() {
  return (
    <div className="portfolio-shell">
      <a href="#top" className="skip-link">
        Skip to content
      </a>
      <AppNav />

      <main id="top">
        <section className="section-shell">
          <p className="section-kicker">Blog</p>
          <h1>Working notes and occasional updates</h1>
          <p className="section-lead">
            I write about the engineering and product decisions I’m making across AI systems,
            platform work, and shipping practices.
          </p>
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <BlogCard key={post.title} post={post} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
