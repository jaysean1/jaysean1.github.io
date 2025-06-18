import Hero from '@/components/sections/Hero';
import ProductVideos from '@/components/sections/ProductVideos';
import Projects from '@/components/sections/Projects';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';
import Testimonials from '@/components/sections/Testimonials';

export default function Home() {
  return (
    <>
      <Hero />
      <ProductVideos />
      <Projects />
      <About />
      <Experience />
      <Contact />
      <Testimonials />
    </>
  );
}