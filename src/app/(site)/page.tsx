import Image from "next/image";
//Secciones
import Hero from "@/components/home/Hero"
import QuoteSection from "@/components/home/QuoteSection";
import TechStackCarousel from "@/components/home/StackCarousel";
import ServicesSection from "@/components/home/ServicesSection";
import ClientesSection from "@/components/home/ClientesSection";
import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@components/home/ContactSection";
export default function Home() {
  return (
<div className="items-center justify-center  font-sans ">
      <main className="">
        <section className="hero-inicio">
          <Hero></Hero>
        </section>
        <section className="QuoteSite">
          <QuoteSection></QuoteSection>
        </section>
        <section className="StackCarousel">
          <TechStackCarousel></TechStackCarousel>
        </section>
        <section className="ServicesSite">
          <ServicesSection></ServicesSection>
        </section>
        <ClientesSection></ClientesSection>
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
