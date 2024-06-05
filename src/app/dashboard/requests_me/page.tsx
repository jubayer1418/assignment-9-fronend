"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getFromLocalStorage } from "@/utils/local-storage";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Sample API URLs
const FETCH_API_URL = "https://blood-donor-backend.vercel.app/api/donation-request-me";

const BloodRequestsTable = () => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [requests, setRequests] = useState<any>([]);
  console.log(requests);
  const token = getFromLocalStorage("accessToken");
  useEffect(() => {
    // Fetch initial blood requests from API
    const fetchBloodRequests = async () => {
      try {
        const response = await fetch(FETCH_API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`, // Added Bearer before token
          },
        });
        const data = await response.json();
        setRequests(data?.data);
      } catch (error) {
        console.error("Error fetching blood requests:", error);
      }
    };

    fetchBloodRequests();
  }, [token, isDrawerOpen]);

  const handleStatusChange = (index:any, newStatus:any) => {
    const updatedRequests = [...requests];
    updatedRequests[index].status = newStatus;
    setRequests(updatedRequests);
  };

  const handleUpdateClick = async (index:any) => {
    const updatedRequest = requests[index];
    console.log(updatedRequest);
    try {
      const response = await fetch(`${"https://blood-donor-backend.vercel.app/api/donation-request"}/${updatedRequest?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`, // Added Bearer before token
        },
        body: JSON.stringify({
          status: updatedRequest.status,
        }),
      });
      console.log(response)
      if (response.ok) {
        const result = await response.json();
        console.log(result);

        window.location.reload();
        console.log("Update successful:", result);
        // Optionally, update the state with the result
      } else {
        console.error("Error updating request:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };
  const handleAccept = (index:any) => {
    const updatedRequests = [...requests];
    updatedRequests[index].status = "APPROVED";
    setRequests(updatedRequests);
    handleUpdateClick(index);
    toast.success("APPROVED successfully!");
  };
  const handleReject = (index:any) => {
    const updatedRequests = [...requests];
    updatedRequests[index].status = "REJECTED";
    setRequests(updatedRequests);
    handleUpdateClick(index);
    toast.success("REJECTED successfully!");
  };
  const handleInfo = (index:any) => {
    const updatedRequest = requests[index];

    setRequests([updatedRequest]);
    setIsDrawerOpen(true);
  };

  return (
    <Table>
      <TableCaption>List of Blood Requests Made by the User</TableCaption>

      <TableRow>
        <TableHead>Donors Name</TableHead>
        <TableHead>Blood Type</TableHead>
        <TableHead>Status of the Request</TableHead>
        <TableHead>Contact Information (if approved)</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>

      <TableBody>
        {requests.map((request:any, index:any) => (
          <TableRow key={index}>
            <TableCell>{request?.donor?.name}</TableCell>
            <TableCell>{request?.donor?.bloodType}</TableCell>
            <TableCell>
              <Select
                onValueChange={(value) => handleStatusChange(index, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={request?.requestStatus} />
                </SelectTrigger>
              </Select>
            </TableCell>
            <TableCell>
              {request.requestStatus === "APPROVED" ? (
                <>
                  <Button variant={"outline"} onClick={() => handleInfo(index)}>
                    Information
                  </Button>
                  <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                    <DrawerContent >
                      <DrawerHeader>
                        <DrawerTitle>Contact Information</DrawerTitle>
                      </DrawerHeader>
                      <DrawerDescription className="w-1/2 mx-auto">
                        <p className="flex items-center gap-4">
                          <strong className="font-bold text-2xl py-4">
                            Name:
                          </strong>
                          <h1 className="text-xl text-red-400">
                            {request.requester.name}
                          </h1>
                        </p>
                        <p className="flex items-center gap-4">
                          <strong className="font-bold text-2xl py-4">
                            Email:
                          </strong>
                          <h1 className="text-xl text-red-400">
                            {request.requester.email}
                          </h1>
                        </p>
                        <p className="flex items-center gap-4">
                          <strong className="font-bold text-2xl py-4">
                            HospitalName:
                          </strong>
                          <h1 className="text-xl text-red-400">
                            {request.hospitalName}
                          </h1>
                        </p>

                        <p className="flex items-center gap-4">
                          <strong className="font-bold text-2xl py-4">
                            HospitalAddress:
                          </strong>
                          <h1 className="text-xl text-red-400">
                            {request.hospitalAddress}
                          </h1>
                        </p>

                        <p className="flex items-center gap-4">
                          <strong className="font-bold text-2xl py-4">
                            Reason:
                          </strong>
                          <h1 className="text-xl text-red-400">
                            {request.reason}
                          </h1>
                        </p>
                        <p className="flex items-center gap-4">
                          <strong className="font-bold text-2xl py-4">
                            Time:
                          </strong>
                          <h1 className="text-xl text-red-400">
                            {request.time}
                          </h1>
                        </p>
                        <p className="flex items-center gap-4">
                          <strong className="font-bold text-2xl py-4">
                            AdditionalInfo:
                          </strong>
                          <h1 className="text-xl text-red-400">
                            {request.additionalInfo}
                          </h1>
                        </p>

                        <p className="flex items-center gap-4">
                          <strong className="font-bold text-2xl py-4">
                            PhoneNumber:
                          </strong>
                          <h1 className="text-xl text-red-400">
                            {request.requester.phoneNumber}
                          </h1>
                        </p>
                      </DrawerDescription>
                      <DrawerFooter>
                        <Button
                          variant={"outline"}
                          onClick={() => setIsDrawerOpen(false)}
                        >
                          Close
                        </Button>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </>
              ) : (
                "N/A"
              )}
            </TableCell>
            <TableCell>
              <Button
                variant={"outline"}
                className="mr-4"
                onClick={() => handleAccept(index)}
              >
                Accept
              </Button>
              <Button onClick={() => handleReject(index)}>Reject</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BloodRequestsTable;
