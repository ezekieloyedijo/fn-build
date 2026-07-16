import { ScrollProgress } from "@/components/scroll-progress";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FloatingCta } from "@/components/floating-cta";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingCta />
    </>
  );
}
