import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";

import Hero from "./components/sections/Hero/Hero";
import Bio from "./components/sections/Bio/Bio";
import Multimedia from "./components/sections/Multimedia/Multimedia";
import Press from "./components/sections/Press/Press";
import Dates from "./components/sections/Dates/Dates";
import Contact from "./components/sections/Contact/Contact";

import "./styles/globals.css";

export default function App() {
  return (
    <>
       <Header />

      <main>
        <section id="inicio">
          <Hero />
        </section>

        <section id="bio">
          <Bio />
        </section>

       
          <Multimedia />
   

        
          <Press />
     

        <section id="fechas">
          <Dates />
        </section>

        <section id="contacto">
          <Contact />
        </section>
      </main>

      <Footer />
    </>
  );
}
