import BlogIndex from "@/components/BlogIndex";
import FooterCTA from "@/components/FooterCTA";
import SiteTopBar from "@/components/SiteTopBar";
import SubpageHero from "@/components/SubpageHero";
import { blogPosts, homepageContent } from "@/data/portfolio";

export default function BlogPage() {
  const topicCount = new Set(blogPosts.map((post) => post.topic)).size;

  return (
    <div className="portfolio-shell portfolio-shell--pixel pixel-polished-theme pixel-page-bg subpage-shell subpage-shell--blog">
      <a href="#top" className="skip-link">
        Skip to content
      </a>
      <SiteTopBar navItems={homepageContent.navItems} variant="pixel" />

      <main id="top">
        <SubpageHero
          kicker="Blog"
          title="Short engineering notes and working updates"
          description="I share concise writeups on what I am building and the implementation decisions I make along the way."
          variant="blog"
          meta={[`${blogPosts.length} notes`, `${topicCount} topic areas`, "Technical writing"]}
        />

        <section className="section-shell section-frame section-stack subpage-panel blog-index-section" aria-label="Blog index">
          <BlogIndex posts={blogPosts} />
        </section>

        <FooterCTA />
      </main>
    </div>
  );
}
