export type Project = {
  title: string;
  eyebrow: string;
  role: string;
  timeline: string;
  description: string;
  homepageDescription?: string;
  problem: string;
  technicalChallenges: string[];
  architecture: string[];
  results: string[];
  featured?: boolean;
  icon?: "monitor" | "robot" | "mug" | "globe" | "shield";
  stack: string[];
  links: {
    label: string;
    href: string;
  }[];
};

export type SkillGroup = {
  title: string;
  skills: string[];
};

export type EducationItem = {
  school: string;
  program: string;
  detail: string;
  highlights: string[];
};

export type TravelPhoto = {
  title: string;
  location: string;
  date: string;
  caption: string;
  src: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  topic: string;
  tags: string[];
  href: string;
  coverImage?: string;
  readTime?: string;
  content: string[];
  media?: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  links?: {
    label: string;
    href: string;
  }[];
};

export type NavItem = {
  label: string;
  href: string;
};

export type SectionAnchor = NavItem & {
  id: string;
};

export type HomepageLink = NavItem & {
  variant: "solid" | "outline" | "soft";
};

export type WorkbenchItem = {
  title: string;
  status: string;
  detail: string;
  icon: "pipeline" | "observability" | "delivery";
};

export type CapabilityCard = {
  label: string;
  value: string;
  emphasis: string;
};

export type SectionCopy = {
  kicker: string;
  title: string;
  subtitle: string;
};

export type HomepageContent = {
  navItems: NavItem[];
  sectionAnchors: SectionAnchor[];
  hero: {
    kicker: string;
    headlinePrefix: string;
    headlineReliable: string;
    headlineProduct: string;
    headlineSuffix: string;
    tagline: string;
    ctas: HomepageLink[];
  };
  workbenchItems: WorkbenchItem[];
  capabilityCards: CapabilityCard[];
  about: SectionCopy & {
    paragraphs: string[];
    operatingPrinciples: string[];
  };
  projectsSection: SectionCopy;
  projectCardTitles: string[];
  experienceSection: SectionCopy;
  experienceTimelineTitle: string;
  experienceBadge: string;
  experienceFallback: Project;
  footerCta: {
    kicker: string;
    headline: string;
    description: string;
    note: string;
    links: HomepageLink[];
  };
};

export const profile = {
  name: "Sahith",
  role: "Software Engineer",
  tagline:
    "I build production-grade software systems, AI/LLM products, and tools that turn complex ideas into reliable outcomes.",
  email: "sahithv24@gmail.com",
  resumeHref: "",
  githubHref: "https://github.com/sahithrv/",
  linkedinHref: "https://www.linkedin.com/in/sahithrv/"
};

