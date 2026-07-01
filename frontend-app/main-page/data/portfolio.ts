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
    eyebrow: "Agentic vision training platform",
    role: "Founding engineer",
    timeline: "2026 - Present",
    description:
      "A distributed training and experimentation platform designed for rapid vision product iteration with strong observability and reliable lifecycle control.",
    homepageDescription:
      "Computer-vision experiment platform with Go orchestration, Python workers, and cloud GPU jobs.",
    problem:
      "Researchers and product teams were rerunning fragmented scripts, hardening every experiment manually, and lacking a unified trail from idea to deployed model.",
    technicalChallenges: [
      "Designing deterministic training lifecycle control across preemption, retries, and failure recovery.",
      "Standardizing experiment metadata so teams can compare results and reproduce runs.",
      "Keeping the orchestration layer stable while supporting heterogeneous dataset and model pipelines.",
      "Reducing operational ambiguity through transparent logging and explicit run-state transitions."
    ],
    architecture: [
      "Go orchestrator emits job manifests and manages queueing, retries, and worker assignment policy.",
      "Python worker layer executes train/evaluate stages with plugin-oriented dataset adapters.",
      "Centralized run registry tracks checkpoints, metrics, and artifact lineage per experiment.",
      "Dashboard and reporting layer expose run health, regression signals, and review-ready summaries."
    ],
    results: [
      "Improved reusability of training workflows across teams by replacing ad hoc scripts with configurable pipelines.",
      "Reduced non-deterministic failure recovery cost by introducing idempotent run contracts and checkpoint guarantees.",
      "Enabled clear decisioning from experiment output to model selection through standardized artifacts."
    ],
    featured: true,
    icon: "monitor",
    stack: ["Go", "Python", "PyTorch", "Modal", "Cloud GPU", "MLflow"],
    links: [
      { label: "System architecture", href: "" },
      { label: "Repository", href: "" }
    ]
  },
  {
    title: "Minecraft AI Agent Studio",
    eyebrow: "Autonomous planning sandbox",
    role: "AI systems engineer",
    timeline: "2025 - 2026",
    description:
      "A planning-and-execution product for LLM-driven agents with bounded autonomy, safety checks, and end-to-end run traces.",
    homepageDescription: "LLM agent sandbox with bounded planning, safety gates, and replayable run traces.",
    problem:
      "The product needed convincing autonomous behavior while keeping every agent action explainable and recoverable.",
    technicalChallenges: [
      "Balancing autonomy with hard constraints to prevent unsafe behavior.",
      "Converting high-level intents into executable tasks with bounded retries and timeouts.",
      "Maintaining reproducibility for world-state transitions and user-visible actions.",
      "Creating developer-friendly instrumentation for plan inspection and debugging."
    ],
    architecture: [
      "Goal planner with policy routing, tool contracts, and action validation gates.",
      "Event-driven world-state ingestion from simulation updates.",
      "Command adapter layer for action dispatch with failure classification and rollback hooks.",
      "Trace store with replay metadata to debug, benchmark, and improve behavior."
    ],
    results: [
      "Reduced invalid command loops through strict action contracts and recovery policy.",
      "Decreased scenario debugging time via replayable state and decision tracing.",
      "Introduced a fast workflow for scenario templates that accelerated creator iteration."
    ],
    featured: true,
    icon: "robot",
    stack: ["Python", "TypeScript", "FastAPI", "Redis", "WebSockets", "React"],
    links: [
      { label: "Product brief", href: "" },
      { label: "Demo", href: "" }
    ]
  },
  {
    title: "Roasty",
    eyebrow: "AI coaching platform",
    role: "AI/ML product engineer",
    timeline: "2025 - Present",
    description:
      "A computer vision and multimodal AI layer that turns raw gameplay clips into focused coaching recommendations.",
    homepageDescription:
      "Local-first gaming AI co-host using computer vision, replay context, and live commentary.",
    problem:
      "Users needed practical feedback without spending extra hours reviewing raw gameplay and manually identifying key moments.",
    technicalChallenges: [
      "Automating high-signal clip segmentation from noisy raw sessions.",
      "Aligning vision outputs and LLM recommendations with confidence and uncertainty boundaries.",
      "Providing review interfaces that are precise without overwhelming users.",
      "Ensuring privacy and artifact hygiene for user-provided media."
    ],
    architecture: [
      "Frame extraction and temporal segmentation for event-driven evidence detection.",
      "Multimodal model pipeline with prompt contracts and structured evaluation schema.",
      "Evidence graph stores clip-to-recommendation links for replay and iteration.",
      "Web interface with compact review mode and action-linked feedback cards."
    ],
    results: [
      "Improved feedback cycle time by surfacing likely improvement moments automatically.",
      "Increased output usefulness through structured recommendations grouped by decision type.",
      "Created a repeatable review loop where players could test recommendations across sessions."
    ],
    featured: true,
    icon: "mug",
    stack: ["Python", "OpenCV", "Multimodal LLMs", "Vision", "TypeScript", "FastAPI"],
    links: [
      { label: "Notes", href: "" },
      { label: "Demo", href: "" }
    ]
  },
  {
    title: "Guessr",
    eyebrow: "Daily social game platform",
    role: "Product + platform owner",
    timeline: "2024 - Present",
    description:
      "A social daily game that combines short interaction loops with stable backend operations and reliable replayability.",
    homepageDescription: "Production daily social game with race-safe sessions, scoring, streaks, and leaderboards.",
    problem:
      "Game rounds needed to remain simple and fast while preserving score integrity, replays, and social sharing workflows.",
    technicalChallenges: [
      "Preserving deterministic board behavior during reconnects and delayed submissions.",
      "Ensuring idempotent scoring across concurrent sessions.",
      "Reducing latency for feed and historical replay views.",
      "Making social feedback loops clear without exposing internal ranking mechanics."
    ],
    architecture: [
      "Frontend-first product surface with query-aware loading states and stable interaction patterns.",
      "Service-backed state transitions for guesses, scoring, and streak evaluation.",
      "PostgreSQL for durable user data plus Redis for high-frequency read paths.",
      "Analytics instrumentation for trend tracking and puzzle quality tuning."
    ],
    results: [
      "Stabilized gameplay state under high concurrent usage.",
      "Improved retention through clear replay paths and actionable end-state insights.",
      "Established a consistent release pattern for puzzle updates and moderation rules."
    ],
    icon: "globe",
    stack: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Redis"],
    links: [{ label: "Visit app", href: "https://app.guessrgame.com" }]
  },
  {
    title: "Arthrex DevOps Validator",
    eyebrow: "Migration safety toolkit",
    role: "Software engineering intern",
    timeline: "June 2025 - Sept. 2025",
    description:
      "Validated 300K+ MySQL, Couchbase, and S3 migration records with automated integrity checks.",
    problem:
      "Migration quality checks were inconsistent and manual, slowing release confidence and post-change troubleshooting.",
    technicalChallenges: [
      "Enforcing check correctness while keeping results understandable for operators.",
      "Creating evidence trails without operational overhead.",
      "Handling partial results and surfacing clear next actions.",
      "Avoiding noisy false positives in normal data drift scenarios."
    ],
    architecture: [
      "Validation module with rule-driven workflows and deterministic check IDs.",
      "Couchbase-driven metadata and queue state for migration snapshots.",
      "S3-backed evidence storage with immutable context per run.",
      "UI dashboards for exception triage and operational handoff."
    ],
    results: [
      "Reconciled 300K+ records across MySQL, Couchbase, and linked S3 media.",
      "Cut worst-case validation time from 120 seconds to 20 seconds.",
      "Built synchronization APIs that improved migration reliability and diagnostics."
    ],
    stack: ["Angular", "TypeScript", "Couchbase", "MySQL", "S3"],
    links: [
      { label: "Case file", href: "" },
      { label: "Internal write-up", href: "" }
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
