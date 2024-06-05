// pages/about-us.tsx

import { Facebook, Twitter, Instagram } from "lucide-react";
import Image from "next/image";

const AboutUsPage: React.FC = () => {
  // Fake team member information
  const teamMembers = [
    {
      name: "John Doe",
      position: "CEO",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "/team/john.jpg",
      socialMedia: {
        twitter: "https://twitter.com/johndoe",
        linkedin: "https://linkedin.com/johndoe",
      },
    },
    {
      name: "Jane Smith",
      position: "CTO",
      bio: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      imageUrl: "/team/jane.jpg",
      socialMedia: {
        twitter: "https://twitter.com/janesmith",
        linkedin: "https://linkedin.com/janesmith",
      },
    },
    {
      name: "Alex Johnson",
      position: "Lead Developer",
      bio: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      imageUrl: "/team/alex.jpg",
      socialMedia: {
        twitter: "https://twitter.com/alexjohnson",
        linkedin: "https://linkedin.com/alexjohnson",
      },
    },
  ];

  return (
    <div className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">About Us</h1>
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Mission Statement</h2>
          <p className="text-gray-700">
            Our mission is to connect blood donors with those in need, saving
            lives and making a difference in our communities.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Team Information</h2>
          {teamMembers.map((member, index) => (
            <div key={index} className="mb-4 flex items-center">
              <Image
                height={40}
                width={40}
                src={member.imageUrl}
                alt={member.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="font-bold">{member.name}</p>
                <p className="text-gray-700">{member.position}</p>
                <p className="text-gray-600">{member.bio}</p>
                <div className="flex mt-2">
                  {member.socialMedia.twitter && (
                    <a
                      href={member.socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-blue-500 mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 0a10 10 0 0 0-3.16 19.49v-6.97H4.02v6.98H.49V0h3.53v5.22h2.32V0h3.52zM6.34 0v19.49H2.82V0h3.52z" />
                      </svg>
                    </a>
                  )}
                  {member.socialMedia.linkedin && (
                    <a
                      href={member.socialMedia.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-blue-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 0a10 10 0 0 0-3.16 19.49v-6.97H4.02v6.98H.49V0h3.53v5.22h2.32V0h3.52zM6.34 0v19.49H2.82V0h3.52z"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Contact Information</h2>
          <p className="text-gray-700">
            For inquiries, please reach out to us via email or phone. You can
            also connect with us on social media.
          </p>
          <p>Email: example@example.com</p>
          <p>Phone: 123-456-7890</p>
          <div className="flex items-center mt-4">
            <p className="mr-2">Follow us:</p>
            {/* Social media links */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-500 mr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0a10 10 0 0 0-3.16 19.49v-6.97H4.02v6.98H.49V0h3.53v5.22h2.32V0h3.52zM6.34 0v19.49H2.82V0h3.52z"
                />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-500 mr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 0a10 10 0 0 0-3.16 19.49v-6.97H4.02v6.98H.49V0h3.53v5.22h2.32V0h3.52zM6.34 0v19.49H2.82V0h3.52z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0a10 10 0 0 0-3.16 19.49v-6.97H4.02v6.98H.49V0h3.53v5.22h2.32V0h3.52zM6.34 0v19.49H2.82V0h3.52z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
