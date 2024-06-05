"use client";
import { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import { getFromLocalStorage } from "@/utils/local-storage";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = getFromLocalStorage("accessToken");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("https://blood-donor-backend.vercel.app/api/my-profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });

        const data = await response.json();

        setProfileData(data?.data);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <div>{profileData && <ProfileCard profile={profileData} />}</div>;
};

export default ProfilePage;
