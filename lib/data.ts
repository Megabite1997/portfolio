// Single source of truth for all portfolio content.
// Derived from Tada Chaipanya's résumé.

export const profile = {
  name: "Tada Chaipanya",
  firstName: "Tada",
  role: "Full-Stack Developer",
  tagline: "React / Next.js · Go · AWS",
  punch:
    "I build fast, secure web products end-to-end — from polished Next.js front ends to real-time Go services and hardened AWS infrastructure.",
  location: "Nonthaburi, Thailand",
  email: "fendersdtua@hotmail.com",
  phone: "096-321-9494",
  website: "https://tadachaipanya.com",
  available: true,
  availableText: "Open to new opportunities",
  yearsExperience: "4+",
  summary:
    "Software Engineer with 4+ years of experience building web applications with React and Next.js. Experienced in backend development with Go and cloud infrastructure on AWS (CloudFront, ECR, Lightsail). I care about performance, security, and shipping systems that scale.",
} as const;

export const socials = [
  { label: "Email", href: "mailto:fendersdtua@hotmail.com", icon: "mail" },
  { label: "GitHub", href: "https://github.com/Megabite1997", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tada-chaipanya-47b849214/",
    icon: "linkedin",
  },
] as const;

export const stats = [
  { value: "4+", label: "Years building for production" },
  { value: "5", label: "Companies shipped for" },
  { value: "Global", label: "Scale — multi-hotel, multi-region" },
] as const;

export type SkillGroup = {
  title: string;
  accent: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    accent: "var(--accent)",
    skills: ["React.js", "Next.js 15", "TypeScript", "Tailwind CSS", "Micro-frontends"],
  },
  {
    title: "Backend",
    accent: "var(--accent-2)",
    skills: ["Go (Golang)", "Node.js", "Express.js", "KoaJS", "WebSockets", "REST APIs"],
  },
  {
    title: "Cloud & Infra",
    accent: "var(--accent-3)",
    skills: [
      "AWS CloudFront",
      "AWS WAF",
      "ECR",
      "Lightsail",
      "Lambda",
      "DynamoDB",
      "Secrets Manager",
    ],
  },
  {
    title: "Data & DevOps",
    accent: "var(--accent)",
    skills: ["MongoDB", "PostgreSQL", "Docker", "CI/CD", "Dev / UAT / Prod"],
  },
];

export type Experience = {
  company: string;
  context?: string;
  role: string;
  period: string;
  current?: boolean;
  problem: string;
  built: string[];
  impact: string;
  stack: string[];
  featured?: boolean;
};

