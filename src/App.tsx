import Header from "./components/Header/Navigation";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import Story from "./components/Story/Story";
import Gallery from "./components/Gallery/Gallery";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import BackToTop from "./components/BackToTop/BackToTop";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Story />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
