import Hero from "@/components/Hero";
import ProblemStatement from "@/components/ProblemStatement";
import Solution from "@/components/Solution";
import Features from "@/components/Features"; // Services Preview
import Experience from "@/components/Experience";
import Recognition from "@/components/Recognition";
import AIPlatformPreview from "@/components/AIPlatformPreview";
import ClientTypes from "@/components/ClientTypes";
import ClosingStatement from "@/components/ClosingStatement";
import ContactForm from "@/components/ContactForm";
import CinematicSection from "@/components/CinematicSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProblemStatement />
      <Solution />
      <Features />
      <Experience />
      <Recognition />
      <AIPlatformPreview />
      <CinematicSection />
      <ClientTypes />
      <ClosingStatement />
      <ContactForm />
    </main>
  );
}
