"use client";
import Image from "next/image";
import { DonorCard } from "../donor/DonorCart";
import { useState } from "react";
import FilterDonor from "../donor/FilterDonor";
import { Donor } from "@/type";
import { Search } from "lucide-react";
import Heading from "../common/Heading";
import LoadingSpinner from "../LoadingSpiner";

interface DonorsPageProps {
  initialDonors: Donor[];
}

const SearchBloodDonors = ({ initialDonors }: DonorsPageProps) => {
  const [donors, setDonors] = useState(initialDonors);
  const [bloodType, setBloodType] = useState("");
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFilterChange = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://blood-donor-backend.vercel.app/api/donor-list?bloodType=${bloodType}&searchTerm=${location}&availability=${availability}`,
        {
          cache: "no-cache",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch donors");
      }
      const filteredDonors = await res.json();

      setDonors(filteredDonors.data);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-10 container">
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

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {donors?.slice(0, 10).map((donor: any) => (
            <DonorCard donor={donor} key={donor.id} />
          ))}
        </div>
      )}
    </section>
  );
};

export default SearchBloodDonors;
