import { MainLayout } from "@/main-layout";
import ChatPage from "@/pages/chat-page";
import MainPage from "@/pages/main-page";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<MainLayout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Route>
    </Route>
  )
);

export default router;
