"use client";

import React, { useState } from "react";
import { CalendarIcon, PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getFromLocalStorage } from "@/utils/local-storage";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  bio: z.string().optional(),
  age: z.string().optional(),
  lastDonationDate: z.date().optional(),
  photoUrl: z.string().optional(),
  availability: z.boolean().optional(),
});
const ProfileCard = ({ profile }: any) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: profile.name,
      email: profile.email,
      bio: profile.userProfile.bio,
      age: Number(profile.userProfile.age),
      lastDonationDate: new Date(profile.userProfile.lastDonationDate),
      photoUrl: profile.userProfile.photoUrl,
      availability: profile.availability,
    },
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const onSubmit = async (data: any) => {
    console.log(data);

    const id = toast.loading("loading...");
    const userProfilePayload = {
      bio: data.bio,
      age: Number(data.age),
      lastDonationDate: data.lastDonationDate,
      photoUrl: data.photoUrl,
    };
    const userPayload = {
      name: data.name,
      email: data.email,
      availability: data.availability,
    };
    const token = getFromLocalStorage("accessToken");

    try {
      const response = await fetch("https://blood-donor-backend.vercel.app/api/my-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },

        body: JSON.stringify({
          userProfilePayload,
          userPayload,
        }),
      });

      const result = await response.json();

      if (result.success) {
        window.location.reload();
        toast.success(result.message, { id });
        toggleDrawer();
      } else {
        toast.error(`${result.errorDetails.meta.target[0]} is already exist`, {
          id,
        });
      }
    } catch (error) {
      toast.error("global error", {
        id,
      });
    }
  };

  return (
    <div className=" flex overflow-hidden shadow-lg relative">
      <Image
        width={200}
        height={200}
        className=" rounded-full h-48 w-48 object-cover"
        src={
          profile.userProfile.photoUrl ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTletHMMAeD3u6Zjjm-hE-GBMozn572CfwMvg&s"
        }
        alt="Profile"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 flex justify-between items-center">
          {profile.name}
        </div>
        <p className=" text-base">{profile.userProfile.bio}</p>
      </div>
      <div className="px-6 pt-4 pb-2 flex gap-10">
        <div>
          <p className="">
            <strong>Email:</strong> {profile.email}
          </p>
          <p className="">
            <strong>Last Donation Date:</strong>
            {new Date(profile.userProfile.lastDonationDate).getUTCDate()}
            {"-"}
            {new Date(profile.userProfile.lastDonationDate).getUTCMonth()}
            {"-"}
            {new Date(profile.userProfile.lastDonationDate).getUTCFullYear()}
          </p>
          <p className="">
            <strong>Availability:</strong>
            {profile.availability ? "Available" : "Not Available"}
          </p>
          <p className="">
            <strong>Age:</strong> {profile.userProfile.age}
          </p>
        </div>
        <div>
          <Button onClick={toggleDrawer} className="flex items-center">
            <PencilIcon className="h-6 w-6  mr-2" />
            Edit
          </Button>
        </div>
      </div>

      <Drawer open={isDrawerOpen} onClose={toggleDrawer}>
        <DrawerContent>
          <DrawerClose onClick={toggleDrawer} />
          <DrawerHeader className="flex justify-between">
            <DrawerTitle>Edit Profile</DrawerTitle>
            <DrawerDescription>
              Update your profile information below.
            </DrawerDescription>
            <Button onClick={toggleDrawer} className="w-20">
              Cancel
            </Button>
          </DrawerHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="container">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        defaultValue={profile.name}
                        placeholder="Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
                        defaultValue={profile.email}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Bio"
                        defaultValue={profile.userProfile.bio}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Age"
                        defaultValue={Number(profile.userProfile.age)}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastDonationDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col pt-4">
                    <FormLabel>last Donation Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>last Donation Date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="photoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Photo URL</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="Photo URL"
                        defaultValue={profile.userProfile.photoUrl}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Availability</FormLabel>
                    <FormControl>
                      <Checkbox
                        className=""
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-1/4 mt-6  mb-14" type="submit">
                Save Changes
              </Button>
            </form>
          </Form>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ProfileCard;
