import { Button, buttonVariants } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";

export default function HeroSectionGradientBackground() {
  return (
    <>
      <div className="relative overflow-hidden h-screen py-24 lg:py-32 hero-background  ">
        <div
          aria-hidden="true"
          className="flex absolute -top-96 start-1/2 transform -translate-x-1/2"
        >
          <div className=" w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]" />
          <div className=" w-[90rem] h-[50rem] rounded-full origin-top-left -rotate-12 -translate-x-[15rem] from-primary-foreground via-primary-foreground to-background" />
        </div>

        <div className="relative z-10">
          <div className="container py-10 lg:py-16">
            <div className="max-w-2xl text-center mx-auto">
              <div className="mt-5 max-w-2xl">
                <h1 className="scroll-m-20 text-3xl  text-gradient font-extrabold text-center tracking-tight lg:text-4xl">
                  Save Lives Donate Blood!
                </h1>
              </div>

              <div className="mt-5 max-w-3xl">
                <p className="text-xl text-muted-foreground ">
                  Our mission is to connect blood donors with those in need,
                  saving lives and improving health outcomes. We are committed
                  to creating a reliable and easy-to-use platform for blood
                  donation.
                </p>
              </div>

              <div className="mt-8 gap-3 flex justify-center">
                <Link
                  href={"/donors"}
                  className={buttonVariants({ variant:"default" })}
                >
                
                  <Search className="mr-2 h-4 w-4" />
                  Search Donors
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
