import AboutSection from "@/components/about/AboutSection";
import TeamSection from "@/components/about/TeamSection";

import SearchBloodDonors from "@/components/BloodDonors/SearchBloodDonors";
import DonationTips from "@/components/extra/DonationTips";
import { SuccessStories } from "@/components/extra/SuccessStories";

import Footer from "@/components/footer/Footer";
import Navbar from "@/components/header/Navbar";
import Banner from "@/components/heroSection/Banner";

const HomePage =async () => {
  const res = await fetch(`https://blood-donor-backend.vercel.app/api/donor-list`);
  const initialDonors = await res.json();
  return (
    <div>
     
      <Banner></Banner>
      <AboutSection></AboutSection>
      <TeamSection/>
      <SearchBloodDonors initialDonors={initialDonors.data} />
      <SuccessStories />
      <DonationTips />
      
      
    </div>
  );
};

export default HomePage;
