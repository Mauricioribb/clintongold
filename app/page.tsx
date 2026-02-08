'use client';

import { useEffect } from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import BrandMessage from '../components/BrandMessage';
import Features from '../components/Features';
import Products from '../components/Products';
import About from '../components/About';
import BrandsCarousel from '../components/BrandsCarousel';
import SellCTA from '../components/SellCTA';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Hero />
      <Marquee />
      <BrandMessage />
      <Features />
      <About />
      <Products />
      <BrandsCarousel />
      <SellCTA />
    </Layout>
  );
}