export const homepageContent: HomepageContent = {
  navItems: [
    { label: "Home", href: "/" },
    { label: "Photography", href: "/photography" },
    { label: "Projects", href: "/projects" },
    { label: "Interests", href: "/interests" }
  ],
  sectionAnchors: [],
  hero: {
    kicker: "Software Engineer | AI/LLM Systems",
    headlinePrefix: "Building",
    headlineReliable: "reliable AI",
    headlineProduct: "product systems",
    headlineSuffix: "from prototype to production.",
    tagline: profile.tagline,
    ctas: []
  },
  workbenchItems: [
    {
      title: "AI Pipeline",
      status: "Signal intake",
      detail: "Ingestion, policy checks, and structured tracing for every run.",
      icon: "pipeline"
    },
    {
      title: "Observability",
      status: "Feedback loop",
      detail: "Health signals and failure boundaries become first-class product inputs.",
      icon: "observability"
    },
    {
      title: "Delivery",
      status: "Release safety",
      detail: "Reproducible outcomes with explicit rollback, review, and handoff patterns.",
      icon: "delivery"
    }
  ],
  capabilityCards: [
    { label: "Products as systems", value: "Flagship portfolio projects", emphasis: "End-to-end ownership" },
    { label: "Core strengths", value: "AI + LLM", emphasis: "RAG, agents, multimodal workflows" },
    { label: "Delivery model", value: "Software engineer mindset", emphasis: "Reliability first, then velocity" }
  ],
  about: {
    kicker: "About",
    title: "Engineering identity",
    subtitle: "I work at the intersection of product engineering, reliable systems, and AI/LLM workflows.",
    paragraphs: [
      "I focus on turning ambiguous ideas into products with real user outcomes, while preserving reliability, observability, and operational safety. My work is strongest when architecture, product decisions, and release execution move together.",
      "The most repeatable systems I build are those where failures are visible early, recovery is predictable, and teams can scale confidently without guessing what changed."
    ],
    operatingPrinciples: ["Reliability before scale", "Observable systems", "Product outcomes over demos"]
  },
  projectsSection: {
    kicker: "Projects",
    title: "Featured project deck",
    subtitle: "A practical index of work with clear outcomes and practical tradeoffs."
  },
  projectCardTitles: ["ModelExpress", "Minecraft AI Agent Studio", "Roasty", "Guessr"],
  experienceSection: {
    kicker: "Experience",
    title: "Professional timeline",
    subtitle: "Deployment-safe engineering in production-focused environments."
  },
  experienceTimelineTitle: "Arthrex DevOps Validator",
  experienceBadge: "DEPLOYMENT SAFETY + RELIABILITY",
  experienceFallback: {
    title: "Arthrex DevOps Validator",
    role: "Software engineering intern",
    timeline: "June 2025 - Sept. 2025",
    eyebrow: "Migration safety toolkit",
    description:
      "Validated MySQL, Couchbase, and S3 migration data with automated integrity checks.",
    problem: "",
    technicalChallenges: [],
    architecture: [],
    results: ["Details are currently being expanded for production visibility."],
    stack: ["Angular", "TypeScript", "Couchbase", "MySQL", "S3"],
    links: []
  },
  footerCta: {
    kicker: "LET'S BUILD RELIABLE SYSTEMS",
    headline: "Let\u2019s build reliable AI product systems.",
    description:
      "I design and ship production-oriented systems where product outcomes, observability, and recovery paths are intentional from day one.",
    note: "\u00a9 2026 Sahith \u2022 Built with Next.js",
    links: [
      { label: "Email me", href: `mailto:${profile.email}`, variant: "solid" },
      { label: "GitHub", href: profile.githubHref, variant: "outline" },
      { label: "LinkedIn", href: profile.linkedinHref, variant: "soft" }
    ]
  }
};

export const productsHeader = homepageContent.capabilityCards;

