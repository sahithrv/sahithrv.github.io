"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/portfolio";

type NavItem = {
  label: string;
  href: string;
};

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

export default function SiteTopBar({
  navItems
}: {
  navItems: NavItem[];
}) {
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const hideActivationOffset = 320;
  const directionThreshold = 18;

  const getScrollY = () => window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

  useEffect(() => {
    let isActive = true;

    const onScroll = () => {
      if (!isActive) return;

      const currentY = getScrollY();

      if (currentY <= hideActivationOffset) {
        setIsHidden(false);
        lastScrollY.current = currentY;
        return;
      }

      if (currentY > lastScrollY.current + directionThreshold && currentY > hideActivationOffset) {
        setIsHidden(true);
      } else if (currentY < lastScrollY.current - directionThreshold) {
        setIsHidden(false);
      }

      lastScrollY.current = currentY;
    };

    lastScrollY.current = getScrollY();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      isActive = false;
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const socialLinks = [
    {
      label: "Email",
      href: `mailto:${profile.email}`,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M12 13.065 1.8 6.3A2 2 0 0 1 3.7 4.2h16.6a2 2 0 0 1 1.9 2.1L12 13.065Zm0 2.47 9.9-6.6V17a2 2 0 0 1-2 2H4.1A2 2 0 0 1 2.1 17V8.935Z"
          />
        </svg>
      )
    },
    {
      label: "GitHub",
      href: profile.githubHref,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M12 2.25c-5.39 0-9.75 4.36-9.75 9.75 0 4.31 2.8 7.97 6.68 9.27.49.09.67-.21.67-.47 0-.23-.01-.84-.01-1.65-2.72.59-3.29-1.31-3.29-1.31-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.61.07-.61 1 .08 1.53 1.03 1.53 1.03.89 1.52 2.33 1.08 2.9.83.09-.64.35-1.08.64-1.33-2.17-.25-4.45-1.08-4.45-4.83 0-1.06.38-1.93 1-2.61-.1-.25-.43-1.26.09-2.63 0 0 .83-.27 2.7 1 .79-.22 1.64-.33 2.48-.33.84 0 1.69.11 2.48.33 1.87-1.3 2.7-1 2.7-1 .52 1.37.19 2.38.09 2.63.62.68 1 1.55 1 2.61 0 3.76-2.29 4.58-4.48 4.82.36.32.68.93.68 1.87 0 1.35-.01 2.44-.01 2.77 0 .26.18.56.68.47A9.75 9.75 0 0 0 21.75 12c0-5.39-4.36-9.75-9.75-9.75Z"
          />
        </svg>
      )
    },
    {
      label: "LinkedIn",
      href: profile.linkedinHref,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M6.94 9h2.83v1.4h.04c.39-.74 1.35-1.52 2.78-1.52 2.97 0 3.52 1.95 3.52 4.48V18h-2.92v-3.98c0-.95-.02-2.17-1.32-2.17-1.32 0-1.53 1.03-1.53 2.1V18H6.94Zm-2.9 9h2.89V8.5H4.04Zm1.45-10.82a1.67 1.67 0 1 1 0-3.34 1.67 1.67 0 0 1 0 3.34Z"
          />
        </svg>
      )
    }
  ];

  return (
    <header className={`site-nav ${isHidden ? "site-nav--hidden" : ""}`}>
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

        <div className="social-links" aria-label="External links">
          {socialLinks.map((link) =>
            isConfiguredLink(link.href) ? (
              <a
                className="nav-link nav-link--icon"
                href={link.href}
                target={link.href.startsWith("mailto:") ? "_self" : "_blank"}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={link.label}
                key={link.label}
              >
                {link.icon}
              </a>
            ) : null
          )}
        </div>
      </nav>
    </header>
  );
}
