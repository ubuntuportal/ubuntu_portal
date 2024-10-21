import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const img = [
  { img: "/img/image.png" },
  { img: "/img/image.png" },
  { img: "/img/image.png" },
  { img: "/img/image.png" },
  { img: "/img/image.png" },
  { img: "/img/image.png" },
  { img: "/img/image.png" },
];

export function CarouselSize() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent className="">
        {img.map((img, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="w-24 h-24">
                <CardContent className="flex aspect-square items-center justify-center p-3">
                  <Image src={img.img} alt="imag" width={70} height={30} />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
