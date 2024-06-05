"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { successStories } from "@/data/successStories";
import Image from "next/image";
import { useEffect, useState } from "react";
import Heading from "../common/Heading";
export function SuccessStories() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="   container">
     <Heading>Success Stories</Heading>
      <div className="w-full max-w-lg mx-auto">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {successStories.map((story) => (
              <CarouselItem key={story.id}>
                <Card >
                  <Image
                  width={600}
                  height={600}
                    src={story.imageUrl}
                    alt={story.name}
                   className="h-96 object-cover object-top"
                  />
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold">{story.name}</h3>
                    <p className="text-gray-600">{story.story}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="py-2 text-center text-sm text-muted-foreground">
          Slide {current} of {count}
        </div>
      </div>
    </section>
  );
}
