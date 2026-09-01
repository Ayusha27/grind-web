import { ReactNode } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

interface PublicLayoutProps {
  children: ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <>
      <Navbar />

      <main
      style={{
      paddingTop: "84px",
             }}
        >
  {children}
</main>

      <Footer />
    </>
  );
};

export default PublicLayout;