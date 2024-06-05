"use client";
import Image from "next/image";
import { DonorCard } from "../donor/DonorCart";
import { useState } from "react";
import FilterDonor from "../donor/FilterDonor";
import { Donor } from "@/type";
import { Search } from "lucide-react";
import Heading from "../common/Heading";

interface DonorsPageProps {
  initialDonors: Donor[];
}

const SearchBloodDonors = ({ initialDonors }: DonorsPageProps) => {
  const [donors, setDonors] = useState(initialDonors);
  const [bloodType, setBloodType] = useState("");
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("");

  const handleFilterChange = async () => {
    const res = await fetch(
      `https://blood-donor-backend.vercel.app/api/donor-list?bloodType=${bloodType}&searchTerm=${location}&availability=${availability}`
    );
    const filteredDonors = await res.json();

    setDonors(filteredDonors.data);
  };
  return (
    <section className="pt-10 container ">
      <Heading>Search Blood Donors</Heading>
      <FilterDonor
        bloodType={bloodType}
        setBloodType={setBloodType}
        setAvailability={setAvailability}
        availability={availability}
        location={location}
        setLocation={setLocation}
        handleFilterChange={handleFilterChange}
      />

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {donors?.slice(0, 10).map((donor: any) => (
          <DonorCard donor={donor} key={donor.id} />
        ))}
      </div>
    </section>
  );
};

export default SearchBloodDonors;
