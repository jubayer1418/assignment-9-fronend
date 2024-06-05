import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Donor } from "@/type";
interface DonorCardProps {
  donor: Donor;
}
export function DonorCard({ donor }: DonorCardProps) {
  return (
    <Card className="max-w-sm  shadow-sm rounded-lg overflow-hidden shadow-slate-900">
      <div className="flex items-center px-6 py-4">
        {donor.photo && (
          <Image
            className="w-16 h-16 rounded-full object-cover mr-4"
            src={donor.photo}
            alt={`${donor.name}`}
            width={48}
            height={48}
          />
        )}
        <div>
          <CardTitle className="text-xl font-bold ">{donor.name}</CardTitle>
          <CardDescription className="">
            Blood Type: {donor.bloodType}
          </CardDescription>
        </div>
      </div>
      <CardContent className="px-6 py-4">
        <p className="">Location: {donor.location}</p>
        <p className="">
          Availability: {donor.availability ? "Available" : "Unavailables"}
        </p>
      </CardContent>
      <CardFooter className="px-6 py-4 flex justify-between items-center">
        <Link
          href={`donors/${donor.id}`}
          className={buttonVariants({
            variant: "outline",
            className: "animate-bounce font-bold text-red-400 duration-1000",
          })}
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
}
