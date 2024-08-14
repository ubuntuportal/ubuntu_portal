import { Button } from '@/components/ui/button';
import React from 'react';

function HeroSection() {
  return (
    <section className="bg-cover bg-center bg-no-repeat bg-[url('../public/HeroImage.png')]">
      <div className="bg-black/10">
        <div className="max-w-screen-xl mx-auto px-8 h-[580px] flex items-center">
          <div className="max-w-screen-sm px-4">
            <a
              href="#"
              className="text-xs text-white bg-amber-500/50 px-2 rounded-full"
            >
              Lorem ipsum, dolor sit amet consectetur
            </a>
            <p className="mt-2 text-white text-3xl font-bold text-pretty md:text-4xl">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem
              ipsum
            </p>
            <p className="max-w-[500px] text-sm text-white mt-4">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem
              ipsum sit amet consectetur adipisicing elit.
            </p>
            <div className="flex mt-8">
              <Button className="bg-green-500 mr-8">Get Start Now</Button>
              <Button className="bg-white text-black">Our Mission</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
