import { z } from "zod";
export const validationSchema = z.object({
  email: z.string().email("Please enter a valid email address!"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
  ,
});

const bloodDonerValidationSchema = z.object({
  name: z.string().min(1, "Please enter your name!"),
  email: z.string().email("Please enter a valid email address!"),
  bloodType: z.string().min(1, "Please enter your bloodType!"),
  location: z.string().min(1, "Please enter your location!"),
  canDonateBlood: z.boolean().optional(),
});
export const validationSchemaRegister = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    ,
  bloodDoner: bloodDonerValidationSchema,
});
export const defaultValues = {
  password: "",

  bloodDoner: {
    name: "",
    email: "",
    bloodType: "",
    location: "",
    canDonateBlood: false,
  },
};
