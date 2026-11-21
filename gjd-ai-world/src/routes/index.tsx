import { createFileRoute } from "@tanstack/react-router";
import { CoverBackground } from "@/components/portfolio/CoverBackground";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About, Achievements, Journey, Projects, Services, Skills } from "@/components/portfolio/Sections";
import { Contact, Footer } from "@/components/portfolio/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GJD_AI_World – Gaddangi Jaman Dora | Aspiring FDE & Full-Stack Developer" },
      { name: "description", content: "Portfolio of Gaddangi Jaman Dora, an aspiring Forward Deployed Engineer and Full-Stack Developer from Paderu, Andhra Pradesh." },
      { property: "og:title", content: "GJD_AI_World – Gaddangi Jaman Dora" },
      { property: "og:description", content: "Turn Ideas into Applications. Turn Applications into Impact. Aspiring FDE & Full-Stack Developer portfolio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <CoverBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Achievements />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
