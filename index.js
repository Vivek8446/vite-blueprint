// import prompts from "prompts";
// import { execSync } from "child_process";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// // Utils
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const run = (cmd, opts = {}) => execSync(cmd, { stdio: "inherit", ...opts });

// // Step 1: Prompts
// const response = await prompts([
//   {
//     type: "text",
//     name: "projectName",
//     message: "◆  Project name:",
//     initial: "vite-project",
//   },
//   {
//     type: "select",
//     name: "variant",
//     message: "◆  Select a variant:",
//     choices: [
//       { title: "TypeScript", value: "react-ts" },
//       { title: "JavaScript", value: "react" },
//     ],
//     initial: 0,
//   },
// ]);

// const { projectName, variant } = response;
// const projectPath = path.join(process.cwd(), projectName);

// // Step 2: Create Vite project
// console.log(`\n🚀 Creating ${variant} project: ${projectName}\n`);
// run(`npm create vite@latest ${projectName} -- --template ${variant}`);

// // Step 3: Install dependencies
// console.log(`\n📦 Installing dependencies...`);
// run(`npm install`, { cwd: projectPath });
// run(`npm install tailwindcss @tailwindcss/vite`, { cwd: projectPath });
// run(`npm install react-router-dom axios`, { cwd: projectPath });

// // Step 4: Create vite.config.[ts|js]
// const viteConfigFile = variant === "react-ts" ? "vite.config.ts" : "vite.config.js";
// fs.writeFileSync(
//   path.join(projectPath, viteConfigFile),
//   `
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//     react()
//   ],
// })
// `.trim()
// );

// // Step 5: Setup index.css
// fs.writeFileSync(
//   path.join(projectPath, "src", "index.css"),
//   `
// @import "tailwindcss";
// `.trim()
// );

// // Step 6: Create folders
// ["assets", "components", "layout", "pages", "services"].forEach((folder) =>
//   fs.mkdirSync(path.join(projectPath, "src", folder), { recursive: true })
// );

// // Step 7: MainLayout
// const layoutExt = variant === "react-ts" ? "tsx" : "jsx";
// fs.writeFileSync(
//   path.join(projectPath, `src/layout/MainLayout.${layoutExt}`),
//   `
// import { Outlet } from "react-router-dom";

// const MainLayout = () => {
//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold text-center mb-4">My App</h1>
//       <Outlet />
//     </div>
//   );
// };

// export default MainLayout;
// `.trim()
// );

// // Step 8: Pages
// fs.writeFileSync(
//   path.join(projectPath, `src/pages/Home.${layoutExt}`),
//   `
// const Home = () => {
//   return <div className="text-xl text-blue-600">Home Page</div>;
// };

// export default Home;
// `.trim()
// );

// fs.writeFileSync(
//   path.join(projectPath, `src/pages/About.${layoutExt}`),
//   `
// const About = () => {
//   return <div className="text-xl text-green-600">About Page</div>;
// };

// export default About;
// `.trim()
// );

// // Step 9: Axios Service
// fs.writeFileSync(
//   path.join(projectPath, `src/services/api.${variant === "react-ts" ? "ts" : "js"}`),
//   `
// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'https://api.example.com',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default API;
// `.trim()
// );

// // Step 10: App file with routing
// fs.writeFileSync(
//   path.join(projectPath, `src/App.${layoutExt}`),
//   `
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import MainLayout from "./layout/MainLayout";
// import Home from "./pages/Home";
// import About from "./pages/About";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<MainLayout />}>
//           <Route index element={<Home />} />
//           <Route path="about" element={<About />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
// `.trim()
// );

// console.log("\n✅ Project setup complete!");
// console.log(`👉 cd ${projectName} && npm run dev`);






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
run(`npm install`, { cwd: projectPath });
run(`npm install tailwindcss @tailwindcss/vite`, { cwd: projectPath });
run(`npm install react-router-dom axios`, { cwd: projectPath });

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
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="text-xl font-semibold">My App</h1>
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
const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center p-4 mt-10 text-sm text-gray-600">
      © 2025 My App. All rights reserved.
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
    <>
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
      <Footer />
    </>
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
  return <div className="text-xl text-blue-600">Home Page</div>;
};

export default Home;
`.trim()
);

fs.writeFileSync(
  path.join(projectPath, `src/pages/About.${ext}`),
  `
const About = () => {
  return <div className="text-xl text-green-600">About Page</div>;
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
    // Authorization: `Bearer ${token}`,
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
