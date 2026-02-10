import {
  Nav,
  Hero,
  Baseline,
  Coverage,
  Labs,
  Signal,
  Approach,
  Trust,
  Principles,
  CTA,
  FAQ,
  Footer,
} from "@/components/sections";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      {/* All content after Hero needs relative z-10 to sit above the sticky Hero */}
      <div className="relative z-10 bg-ivory">
        <Baseline />
        <Coverage />
        <Labs />
        <Signal />
        <Approach />
        <Trust />
        <Principles />
        <CTA />
        <FAQ />
        <Footer />
      </div>
    </main>
  );
}
