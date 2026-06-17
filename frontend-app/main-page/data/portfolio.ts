export type Project = {
  title: string;
  eyebrow: string;
  role: string;
  timeline: string;
  description: string;
  problem: string;
  technicalChallenges: string[];
  architecture: string[];
  results: string[];
  featured?: boolean;
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
  title: string;
  date: string;
  excerpt: string;
  topic: string;
  tags: string[];
  href: string;
};

export const profile = {
  name: "Sahith",
  role: "Senior Software Engineer",
  tagline:
    "I build production-grade software systems, AI/LLM products, and tools that turn complex ideas into reliable outcomes.",
  email: "hello@sahith.dev",
  resumeHref: "",
  githubHref: "",
  linkedinHref: ""
};

export const productsHeader = [
  { label: "Products as systems", value: "Flagship portfolio projects", emphasis: "End-to-end ownership" },
  { label: "Core strengths", value: "AI + LLM", emphasis: "RAG, agents, multimodal workflows" },
  { label: "Delivery model", value: "Senior engineer mindset", emphasis: "Reliability first, then velocity" }
];

export const projects: Project[] = [
  {
    title: "ModelExpress",
    eyebrow: "Agentic vision training platform",
    role: "Founding engineer",
    timeline: "2026 - Present",
    description:
      "A distributed training and experimentation platform designed for rapid vision product iteration with strong observability and reliable lifecycle control.",
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
    stack: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Redis"],
    links: [{ label: "Visit app", href: "https://app.guessrgame.com" }]
  },
  {
    title: "Arthrex DevOps Validator",
    eyebrow: "Migration safety toolkit",
    role: "Implementation engineer",
    timeline: "2023",
    description:
      "An enterprise-grade validation platform reducing migration-checking risk with automated diagnostics and audit-ready evidence.",
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
      "Reduced manual audit burden with standardized validation outputs.",
      "Improved repeatability of checks through versioned rule definitions.",
      "Increased incident response speed by linking diagnostics directly to execution context."
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
    school: "Computer Science",
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
    caption: "A quiet pause before the mountain segment — best part of every trip is usually the in-between minutes.",
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
  }
];

export const blogPosts: BlogPost[] = [
  {
    title: "How I design product reliability before shipping features",
    date: "May 20, 2025",
    excerpt:
      "A practical framework for deciding what gets built first: failure modes, handoff points, and observability goals.",
    topic: "Product Engineering",
    tags: ["Reliability", "Architecture", "Execution"],
    href: ""
  },
  {
    title: "From notebook experiments to production AI workflows",
    date: "Jan 10, 2025",
    excerpt:
      "The difference between a useful demo and a shipped AI product is mostly in data contracts and retry logic.",
    topic: "AI/LLM",
    tags: ["MLOps", "LLM", "Operational design"],
    href: ""
  },
  {
    title: "What I am learning from shipping multiplayer software features",
    date: "Nov 03, 2024",
    excerpt:
      "I wrote down patterns that kept distributed systems stable under traffic while maintaining developer speed.",
    topic: "Product Strategy",
    tags: ["State management", "Collaboration", "Delivery"],
    href: ""
  }
];
