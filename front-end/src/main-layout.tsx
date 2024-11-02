import Footer from "@/components/shared/footer";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="w-[64rem]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
