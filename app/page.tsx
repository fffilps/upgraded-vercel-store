import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify and Sanity.',
  openGraph: {
    type: 'website'
  }
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden bg-gray-100">
        <Image
          src="/hero-image.jpg" // Make sure to add your hero image
          alt="Fashion hero image"
          className="object-cover"
          fill
          priority
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto max-w-4xl">
            <h1 className="font-serif text-3xl font-light leading-relaxed tracking-wide md:text-4xl lg:text-5xl">
              Discover our latest collection – Signature styles crafted with precision and elegance
            </h1>
            <Link 
              href="/search"
              className="mt-6 inline-flex rounded-none border border-white bg-transparent px-8 py-6 text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-16">
        <ThreeItemGrid />
      </section>

      {/* Carousel Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4">
          <h2 className="text-2xl font-light mb-8">Featured Collections</h2>
          <Carousel />
        </div>
      </section>

      <Footer />
    </div>
  );
}
