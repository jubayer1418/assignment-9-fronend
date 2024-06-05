"use client";

import { Search } from "lucide-react";

interface FilterDonorProps {
  bloodType: string;
  setBloodType: (value: string) => void;
  setAvailability: (value: string) => void;
  availability: string;
  location: string;
  setLocation: (value: string) => void;
  handleFilterChange:()=>void;
}

const FilterDonor = ({
  bloodType,
  setBloodType,
  setAvailability,
  availability,
  location,
  setLocation,
  handleFilterChange
}: FilterDonorProps) => {
  return (
    <div className="max-w-4xl mx-auto  p-8 rounded-lg shadow-sm shadow-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select
          className="p-2 border border-gray-300 rounded"
          value={bloodType}
          onChange={(e) => setBloodType(e.target.value)}
        >
          <option value="">Select Blood Type</option>
          <option value="A_POSITIVE">A_POSITIVE</option>
          <option value="A_NEGATIVE">A_NEGATIVE</option>
          <option value="B_POSITIVE">B_POSITIVE</option>
          <option value="B_NEGATIVE">B_NEGATIVE</option>
          <option value="AB_POSITIVE">AB_POSITIVE</option>
          <option value="AB_NEGATIVE">AB_NEGATIVE</option>
          <option value="O_POSITIVE">O_POSITIVE</option>
          <option value="O_NEGATIVE">O_NEGATIVE</option>
        </select>
        <input
          type="text"
          placeholder="Location"
          className="p-2 border border-gray-300 rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <select
          className="p-2 border border-gray-300 rounded"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          <option value="">Select Availability</option>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>
      </div>
      <button onClick={handleFilterChange} className="w-full p-2 bg-red-400 text-white rounded flex items-center justify-center">
        <Search className="mr-2" />
        Search
      </button>
    </div>
  );
};

export default FilterDonor;