export const projects: Project[] = [
  {
    title: "ModelExpress",
    eyebrow: "Agentic computer-vision platform",
    role: "Full-stack AI systems engineer",
    timeline: "2026",
    description:
      "A desktop workbench for running computer-vision experiments from dataset upload to trained model export.",
    problem:
      "Vision experiments often live across scripts, notebooks, cloud jobs, and scattered metrics with little lifecycle control.",
    technicalChallenges: [
      "Built reliable cloud job orchestration with worker leases, heartbeats, retries, and expired-run recovery.",
      "Kept agent-generated experiment plans safe with structured outputs, budget controls, and deterministic validation."
    ],
    architecture: [
      "Electron/React Mission Control talks to a Go/Gin orchestrator backed by PostgreSQL.",
      "Python workers dispatch Modal GPU jobs and store datasets, metrics, and artifacts in S3-compatible storage."
    ],
    results: [
      "Users can monitor live training, compare metrics, select a champion model, and test or export predictions.",
      "The system makes experiment state explicit so failed, retried, or recovered runs stay auditable."
    ],
    icon: "monitor",
    stack: ["Go", "Python", "React", "Electron", "PostgreSQL", "Modal", "S3"],
    links: [{ label: "Repository", href: "https://github.com/sahithrv/model-express" }]
  },
  {
    title: "Minecraft AI Agent Studio",
    eyebrow: "Minecraft multi-agent control studio",
    role: "AI systems engineer",
    timeline: "2026",
    description:
      "A control studio for configuring, launching, and directing Minecraft AI agents in a shared world.",
    problem:
      "Multi-agent Minecraft experiments need live control, clear observability, and safer ways to adjust behavior mid-run.",
    technicalChallenges: [
      "Connected a React/Mantine dashboard to a Fastify API for agents, runtime status, chat, and director commands.",
      "Modeled agent state, permissions, game events, plugin messages, and action results with shared TypeScript contracts."
    ],
    architecture: [
      "The API uses Fastify, SQLite persistence, WebSocket dashboard updates, and Mineflayer-based Minecraft agents.",
      "Director routes support pause/resume, role and task injection, team commands, AI chat, events, and clip markers."
    ],
    results: [
      "The studio turns Minecraft agent experiments into a visual workflow with run control and debugging hooks.",
      "Agents can be adjusted live without restarting the entire scenario."
    ],
    icon: "robot",
    stack: ["TypeScript", "React", "Vite", "Fastify", "SQLite", "Mineflayer", "WebSockets"],
    links: [{ label: "Repository", href: "https://github.com/sahithrv/mc_agent_connector" }]
  },
  {
    title: "Roasty",
    eyebrow: "Realtime gaming AI co-host",
    role: "AI/ML product engineer",
    timeline: "2026",
    description:
      "A local-first gaming AI co-host that watches gameplay and generates grounded commentary for live moments.",
    problem:
      "Gameplay commentary should react to what actually happened on-screen, not generic chat context or manual clip review.",
    technicalChallenges: [
      "Built realtime screen capture and OpenCV/OCR detectors for game events like deaths, HUD changes, and key moments.",
      "Designed an asyncio event bus so capture, detectors, fusion, memory, commentary, and speech cues run concurrently."
    ],
    architecture: [
      "Detection signals are fused into canonical game events, saved into session memory, and packaged with replay frames.",
      "A multimodal LLM path receives event history, memory summaries, and selected context frames for short commentary."
    ],
    results: [
      "The system identifies high-signal moments and produces context-aware, creator-friendly responses.",
      "Replay buffering and audit logs make AI outputs easier to inspect instead of feeling like a black box."
    ],
    icon: "mug",
    stack: ["Python", "OpenCV", "asyncio", "OCR", "Grok/xAI APIs", "Multimodal LLMs"],
    links: [{ label: "Repository", href: "https://github.com/sahithrv/roasty" }]
  },
  {
    title: "Guessr",
    eyebrow: "Daily social game platform",
    role: "Full-stack product engineer",
    timeline: "2026",
    description:
      "A daily social game where today's community answers become tomorrow's Top-5 guessing challenge.",
    problem:
      "The game needed to feel simple for players while protecting daily submissions, guesses, streaks, and rankings.",
    technicalChallenges: [
      "Built a Next.js frontend and async FastAPI APIs for daily prompts, Top-5 guessing, friends, stats, and achievements.",
      "Prevented duplicate sessions and guesses with row-level locks, unique constraints, frozen aggregates, and safe finalization."
    ],
    architecture: [
      "PostgreSQL stores users, submissions, guess sessions, guesses, aggregates, aliases, stats, and achievements.",
      "Redis caches daily questions, Top-5 aggregates, alias maps, and shared hot paths."
    ],
    results: [
      "Players get 10 attempts to find the community's top answers, with hints, streaks, leaderboards, and guest play.",
      "Normalization, lemmatization, and configurable aliases make close guesses feel fair without weakening score integrity."
    ],
    icon: "globe",
    stack: ["Next.js", "TypeScript", "FastAPI", "SQLAlchemy", "PostgreSQL", "Redis", "Docker"],
    links: [
      { label: "Visit app", href: "https://app.guessrgame.com" },
      { label: "Repository", href: "https://github.com/project-reckon/guessr" }
    ]
  }
];

export const educationItems: EducationItem[] = [
  {
    school: "University of California, Irvine",
    program: "Software Engineering, AI/ML, and Systems-focused coursework",
    detail:
      "Foundation centered on software systems, algorithmic rigor, and practical ML deployment.",
    highlights: ["AI/ML", "Computer Vision", "Distributed Systems", "Fullstack Products"]
  }
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages & Platforms",
    skills: ["Python", "TypeScript", "Go", "Java", "C/C++", "SQL"]
  },
  {
    title: "Frontend & Product",
    skills: ["Next.js", "React", "Angular", "TailwindCSS", "State Management", "UX-Driven APIs"]
  },
  {
    title: "Backend & ML",
    skills: ["FastAPI", "REST", "PyTorch", "RAG", "Agentic Workflows", "LLM Integrations"]
  },
  {
    title: "Infra & Delivery",
    skills: ["Docker", "AWS", "Modal", "PostgreSQL", "Redis", "CI/CD", "Observability"]
  }
];

