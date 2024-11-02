import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/ui/theme-provider.tsx";
import router from "@/router.tsx";
import { RouterProvider } from "react-router-dom";
import TopBar from "./TopBar";

import "@/index.css";
import "@/styles/font.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TopBar />
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
