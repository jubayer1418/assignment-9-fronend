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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getFromLocalStorage } from "@/utils/local-storage";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpiner";

const FETCH_API_URL = "https://blood-donor-backend.vercel.app/api/donation-request-me";
const UPDATE_API_URL = "https://blood-donor-backend.vercel.app/api/donation-request";



const BloodRequestsTable = () => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [requests, setRequests] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = getFromLocalStorage("accessToken");

  useEffect(() => {
    const fetchBloodRequests = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(FETCH_API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Error fetching blood requests");
        }
        const data = await response.json();
        setRequests(data?.data);
      } catch (error) {
        setError("Error fetching blood requests.");
        console.error("Error fetching blood requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBloodRequests();
  }, [token, isDrawerOpen]);

  const handleStatusChange = (index: any, newStatus: any) => {
    const updatedRequests = [...requests];
    updatedRequests[index].status = newStatus;
    setRequests(updatedRequests);
  };

  const handleUpdateClick = async (index: any) => {
    const updatedRequest = requests[index];
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${UPDATE_API_URL}/${updatedRequest?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          status: updatedRequest.status,
        }),
      });
      if (!response.ok) {
        throw new Error("Error updating request");
      }
      const result = await response.json();
      console.log("Update successful:", result);
      toast.success("Update successful!");
      window.location.reload();
    } catch (error) {
      setError("Error updating request.");
      toast.error("Error updating request");
      console.error("Error updating request:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = (index: any) => {
    const updatedRequests = [...requests];
    updatedRequests[index].status = "APPROVED";
    setRequests(updatedRequests);
    handleUpdateClick(index);
    toast.success("APPROVED successfully!");
  };

  const handleReject = (index: any) => {
    const updatedRequests = [...requests];
    updatedRequests[index].status = "REJECTED";
    setRequests(updatedRequests);
    handleUpdateClick(index);
    toast.success("REJECTED successfully!");
  };

  const handleInfo = (index: any) => {
    const updatedRequest = requests[index];
    setRequests([updatedRequest]);
    setIsDrawerOpen(true);
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <Table>
          <TableCaption>List of Blood Requests Made by the User</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Donors Name</TableHead>
              <TableHead>Blood Type</TableHead>
              <TableHead>Status of the Request</TableHead>
              <TableHead>Contact Information (if approved)</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests?.map((request: any, index: any) => (
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
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="PENDING">PENDING</SelectItem>
                        <SelectItem value="APPROVED">APPROVED</SelectItem>
                        <SelectItem value="REJECTED">REJECTED</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  {request.requestStatus === "APPROVED" ? (
                    <>
                      <Button variant={"outline"} onClick={() => handleInfo(index)}>
                        Information
                      </Button>
                      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                        <DrawerContent>
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
      )}
    </>
  );
};

export default BloodRequestsTable;
