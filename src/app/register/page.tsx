"use client";

import Image from "next/image";

import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import BDForm from "@/components/Forms/BDForm";
import BDInput from "@/components/Forms/BDInput";
import logo from "@/assets/logo.png";

import { toast } from "sonner";
import { storeUserInfo } from "@/services/auth.services";
import { register, userLogin } from "@/services/actions/registerUser";
import BDSelect from "@/components/Forms/BDSelect";
import { useAuth } from "@/utils/useAuth";
import { defaultValues, validationSchemaRegister } from "@/utils/validation/validationSchema";




const RegisterPage = () => {
  const router = useRouter();
  const { setAuth, auth } = useAuth();
  if (auth) router.push("/");
  const handleRegister = async (values: FieldValues) => {
    try {
      const res = await register(values);

      if (res?.data?.id) {
        toast.success(res?.message);
        const result = await userLogin({
          password: values.password,
          email: values.bloodDoner.email,
        });

        if (result?.data?.accessToken) {
          setAuth(res?.data?.accessToken);
          storeUserInfo({ accessToken: result?.data?.accessToken });
          toast.success("User Login successfully");
          window.location.reload();
          router.push("/");
        }
      } else {
        toast.error("Please provide Name and Email unique!");
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="container mx-auto h-screen flex justify-center items-center">
      <div className="max-w-sm w-full shadow-md rounded p-4 text-center">
        <div className="flex gap-3 justify-center items-center">
          <div>
            <Image src={logo} width={150} height={150} alt="logo" />
            <h6 className="font-bold text-xl text-gradient mt-4">Register</h6>
          </div>
        </div>

        <div>
          <BDForm
            onSubmit={handleRegister}
            resolver={zodResolver(validationSchemaRegister)}
            defaultValues={defaultValues}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 my-1">
              <div className="md:col-span-2">
                <BDInput label="Name" fullWidth={true} name="bloodDoner.name" />
              </div>
              <div className="md:col-span-2">
                <BDInput
                  label="Email"
                  type="email"
                  fullWidth={true}
                  name="bloodDoner.email"
                />
              </div>
              <div className="md:col-span-2">
                <BDInput
                  label="Password"
                  type="password"
                  fullWidth={true}
                  name="password"
                />
              </div>
              <div>
                <BDInput
                  label="Location"
                  type="tel"
                  fullWidth={true}
                  name="bloodDoner.location"
                />
              </div>
              <div>
                <BDSelect
                  label="BloodType"
                  items={[
                    "A_POSITIVE",
                    "A_NEGATIVE",
                    "B_POSITIVE",
                    "B_NEGATIVE",
                    "AB_POSITIVE",
                    "AB_NEGATIVE",
                    "O_POSITIVE",
                    "O_NEGATIVE",
                  ]}
                  name="bloodDoner.bloodType"
                />
              </div>
              <div className="md:col-span-2">
                <BDInput
                  label="Can Donate Blood?"
                  type="checkbox"
                  fullWidth={true}
                  name="bloodDoner.canDonateBlood"
                />
              </div>
            </div>
            <Button
              className="mt-4 w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Register
            </Button>
            <p className="mt-2 text-sm">
              Do you already have an account?{" "}
              <Link className="text-red-500 underline" href="/login">
                Login
              </Link>
            </p>
          </BDForm>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
