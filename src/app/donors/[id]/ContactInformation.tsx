"use client";
import { CardContent } from "@/components/ui/card";
import { useAuth } from "@/utils/useAuth";

const ContactInformation = ({email,phoneNumber}:{email:string,phoneNumber:string}) => {
  const { auth } = useAuth();
  return (
    <>
      {auth && (
        <CardContent>
          <p className="text-white">Contact Details:</p>
          <ul className="text-white">
            <li>Email: {email}</li>
            <li>Phone: {phoneNumber || "01XXXXXXXXXXX"}</li>
          </ul>
        </CardContent>
      )}
    </>
  );
};

export default ContactInformation;
