import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Work } from "@/components/Work";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { LiveDemo } from "@/components/LiveDemo";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { RealtimeProvider } from "@/components/RealtimeProvider";

export default function Home() {
  return (
    <RealtimeProvider>
      <Nav />
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Work />
        <ArchitectureDiagram />
        <LiveDemo />
        <Contact />
      </main>
      <Footer />
    </RealtimeProvider>
  );
}
