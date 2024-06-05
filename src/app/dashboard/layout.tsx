"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";
import SideNavbar from "@/components/dashboard/SideNavbar";
import { useAuth } from "@/utils/useAuth";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { auth } = useAuth();

  return (
    <>
      {auth && (
        <div
          className={cn(
            "min-h-screen w-full  flex ",
            inter.className,
            {
              "debug-screens": process.env.NODE_ENV === "development",
            }
          )}
        >
          <SideNavbar />

          <div className="p-8 w-full">{children}</div>
        </div>
      )}
    </>
  );
}
