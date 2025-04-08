#!/usr/bin/env node

import prompts from "prompts";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Utils
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const run = (cmd, opts = {}) => execSync(cmd, { stdio: "inherit", ...opts });

// Prompt the user
const response = await prompts([
  {
    type: "text",
    name: "projectName",
    message: "◆  Project name:",
    initial: "vite-project",
  },
  {
    type: "select",
    name: "variant",
    message: "◆  Select a variant:",
    choices: [
      { title: "TypeScript", value: "react-ts" },
      { title: "JavaScript", value: "react" },
    ],
    initial: 0,
  },
]);

const { projectName, variant } = response;
const projectPath = path.join(process.cwd(), projectName);
const ext = variant === "react-ts" ? "tsx" : "jsx";
const viteConfigFile = variant === "react-ts" ? "vite.config.ts" : "vite.config.js";

// Step 1: Create Vite Project
run(`npm create vite@latest ${projectName} -- --template ${variant}`);

// Step 2: Install Dependencies
run(`npm i`, { cwd: projectPath });
run(`npm i tailwindcss @tailwindcss/vite`, { cwd: projectPath });
run(`npm i react-router-dom axios`, { cwd: projectPath });

// Step 3: Vite Config
fs.writeFileSync(
  path.join(projectPath, viteConfigFile),
  `
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
})
`.trim()
);

// Step 4: Tailwind index.css
fs.writeFileSync(
  path.join(projectPath, "src", "index.css"),
  `@import "tailwindcss";`
);

// Step 5: Folder Structure
["assets", "components", "layout", "pages", "services"].forEach((folder) =>
  fs.mkdirSync(path.join(projectPath, "src", folder), { recursive: true })
);

// Step 6: Navbar & Footer Components
fs.writeFileSync(
  path.join(projectPath, `src/components/Navbar.${ext}`),
  `
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className=" text-white p-4 flex justify-between bg-[#004ff9]">
      <h1 className="text-xl font-semibold">Vite-blueprint</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/about" className="hover:underline">About</Link>
      </div>
    </nav>
  );
};

export default Navbar;
`.trim()
);

fs.writeFileSync(
  path.join(projectPath, `src/components/Footer.${ext}`),
  `
// src/components/Footer.tsx
const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-blue-100 text-sm py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        © {new Date().getFullYear()} <span className="font-semibold">Vite Blueprint</span> · Crafted with ❤️ by{" "}
        <a
          href="https://github.com/vivek8446"
          className="underline hover:text-white transition"
          target="_blank"
        >
          Vivek
        </a>
      </div>
    </footer>
  );
};

export default Footer;

`.trim()
);

// Step 7: MainLayout
fs.writeFileSync(
  path.join(projectPath, `src/layout/MainLayout.${ext}`),
  `
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e3a8a]">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
`.trim()
);

// Step 8: Pages
fs.writeFileSync(
  path.join(projectPath, `src/pages/Home.${ext}`),
  `

  const Home = () => {
    return (
      <section className="h-[83vh] bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] flex items-center justify-center px-4">
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Supercharge your Vite setup with{" "}
            <span className="text-blue-400">vite-blueprint 🚀</span>
          </h1>
  
          <p className="text-lg text-blue-100 mb-6 leading-relaxed">
            A minimal and powerful Vite + React starter packed with TailwindCSS v4,
            React Router, Axios, and a clean folder structure. Setup your next project
            in seconds.
          </p>
  
          <div className="flex justify-center gap-4">
            <a
              href="https://www.npmjs.com/package/@vivek8446/vite-blueprint"
              target="_blank"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-300"
            >
              View on NPM
            </a>
            <a
              href="https://github.com/vivek8446/vite-blueprint"
              target="_blank"
              className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white font-medium px-6 py-2 rounded-lg transition-all duration-300"
            >
              GitHub Repo
            </a>
          </div>
        </div>
      </section>
    );
  };
  
  export default Home;
  
`.trim()
);

fs.writeFileSync(
  path.join(projectPath, `src/pages/About.${ext}`),
  `
const About = () => {
  return <div className="flex items-center h-[83vh] justify-center">
    <div>
          <h1 className="text-4xl font-bold text-blue-100">
            About
          </h1>
    </div>
  </div>;
};

export default About;
`.trim()
);

// Step 9: Axios service
fs.writeFileSync(
  path.join(projectPath, `src/services/apiClient.${variant === "react-ts" ? "ts" : "js"}`),
  `
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL || 'https://api.example.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    
  },
});

export default apiClient;
`.trim()
);

fs.writeFileSync(
  path.join(projectPath, `src/services/apiService.${variant === "react-ts" ? "ts" : "js"}`),
  `
export const EndPoint = {
  //here you can add your endpoints
  getUser: "user",
  signUp: "signup",
  login: "login", 
};

`.trim()
);

// Step 10: App file
fs.writeFileSync(
  path.join(projectPath, `src/App.${ext}`),
  `
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
`.trim()
);

console.log("\n✅ Project setup complete!");
console.log(`👉 cd ${projectName} && npm run dev`);
