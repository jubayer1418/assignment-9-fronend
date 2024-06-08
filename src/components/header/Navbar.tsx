"use client";
import Link from "next/link";
import Logo from "./Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

import { useAuth } from "@/utils/useAuth";
import { removeFromLocalStorage } from "@/utils/local-storage";
import { ModeToggle } from "./theme";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { auth: isLoggedIn, setAuth } = useAuth();
  const router = useRouter();

  const handleLogout: any = () => {
    removeFromLocalStorage("accessToken");
    setAuth(null);
    router.push("/login");
  };
  return (
    <div className={"sticky top-0 w-full bg-background z-10"}>
      <nav className="flex justify-between  items-center p-4 container  ">
        <Logo />

        <div className="space-x-4 flex items-center">
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href={"/dashboard/profile"}>
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link className="text-gradient hover:underline" href="/login">
              Login/Register
            </Link>
          )}
          <ModeToggle />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
