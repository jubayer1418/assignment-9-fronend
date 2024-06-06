"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter, useSearchParams } from "next/navigation";
import { getFromLocalStorage } from "@/utils/local-storage";
import { toast } from "sonner";
import { useAuth } from "@/utils/useAuth";

const formSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." }),
  hospitalName: z
    .string()
    .min(4, { message: "Hospital name must be at least 4 characters." }),
  hospitalAddress: z
    .string()
    .min(2, { message: "Hospital address must be at least 2 characters." }),
  reason: z
    .string()
    .min(2, { message: "Reason must be at least 2 characters." }),
  dateOfDonation: z.string().min(1, { message: "Date is required." }),
  time: z.string().min(1, { message: "Time is required." }),
  additionalInfo: z.string().optional(),
  termsAgreed: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
});
type FormSchema = z.infer<typeof formSchema>;

export default function BloodRequestPage() {
  const { auth } = useAuth();
  const params = useSearchParams();
  const router = useRouter();

  if (!auth) {
    router.push("/login");
    return null; // Prevent rendering while redirecting
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hospitalName: "",
      dateOfDonation: "",
      time: "",
      additionalInfo: "",
      termsAgreed: false,
      hospitalAddress: "",
      reason: "",
      phoneNumber: "",
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    const donorId = params.get("id");
    const token = getFromLocalStorage("accessToken");

    try {
      const toastId = toast.loading("loading...");
      const response = await fetch(
        "https://blood-donor-backend.vercel.app/api/donation-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({ donorId, ...data }),
        }
      );

      const res = await response.json();
      if (res.success) {
        toast.success("Blood request successfully!", {
          id: toastId,
        });
        reset();
        router.push("/dashboard");
      } else {
        toast.error(res.errorDetails.meta.target[0], {
          id: toastId,
        });
      }
    } catch (err) {
      toast.error("globa error");
    }
  };

  return (
    <div className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Blood Request Form</h1>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={control}
              name="hospitalName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hospital Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Hospital Name" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500">
                    {errors.hospitalName?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="hospitalAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hospital Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Hospital Address" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500">
                    {errors.hospitalAddress?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="01XXXXXXXXX" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500">
                    {errors.phoneNumber?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Reason for donation" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500">
                    {errors.reason?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="dateOfDonation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Needed</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500">
                    {errors.dateOfDonation?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500">
                    {errors.time?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Information</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional information"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500">
                    {errors.additionalInfo?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="termsAgreed"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>I agree to the terms and conditions</FormLabel>
                  <FormMessage className="text-red-500">
                    {errors.termsAgreed?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <Button variant={"outline"} type="submit">
              Submit Request
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
