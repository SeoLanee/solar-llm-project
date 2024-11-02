import { MainLayout } from "@/main-layout";
import Home from "@/pages/home";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Route>
  )
);

export default router;
