import Image from "next/image";
//Secciones
import Hero from "@/components/home/Hero"
import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@components/home/ContactSection";
export default function Home() {
  return (
<div className="items-center justify-center  font-sans ">
      <main className="">
        <section className="hero-inicio">
          <Hero></Hero>
        </section>
        <section className="AboutSite">
          <AboutSection></AboutSection>
        </section>
        <section className="Work">

        </section>
        <section className="ContactMe">
          <ContactSection></ContactSection>
        </section>
      </main>
    </div>
  );
}