export const travelPhotos: TravelPhoto[] = [
  {
    title: "Market alleys at golden hour",
    location: "Milan, Italy",
    date: "2025",
    caption:
      "Took this while chasing evening light through narrow lanes and small details that disappear after dark.",
    src: "https://images.unsplash.com/photo-1470160412672-30a4eaecab3f?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Sea mist and old walls",
    location: "Lisbon, Portugal",
    date: "2024",
    caption:
      "The tram line cut across old architecture and gave this long horizon shot that still reminds me of the day.",
    src: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Mountain train station platform",
    location: "Interlaken, Switzerland",
    date: "2023",
    caption: "A quiet pause before the mountain segment - best part of every trip is usually the in-between minutes.",
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
  }
];

export const blogPosts: BlogPost[] = [
  {
    slug: "designing-product-reliability",
    title: "How I design product reliability before shipping features",
    date: "May 20, 2025",
    excerpt:
      "A practical framework for deciding what gets built first: failure modes, handoff points, and observability goals.",
    topic: "Product Engineering",
    tags: ["Reliability", "Architecture", "Execution"],
    href: "",
    readTime: "3 min read",
    coverImage:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    content: [
      "The most important engineering decision is deciding what does *not* need to be built yet. If you can define failure modes, users and stakeholders know what to expect when things go right and when things break.",
      "In this workflow, every feature starts as an instrumented hypothesis. I define expected behavior, explicit failure handling, and traceability targets before touching implementation details.",
      "A small design review at start-up saves expensive rework later, especially in AI systems where behavior can vary across inputs, environments, and model versions."
    ],
    media: [
      {
        src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
        alt: "Reliable deployment dashboard visual",
        caption: "Reliable systems start with explicit boundaries around failures and outcomes."
      }
    ],
    links: [{ label: "Notes from this approach", href: "" }]
  },
  {
    slug: "notebook-to-production-ai-workflows",
    title: "From notebook experiments to production AI workflows",
    date: "Jan 10, 2025",
    excerpt:
      "The difference between a useful demo and a shipped AI product is mostly in data contracts and retry logic.",
    topic: "AI/LLM",
    tags: ["MLOps", "LLM", "Operational design"],
    href: "",
    readTime: "4 min read",
    coverImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Most experimental AI work fails in production because input expectations are never enforced and model responses are treated as final rather than bounded outputs.",
      "A practical path is to create a narrow contract between prompt, structured response schema, retry strategy, and human review points.",
      "Once that contract is in place, you can iterate faster and keep model behavior within a predictable operating envelope."
    ],
    media: [
      {
        src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
        alt: "Notebook to production AI workflow",
        caption: "A reproducible pipeline is the bridge from prototype to reliable feature."
      }
    ]
  },
  {
    slug: "shipping-multiplayer-software-features",
    title: "What I am learning from shipping multiplayer software features",
    date: "Nov 03, 2024",
    excerpt:
      "I wrote down patterns that kept distributed systems stable under traffic while maintaining developer speed.",
    topic: "Product Strategy",
    tags: ["State management", "Collaboration", "Delivery"],
    href: "",
    readTime: "5 min read",
    coverImage:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Multiplayer software is where small consistency bugs become visible to users quickly. You need an architecture that tolerates retries and still keeps product flow intuitive.",
      "I found progress by creating consistent state transition boundaries, clear rollback states, and minimal client assumptions.",
      "Teams ship faster when ownership is distributed across frontend and backend contracts, not centralized in one owner."
    ],
    media: [
      {
        src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
        alt: "Collaborative software planning session",
        caption: "Clear state transitions reduce uncertainty during concurrent interactions."
      }
    ]
  }
];
