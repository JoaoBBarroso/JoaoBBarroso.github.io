export type LinkRow = { k: string; v: string; note: string; href?: string };
export type InfoRow = { k: string; v: string; note: string; stack?: string };

export type Panel = {
  slug: string;
  label: string;
  kicker: string;
  title: string;
  body?: string;
  links?: LinkRow[];
  rows?: InfoRow[];
};

export const EMAIL = "joaodb.barroso@gmail.com";
export const GITHUB = "https://github.com/JoaoBBarroso";
export const LINKEDIN = "https://www.linkedin.com/in/jo%C3%A3o-diogo-barroso/";
export const CV = "/CV%20Joao%20Barroso%202025.pdf";
export const SOURCE = "https://github.com/JoaoBBarroso/JoaoBBarroso.github.io";

// Index 0 is the intro; 1–4 map to the nodes around the sphere.
export const PANELS: Panel[] = [
  {
    slug: "",
    label: "Intro",
    kicker: "00 / INTRO",
    title: "I build fast, well‑tested front ends.",
    body: "Eight years of React, Next.js and TypeScript for proptech, fintech, banking and telecom teams — including being the first front-end hire on a product used by craftsmen across Norway. These days it’s Ember.js and Ruby at Salsify. Pick a node on the sphere.",
  },
  {
    slug: "work",
    label: "Work",
    kicker: "01 / WORK",
    title: "Three products, eight years, one habit: ship it tested.",
    links: [
      {
        k: "01",
        v: "Salsify",
        note: "Product experience management for brands and retailers. Building across the Ember.js front end and the Ruby behind it, and bringing AI tools and capabilities to customers.",
      },
      {
        k: "02",
        v: "Boligmappa",
        note: "First front-end hire. A documentation platform used by craftsmen and homeowners across Norway, plus its Storybook component library.",
      },
      {
        k: "03",
        v: "iCapital",
        note: "An alternative-investment marketplace, built with a team of ten-plus developers — dense financial interfaces where a wrong number is a real problem.",
      },
    ],
  },
  {
    slug: "about",
    label: "About",
    kicker: "02 / ABOUT",
    title: "Front-end developer. Setúbal-based, Norway-shaped.",
    body: "Master’s in Computer Science, and eight years on teams of three to twenty people. I care about the parts users never praise: the loading state, the failed request, the form that remembers what you typed. Being the first front-end hire on a product taught me that architecture decisions are mostly acts of empathy toward whoever arrives next.",
    rows: [
      {
        k: "NOW",
        v: "Ember.js and Ruby",
        note: "Day to day at Salsify, on both sides of the request",
      },
      {
        k: "CORE",
        v: "React, Next.js, TypeScript",
        note: "Plus Tailwind CSS, Linaria, SCSS, Zustand and Redux",
      },
      {
        k: "TESTING",
        v: "Not optional",
        note: "Jest, React Testing Library and Playwright — coverage that means something",
      },
      {
        k: "EDUCATION",
        v: "MSc Computer Science",
        note: "Setúbal School of Technology, IPS · 2021",
      },
    ],
  },
  {
    slug: "experience",
    label: "Experience",
    kicker: "03 / EXPERIENCE",
    title: "Since 2018, in five chapters.",
    rows: [
      {
        k: "2025 — NOW",
        v: "Salsify",
        note: "Product experience management · bringing AI tools to customers",
        stack: "Ember.js · Ruby",
      },
      {
        k: "2022 — 2025",
        v: "Boligmappa",
        note: "First front-end hire · proptech, Oslo via INSCALE",
        stack: "React · Next.js · TypeScript · Tailwind · Playwright · Storybook",
      },
      {
        k: "2021 — 2022",
        v: "iCapital",
        note: "Front-end developer · fintech investment marketplace",
        stack: "React · JavaScript · Redux · Jest",
      },
      {
        k: "2019 — 2021",
        v: "Novabase",
        note: "Banking, telecom and e-procurement — including a monolith rebuilt as a modern app",
        stack: "React · TypeScript · Redux · Ant Design · Azure DevOps",
      },
      {
        k: "2018 — 2019",
        v: "INSTICC",
        note: "Straight out of university · small front ends for scientific conferences",
        stack: "React · JavaScript · Node.js",
      },
    ],
  },
  {
    slug: "contact",
    label: "Contact",
    kicker: "04 / CONTACT",
    title: "Not looking — but always curious.",
    body: "No pitch deck needed. A paragraph about what you’re building is plenty.",
    links: [
      { k: "MAIL", v: EMAIL, note: "The quickest way to reach me", href: `mailto:${EMAIL}` },
      { k: "CODE", v: "github.com/JoaoBBarroso", note: "Side projects, including this page", href: GITHUB },
      { k: "WORK", v: "linkedin.com/in/joão-diogo-barroso", note: "The formal version of this page", href: LINKEDIN },
      { k: "CV", v: "Download the CV", note: "One page, PDF", href: CV },
    ],
  },
];
