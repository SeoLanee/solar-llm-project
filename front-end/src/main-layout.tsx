import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="w-[48rem]">
        <Outlet />
      </div>
    </div>
  );
};
