import Heading from "../common/Heading";
import TeamMemberCard from "./TeamMember";

const TeamSection = () => {
  const teamMembers = [
    { name: "John Doe", role: "Founder & CEO", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3abNRjKu6c55FXFvE7YSewhTa1hGKKYBL_g&sg" },
    {
      name: "Jane Smith",
      role: "Chief Medical Officer",
      imageUrl: "https://as1.ftcdn.net/v2/jpg/02/90/56/38/1000_F_290563830_MCl0UobSKqqgV7wE8KeSOsablqJIUNCg.jpg",
    },
    {
      name: "Mike Johnson",
      role: "Head of Operations",
      imageUrl: "https://t4.ftcdn.net/jpg/01/34/29/31/360_F_134293169_ymHT6Lufl0i94WzyE0NNMyDkiMCH9HWx.jpg",
    },
    {
      name: "Jubayer",
      role: "Head of Operations",
      imageUrl: "https://cdn3d.iconscout.com/3d/premium/preview/doctor-avatar-10107433-8179550.png?f=webp&h=700",
    },

  ];

  return (
    <section className="container">
      <Heading>Meet Our Team</Heading>

      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-8">
        {teamMembers.map((member) => (
          <TeamMemberCard
            key={member.name}
            name={member.name}
            role={member.role}
            imageUrl={member.imageUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
