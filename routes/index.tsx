// routes/index.tsx (o home.tsx)
import { Head } from "fresh/runtime";
import { define } from "@/utils.ts"; // Importamos tu herramienta de definición
import Hero from "@/components/home/Hero.tsx";
import AboutSection from "@/components/home/AboutSections.tsx";
import PrizesSection from "@/components/home/PrizeSection.tsx";

export default define.page(function Home() {
  return (
    <>
      <Head>
        <title>BTOQ | Inicio</title>
        <meta name="description" content="Torneo de SoloQueue BTOQ" />
      </Head>

      <Hero />
      <AboutSection />
      <PrizesSection />
    </>
  );
});