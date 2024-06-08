"use client";

import { useState } from "react";

import { jwtDecode } from "jwt-decode";
type Props = {};

import {
  GitPullRequestDraft,
  LayoutDashboard,
  UsersRound,
  Settings,
  ChevronRight,
  User,
  LucideIcon,
} from "lucide-react";

import { useWindowWidth } from "@react-hook/window-size";
import { Button } from "../ui/button";
import { Nav } from "../ui/nav";
import { useAuth } from "@/utils/useAuth";
export const Links:{
  title: string;
  label?: string | undefined;
  icon: LucideIcon;
  variant: "default" | "ghost";
  href: string;
}[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    variant: "default",
  },

  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: UsersRound,
    variant: "ghost",
  },
  {
    title: "My Blood Requests",
    href: "/dashboard/requests",
    icon: GitPullRequestDraft,
    variant: "ghost",
  },
  {
    title: "Requests for Blood to Me",
    href: "/dashboard/requests_me",
    icon: User,
    variant: "ghost",
  },
  {
    title: "Change Password",
    href: "/dashboard/change_password",
    icon: Settings,
    variant: "ghost",
  },
];
export default function SideNavbar({}: Props) {
  const { auth } = useAuth();
  console.log(auth);
  const decoded: {
    id: string;
    name: string;
    email: string;
    role: string;
    exp: number;
    iat: number;
  } = jwtDecode(auth);

  console.log(decoded);
  if (Links.length == 5 && decoded.role === "ADMIN") {
    Links.push({
      title: "User Management",
      href: "/dashboard/user_management",
      icon: User,
      variant: "ghost",
    });
  }
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="relative min-w-[80px] border-r px-3  pb-10 pt-24 ">
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className=" rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav isCollapsed={mobileWidth ? true : isCollapsed} links={Links} />
    </div>
  );
}
