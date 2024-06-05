import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PresentationIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


interface TeamMemberCardProps {
  name: string;
  role: string;
  imageUrl: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name,
  role,
  imageUrl,
}) => {
  return (
    <Card>
      <CardHeader className="pb-4 flex-row items-center gap-4">
        <div className="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full">
          <Avatar className="w-20 h-20">
            <AvatarImage  src={imageUrl} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle>{name}</CardTitle>
        {role}
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
