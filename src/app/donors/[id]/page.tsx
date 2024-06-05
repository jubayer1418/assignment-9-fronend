import Heading from "@/components/common/Heading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Donor } from "@/type";
import Image from "next/image";
import Link from "next/link";
import ContactInformation from "./ContactInformation";

const DonorDetails = async ({ params: { id } }: { params: { id: string } }) => {
  const res = await fetch(`https://blood-donor-backend.vercel.app/api/donor-list/${id}`);
  const { data: donor } = await res.json();
console.log(donor)
  return (
    <>
      <Heading>Donor Details</Heading>
      <Card className="max-w-4xl container w-full mx-auto bg-gradient-to-br from-red-600 to-red-50 rounded-lg shadow-lg overflow-hidden my-4">
        <div className="p-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl font-bold text-white">
                {donor.name}
              </CardTitle>
              {donor.photo && (
                <Image
                  src={donor.photo}
                  alt={`${donor.name}'s photo`}
                  className="w-40 h-40 rounded-full"
                  width={148}
                  height={148}
                />
              )}
            </div>
            <CardDescription className="text-white">
              Blood Type: {donor.bloodType}
            </CardDescription>
            <CardDescription className="text-white">
              Location: {donor.location}
            </CardDescription>
            <CardDescription className="text-white">
              Availability: {donor.availability ? "Available" : "Unavailable"}
            </CardDescription>
          </CardHeader>
          <ContactInformation
            email={donor.email}
            phoneNumber={donor.phoneNumber}
          />

          <CardFooter className="mt-4">
            <Link
              href={{
                pathname: "/blood_request",
                query: {
                  id: donor.id,
                },
              }}
              className="font-bold hover:text-slate-100 animate-pulse  duration-1000"
            >
              <Button variant={"outline"}> Request Contact Details</Button>
            </Link>
          </CardFooter>
        </div>
      </Card>
    </>
  );
};

export default DonorDetails;
