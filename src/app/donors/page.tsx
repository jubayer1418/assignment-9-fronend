import { useState, useEffect } from "react";

import Pagination from "@/components/donor/Pagination";
import { Donor } from "@/type";
import { DonorCard } from "@/components/donor/DonorCart";
import FilterDonor from "@/components/donor/FilterDonor";
import SearchBloodDonors from "@/components/BloodDonors/SearchBloodDonors";

const DonorList = async ({ searchParams }: any) => {
  console.log(searchParams);
  const page = searchParams.page || 1;
  // const [bloodType, setBloodType] = useState("");
  // const [location, setLocation] = useState("");
  // const [availability, setAvailability] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  // const [filteredDonors, setFilteredDonors] = useState<Donor[]>([]);
  // const donorsPerPage = 10;

  // const indexOfLastDonor = currentPage * donorsPerPage;
  // const indexOfFirstDonor = indexOfLastDonor - donorsPerPage;
  // const currentDonors = filteredDonors.slice(
  //   indexOfFirstDonor,
  //   indexOfLastDonor
  // );

  // const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const res = await fetch(`https://blood-donor-backend.vercel.app/api/donor-list?page=${page}&limit=${10}`);
  const { data } = await res.json();
  return (
    <section className="">
      <SearchBloodDonors initialDonors={data} />
      <Pagination page={page} />
    </section>
  );
};

export default DonorList;
