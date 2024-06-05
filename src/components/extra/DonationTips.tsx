"use client";
import { useState } from "react";
import Heading from "../common/Heading";

interface Tip {
  title: string;
  content: string;
}

const tips: Tip[] = [
  {
    title: "Stay Hydrated",
    content:
      "Ensure you are well-hydrated before donating blood. Drink plenty of water and avoid caffeinated beverages.",
  },
  {
    title: "Healthy Meal",
    content:
      "Have a healthy meal before your donation. Avoid fatty foods as they can affect the tests performed on your blood.",
  },
  {
    title: "Comfortable Clothing",
    content:
      "Wear comfortable clothing with sleeves that can be easily rolled up above the elbow.",
  },
  {
    title: "Valid ID",
    content:
      "Bring a valid ID with you to the donation site. This is necessary for verification purposes.",
  },
  {
    title: "Post-Donation Care",
    content:
      "Avoid heavy lifting or strenuous activity for at least 24 hours after donating. Drink plenty of fluids and have a snack.",
  },
];

const DonationTips = () => {
  const [activeTipIndex, setActiveTipIndex] = useState<number | null>(null);

  const toggleTip = (index: number) => {
    setActiveTipIndex(activeTipIndex === index ? null : index);
  };

  return (
    <section className=" container my-10 shadow-sm ">
      <Heading>Donation Tips</Heading>
      <div className="mt-8 space-y-4 max-w-2xl mx-auto">
        {tips.map((tip, index) => (
          <div key={index} className=" p-4 rounded-lg shadow-md">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleTip(index)}
            >
              <h3 className="text-lg font-semibold">{tip.title}</h3>
              <span>{activeTipIndex === index ? "-" : "+"}</span>
            </div>
            {activeTipIndex === index && <p className="mt-2">{tip.content}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default DonationTips;