export const experiences: Experience[] = [
  {
    company: "Synergy Global Network",
    context: "for MBK Group",
    role: "Full-Stack Developer",
    period: "Apr 2026 – Present",
    current: true,
    featured: true,
    problem:
      "MBK Group's internal Legal Management platform was locked into the Mendix low-code platform — hard to extend, costly to license, and limited in performance.",
    built: [
      "Migrated the Legal Management (LM) app from Mendix to a custom Next.js + Golang solution.",
      "Owned both the front-end rebuild and the Go backend services.",
      "Mentored an intern developer — assigning tasks, giving guidance, and onboarding them to the LM project.",
    ],
    impact:
      "Replaced a vendor-locked low-code system with a fully owned, performant stack — and grew the team's capacity through mentoring.",
    stack: ["Next.js", "Golang", "TypeScript"],
  },
  {
    company: "3i Infotech",
    context: "onsite at Minor Hotels",
    role: "Full-Stack Developer",
    period: "May 2025 – Mar 2026",
    featured: true,
    problem:
      "Minor Hotels needed a Smart FrontDesk that works in real time and scales securely across many hotels worldwide — without exposing backend services to the public internet.",
    built: [
      "Developed the Next.js 15 web app (TypeScript + Tailwind CSS) powering Smart FrontDesk.",
      "Built real-time WebSocket services in Go with token-based authentication.",
      "Architected the system to scale across hotels globally with dynamic hotel & station configuration.",
      "Dockerized services and deployed via AWS ECR + Lightsail across Dev / UAT / Prod.",
      "Designed a security architecture with CloudFront + WAF and IP allowlists, using CloudFront as a secure reverse proxy to protect backend services.",
    ],
    impact:
      "A globally-scalable, real-time front-desk platform with a hardened security perimeter — running across three environments for a global hotel brand.",
    stack: ["Next.js 15", "Go", "AWS", "CloudFront", "WAF", "Docker"],
  },
  {
    company: "Muang Thai Life Assurance",
    role: "Frontend Developer",
    period: "Jun 2023 – Dec 2024",
    featured: true,
    problem:
      "A large insurer needed an internal health-claims management tool that multiple teams could develop and deploy independently.",
    built: [
      "Developed an internal insurance management app focused on health claims.",
      "Built the UI in ReactJS and Tailwind CSS.",
      "Implemented a micro-frontend architecture so teams could ship independently.",
    ],
    impact:
      "An internal claims platform built for team scalability through micro-frontends, at one of Thailand's largest life insurers.",
    stack: ["ReactJS", "Tailwind CSS", "Micro-frontends"],
  },
  {
    company: "24 FIX",
    role: "Full-Stack Developer",
    period: "Oct 2022 – Feb 2023",
    problem:
      "The business needed an internal admin to manage delivery packages and reliably track them through their lifecycle.",
    built: [
      "Implemented the internal admin system for package management using React, Node.js, and MongoDB.",
      "Designed and implemented data-storage systems for package tracking.",
    ],
    impact: "An end-to-end internal tool for package management and tracking.",
    stack: ["React", "Node.js", "MongoDB"],
  },
  {
    company: "4-ti",
    context: "startup",
    role: "Full-Stack Developer",
    period: "Oct 2021 – Sep 2022",
    problem:
      "The rikai.ch health platform needed new features and ongoing maintenance to handle sensitive medical data.",
    built: [
      "Maintained and extended the rikai.ch platform with React (TypeScript), KoaJS, and MongoDB.",
      "Implemented features for managing customer blood-test results and displaying doctor / clinic details.",
    ],
    impact: "Shipped medical-data features on a live health platform as a startup full-stack developer.",
    stack: ["React", "TypeScript", "KoaJS", "MongoDB"],
  },
];

export const education = {
  degree: "Bachelor of Science",
  school: "Sirindhorn International Institute of Technology",
  campus: "Rangsit Campus (SIIT-RS)",
  period: "2017 – 2021",
};

export const languages = [
  { name: "Thai", level: "Native" },
  { name: "English", level: "Professional" },
];

// Nodes for the interactive AWS architecture diagram (Minor Hotels Smart FrontDesk).
export type ArchNode = {
  id: string;
  label: string;
  sub: string;
  detail: string;
  group: "edge" | "security" | "compute" | "data";
};

export const archNodes: ArchNode[] = [
  {
    id: "client",
    label: "Front Desk Clients",
    sub: "Next.js 15 · stations worldwide",
    detail:
      "Browser clients running the Next.js 15 Smart FrontDesk app at hotel stations across the globe. Each station boots with dynamic hotel & station configuration.",
    group: "edge",
  },
  {
    id: "cloudfront",
    label: "CloudFront",
    sub: "CDN + secure reverse proxy",
    detail:
      "Amazon CloudFront fronts everything — serving assets fast at the edge and acting as a secure reverse proxy so backend services are never exposed directly to the public internet.",
    group: "edge",
  },
  {
    id: "waf",
    label: "AWS WAF + IP Allowlist",
    sub: "Perimeter security",
    detail:
      "AWS WAF with IP allowlists blocks unauthorized access at the edge. Only approved networks reach the application, dramatically shrinking the attack surface.",
    group: "security",
  },
  {
    id: "ws",
    label: "Go WebSocket Service",
    sub: "Real-time · token auth",
    detail:
      "Real-time WebSocket services written in Go with token-based authentication push live front-desk updates to every station instantly.",
    group: "compute",
  },
  {
    id: "ecr",
    label: "ECR + Lightsail",
    sub: "Dockerized · Dev / UAT / Prod",
    detail:
      "Services are Dockerized, pushed to AWS ECR, and deployed on Lightsail across three isolated environments — Dev, UAT, and Production.",
    group: "compute",
  },
  {
    id: "secrets",
    label: "Secrets Manager",
    sub: "Config & credentials",
    detail:
      "AWS Secrets Manager and dynamic configuration drive per-hotel and per-station behavior without redeploys, keeping credentials out of code.",
    group: "data",
  },
];
