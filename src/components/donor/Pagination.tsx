"use client";
import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationDemoProps {
  page: number;
 
}

const PaginationDemo: React.FC<PaginationDemoProps> = ({ page }) => {

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
         {page > 0 &&  <PaginationPrevious href={`/donors?page=${page - 1}`}  />}
        </PaginationItem>

        <PaginationItem>
      <PaginationNext href={`/donors?page=${Number(page) + 1}`} />
       
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationDemo;
