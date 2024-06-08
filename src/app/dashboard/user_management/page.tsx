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
import { toast } from "sonner";
import LoadingSpinner from "@/components/LoadingSpiner";


// Sample API URLs
const FETCH_API_URL = "https://blood-donor-backend.vercel.app/api/donor-list";
const UPDATE_API_URL = "https://blood-donor-backend.vercel.app/api/change_role_status";

const BloodRequestsTable = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [requests, setRequests] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch initial blood requests from API
    const fetchBloodRequests = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(FETCH_API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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
  }, []);

  const handleStatusChange = (index: any, newStatus: any) => {
    const updatedRequests = [...requests];
    updatedRequests[index].status = newStatus;
    setRequests(updatedRequests);
  };

  const handleRole = (index: any, newStatus: any) => {
    const updatedRequests = [...requests];
    updatedRequests[index].role = newStatus;
    setRequests(updatedRequests);
  };

  const token = getFromLocalStorage("accessToken");

  const handleUpdateClick = async (index: any) => {
    const updatedRequest = requests[index];
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${UPDATE_API_URL}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          id: updatedRequest.id,
          role: updatedRequest.role,
          status: updatedRequest.status,
        }),
      });
      if (!response.ok) {
        throw new Error("Error updating request");
      }
      const result = await response.json();
      window.location.reload();
      toast.success(result.message);
      console.log("Update successful:", result);
    } catch (error) {
      setError("Error updating request.");
      toast.error("Error updating request");
      console.error("Error updating request:", error);
    } finally {
      setLoading(false);
    }
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
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Roll</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {requests.map((request: any, index: any) => (
              <TableRow key={index}>
                <TableCell>{request.name}</TableCell>
                <TableCell>{request?.email}</TableCell>
                <TableCell>
                  <Select
                    onValueChange={(value) => handleRole(index, value)}
                    defaultValue={request.role}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={"Select Role"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="ADMIN">ADMIN</SelectItem>
                        <SelectItem value="USER">USER</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    onValueChange={(value) => handleStatusChange(index, value)}
                    defaultValue={request.status}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={"Select Status"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="ACTIVATE">ACTIVATE</SelectItem>
                        <SelectItem value="DEACTIVATE">DEACTIVATE</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
