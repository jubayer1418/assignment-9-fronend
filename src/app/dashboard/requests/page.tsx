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
import LoadingSpinner from "@/components/LoadingSpiner";

const FETCH_API_URL = "https://blood-donor-backend.vercel.app/api/donation-request-my";

const BloodRequestsTable = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const token = getFromLocalStorage("accessToken");
console.log(requests)
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
        const data = await response.json();
        setRequests(data?.data || []);
      } catch (error) {
        setError("Error fetching blood requests.");
        console.error("Error fetching blood requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBloodRequests();
  }, [token]);

  const handleStatusChange = (index: number, newStatus: string) => {
    const updatedRequests = [...requests];
    updatedRequests[index].requestStatus = newStatus;
    setRequests(updatedRequests);
  };

  const handleUpdateClick = async (index: number) => {
    const updatedRequest = requests[index];
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${"https://blood-donor-backend.vercel.app/api/donation-request"}/${updatedRequest?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          status: updatedRequest.requestStatus,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        console.log("Update successful:", result);
        window.location.reload(); // Optionally, update the state with the result
      } else {
        setError("Error updating request.");
        console.error("Error updating request:", response.statusText);
      }
    } catch (error) {
      setError("Error updating request.");
      console.error("Error updating request:", error);
    } finally {
      setLoading(false);
    }
  };

  const openDrawer = (request: any) => {
    setSelectedRequest(request);
    setIsDrawerOpen(true);
  };

  return (
    <>
      {loading && <LoadingSpinner/>}
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
            {requests.map((request, index) => (
              <TableRow key={index}>
                <TableCell>{request?.donor?.name}</TableCell>
                <TableCell>{request?.donor?.bloodType}</TableCell>
                <TableCell>
                  <Select
                    value={request?.requestStatus}
                    onValueChange={(value) => handleStatusChange(index, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={request?.requestStatus} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="APPROVED">APPROVED</SelectItem>
                        <SelectItem value="REJECTED">REJECTED</SelectItem>
                        <SelectItem value="PENDING">PENDING</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  {request.requestStatus  === "APPROVED" ? (
                    <>
                      <Button variant="outline" onClick={() => openDrawer(request)}>
                        Information
                      </Button>
                      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                        <DrawerContent className="h-1/2">
                          <DrawerHeader>
                            <DrawerTitle>Contact Information</DrawerTitle>
                          </DrawerHeader>
                          <DrawerDescription className="w-1/2 mx-auto">
                            <p className="flex items-center gap-4">
                              <strong className="font-bold text-2xl py-4">Name:</strong>
                              <h1 className="text-xl text-red-400">{selectedRequest?.requester?.name}</h1>
                            </p>
                            <p className="flex items-center gap-4">
                              <strong className="font-bold text-2xl py-4">Email:</strong>
                              <h1 className="text-xl text-red-400">{selectedRequest?.requester?.email}</h1>
                            </p>
                            <p>
                              <strong>Location: {selectedRequest?.donor?.location || ""}</strong>
                            </p>
                            <p>
                              <strong>Phone: {selectedRequest?.donor?.phoneNumber || "018XXXXXXXX"}</strong>
                            </p>
                          </DrawerDescription>
                          <DrawerFooter>
                            <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>
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
                  <Button onClick={() => handleUpdateClick(index)}>Send</Button>
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
