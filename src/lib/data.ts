interface ProjectsProps {
  id: number;
  title: string;
  description: string;
  image?: string;
  video?: string;
  tags: string[];
  demoUrl?: string;
  codeUrl?: string;
  videoUrl?: string;
  status: "live" | "ongoing";
}
// Mock projects data - replace with your actual data
export const projects: ProjectsProps[] = [
  {
    id: 1,
    title: "Yaphy Fitness (E-Commerce)",
    description:
      "Yaphy Fitness is a modern e-commerce platform featuring cart, wishlist, discount coupons, product variations, and a built-in blog. Built with Next.js using SSR and SSG for speed and SEO, it integrates Stripe for secure payments and includes an admin dashboard for managing products, orders, and content",
    image:
      "/images/yaphy.png",
    video: "",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "Framer Motion",
      "Axios",
    ],
    demoUrl: "https://www.yaphyfitness.com/",
    codeUrl: "https://github.com/mukies/yaphy-fitness",
    status: "live",
    videoUrl:
      "https://www.linkedin.com/posts/mukesh-bhattarai-720238157_nextjs-tailwindcss-typescript-activity-7313220697802080256-jxbH?utm_source=share&utm_medium=member_desktop&rcm=ACoAACWWdQgBn8jNW1XF0EAlJrXu_EVd0hhcppY",
  },
  {
    id: 2,
    title: "Mishisa (E-Commerce)",
    description:
      "Developed a modern, responsive UI with robust product filtering and support for both partial and full payments. Seamlessly integrated Nepali payment gateways, eSewa and Khalti, ensuring smooth local transactions. Built using Next.js, TypeScript, Tailwind CSS, Zustand, Axios, and Framer Motion for a dynamic and optimized user experience.",
    image:
      "/images/mishisa.png",
    tags: ["Next.js", "Typescript", "Zustand", "Tailwind CSS", "Axios"],
    demoUrl: "https://mishisa.com/",
    video: "",
    codeUrl: "https://github.com/mukies/mishisa-cosmetic",
    status: "live",
    videoUrl:
      "https://www.linkedin.com/posts/mukesh-bhattarai-720238157_nextjs-typescript-ecommerce-activity-7346104373606846465-P_al?utm_source=share&utm_medium=member_desktop&rcm=ACoAACWWdQgBn8jNW1XF0EAlJrXu_EVd0hhcppY",
  },
  {
    id: 3,
    title: "Invoice Generator (Web App)",
    description:
      "Built a professional invoice generator with customizable templates, enabling users to create, preview, and export invoices effortlessly. Integrated features for PDF download and email export to streamline billing workflows. Developed using React.js, TypeScript, Tailwind CSS, Zustand, JsPDF, Axios, and Framer Motion for a responsive and polished user experience.",
    image:
      "/images/invoice.png",
    video: "",
    tags: ["React js", "Tailwind CSS", "Typescript", "Zustand", "JsPdf"],
    demoUrl: "https://dummytools.com/",
    codeUrl: "https://github.com/mukies/Invoice-generator-react",
    status: "live",
    videoUrl:
      "https://www.linkedin.com/posts/mukesh-bhattarai-720238157_reactjs-typescript-tailwindcss-activity-7313616486558851073-3M7j?utm_source=share&utm_medium=member_desktop&rcm=ACoAACWWdQgBn8jNW1XF0EAlJrXu_EVd0hhcppY",
  },
  {
    id: 4,
    title: "Uplift Website (Company portfolio)",
    description:
      "Developed the company’s animated portfolio website using Next.js, TypeScript, Tailwind CSS, and Framer Motion. The site is fully responsive, visually engaging with smooth animations, and powered by dynamic API-driven content to ensure easy scalability and seamless updates.",
    image:
      "/images/uplift.png",
    video: "",
    tags: ["Next js", "Tailwind CSS", "Typescript", "Zustand", "Axios","Framer Motion"],
    demoUrl: "https://upliftsolutions.com.np/",
    codeUrl: "https://github.com/mukies/uplift",
    status: "live",
    videoUrl:
      "https://www.linkedin.com/posts/mukesh-bhattarai-720238157_nextjs-tailwindcss-typescript-activity-7316158324599664641-lEc8?utm_source=share&utm_medium=member_desktop&rcm=ACoAACWWdQgBn8jNW1XF0EAlJrXu_EVd0hhcppY",
  },
  {
    id: 5,
    title: "Nepal Trade Union Congress (NTUC)",
    description:
      "Developed a fully responsive, content-rich website powered by a comprehensive admin dashboard for managing dynamic content updates with ease. Utilized React.js, TypeScript, Tailwind CSS, Zustand for state management, Framer Motion for smooth animations, and Axios for efficient API integration, delivering a seamless and scalable user experience.",
    image:
      "/images/ntuc.png",
    video: "",
    tags: ["React js", "Tailwind CSS", "Typescript", "Zustand", "JsPdf"],
    demoUrl: "https://ntuc.org.np/",
    codeUrl: "https://github.com/mukies/NTUC-frontend",
    status: "live",
    videoUrl:
      "https://www.linkedin.com/posts/mukesh-bhattarai-720238157_nextjs-reactjs-tailwindcss-activity-7332066695886385153-FytZ?utm_source=share&utm_medium=member_desktop&rcm=ACoAACWWdQgBn8jNW1XF0EAlJrXu_EVd0hhcppY",
  },
];

export const skills = [
  {
    category: "Frontend",
    items: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "HTML/CSS", level: 98 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Framer Motion", level: 88 },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 80 },
      { name: "MongoDB", level: 75 },
      { name: "Firebase", level: 82 },
      { name: "REST API", level: 90 },
      { name: "GraphQL", level: 78 },
    ],
  },
  {
    category: "Tools & Others",
    items: [
      { name: "Git/GitHub", level: 88 },
      { name: "Figma", level: 85 },
      { name: "Jest", level: 80 },
      { name: "Docker", level: 70 },
      { name: "AWS", level: 65 },
      { name: "CI/CD", level: 75 },
    ],
  },
];
