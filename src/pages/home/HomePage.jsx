import Hero from "./Hero";
import Overview from "./Overview";
import AboutSection from "../about/AboutSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Overview />
      <AboutSection showLink />
    </>
  );
}
