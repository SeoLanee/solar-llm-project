import Footer from "@/components/shared/footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex justify-center w-full">
      <div className="w-[64rem]">{children}</div>
      <Footer />
    </div>
  );
};
