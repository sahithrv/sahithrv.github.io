export type Project = {
  title: string;
  eyebrow: string;
  description: string;
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

export type TravelCategory = "All" | "Cities" | "Food" | "Nature" | "Friends";

export type TravelPhoto = {
  id: string;
  title: string;
  category: Exclude<TravelCategory, "All">;
  location: string;
  caption: string;
  src: string;
};

export const profile = {
  name: "Sahith",
  role: "Software Engineer",
  tagline:
    "Building AI/ML systems, fullstack products, and agentic tools that move from prototype to reality.",
  email: "hello@sahith.dev",
  resumeHref: "/resume.pdf",
  githubHref: "https://github.com/your-github",
  linkedinHref: "https://linkedin.com/in/your-linkedin"
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Interests", href: "/interests" },
  { label: "Contact", href: "#contact" }
];

export const projects: Project[] = [
  {
    title: "Guessr",
    eyebrow: "Daily social game",
    description:
      "A production-minded daily guessing game with fast rounds, shared results, and a fullstack architecture built for repeat play.",
    stack: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Redis"],
    links: [
      { label: "Live", href: "#" },
      { label: "Repo", href: "#" }
    ]
  },
  {
    title: "Roasty",
    eyebrow: "AI gaming coach",
    description:
      "A computer vision and multimodal LLM coach that reads gameplay, spots decision patterns, and turns clips into actionable feedback.",
    stack: ["Python", "OpenCV", "Multimodal LLMs", "Prompting", "Vision"],
    links: [
      { label: "Demo", href: "#" },
      { label: "Notes", href: "#" }
    ]
  },
  {
    title: "ModelExpress",
    eyebrow: "Agentic vision training",
    description:
      "A distributed training platform for vision experiments, pairing Go orchestration with Python workers, GPU jobs, and experiment tracking.",
    stack: ["Go", "Python", "PyTorch", "Modal", "Cloud GPU", "MLflow"],
    links: [
      { label: "System", href: "#" },
      { label: "Repo", href: "#" }
    ]
  },
  {
    title: "Arthrex DevOps Validator",
    eyebrow: "Internship project",
    description:
      "An internal validation tool for migration diagnostics, data quality checks, and S3-backed evidence across operational datasets.",
    stack: ["Angular", "TypeScript", "Couchbase", "MySQL", "S3"],
    links: [
      { label: "Case file", href: "#" },
      { label: "Internal", href: "#" }
    ]
  }
];

export const educationItems: EducationItem[] = [
  {
    school: "Computer Science",
    program: "Software Engineering, AI/ML, and systems-focused coursework",
    detail:
      "Coursework and project work centered on algorithms, data systems, fullstack engineering, machine learning, and product-minded software delivery.",
    highlights: ["AI/ML", "Computer Vision", "Distributed Systems", "Fullstack Products"]
  }
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    skills: ["Python", "TypeScript", "Java", "C/C++", "SQL", "Go"]
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Angular", "React Native"]
  },
  {
    title: "Backend",
    skills: ["FastAPI", "Express", "REST APIs"]
  },
  {
    title: "ML/Data",
    skills: ["PyTorch", "TensorFlow", "Scikit-learn", "OpenCV", "Pandas", "NumPy"]
  },
  {
    title: "Infra/Tools",
    skills: ["Docker", "AWS", "Modal", "PostgreSQL", "Redis", "Git", "MLflow"]
  }
];

export const travelCategories: TravelCategory[] = [
  "All",
  "Cities",
  "Food",
  "Nature",
  "Friends"
];

export const travelPhotos: TravelPhoto[] = [
  {
    id: "neon-crossing",
    title: "Neon Crossing",
    category: "Cities",
    location: "Tokyo, JP",
    caption: "Late night lights, quick turns, and the best kind of city noise.",
    src: "/images/travel/neon-crossing.svg"
  },
  {
    id: "market-bite",
    title: "Market Bite",
    category: "Food",
    location: "Seoul, KR",
    caption: "Street food research, conducted with maximum seriousness.",
    src: "/images/travel/market-bite.svg"
  },
  {
    id: "ridge-line",
    title: "Ridge Line",
    category: "Nature",
    location: "Pacific Northwest",
    caption: "A quiet trail, hard sun, and a view that resets the brain.",
    src: "/images/travel/ridge-line.svg"
  },
  {
    id: "station-crew",
    title: "Station Crew",
    category: "Friends",
    location: "New York, NY",
    caption: "Proof that the best routes are rarely the planned routes.",
    src: "/images/travel/station-crew.svg"
  },
  {
    id: "museum-run",
    title: "Museum Run",
    category: "Cities",
    location: "Chicago, IL",
    caption: "Angles, glass, and a suspiciously perfect afternoon.",
    src: "/images/travel/museum-run.svg"
  },
  {
    id: "coast-watch",
    title: "Coast Watch",
    category: "Nature",
    location: "California Coast",
    caption: "Blue hour by the water with the camera doing its best.",
    src: "/images/travel/coast-watch.svg"
  }
];
