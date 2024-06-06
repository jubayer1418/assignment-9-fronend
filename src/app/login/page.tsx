"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { storeUserInfo } from "@/services/auth.services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import logo from "@/assets/logo.png";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLogin } from "@/services/actions/registerUser";
import BDForm from "@/components/Forms/BDForm";
import BDInput from "@/components/Forms/BDInput";
import { useAuth } from "@/utils/useAuth";
import { NextPage } from "next";

import { validationSchema } from "@/utils/validation/validationSchema";

const LoginPage: NextPage = () => {
  const router = useRouter();
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    if (auth) {
      router.push("/");
    }
  }, [auth, router]);

  const handleLogin: SubmitHandler<FieldValues> = async (values) => {
    const toastId = toast.loading("loading...");
    try {
      const res = await userLogin({
        password: values.password,
        email: values.email,
      });

      if (res?.data?.accessToken) {
        toast.success(res?.message, {
          id: toastId,
        });
        setAuth(res?.data?.accessToken);
        storeUserInfo({ accessToken: res?.data?.accessToken });
        router.push("/");
      } else {
        toast.error(res.message, {
          id: toastId,
        });
      }
    } catch (err: any) {
      toast.error(err.message, {
        id: toastId,
      });
    }
  };

  if (auth) {
    return null; // Prevent rendering the login form if already authenticated
  }

  return (
    <div className="container mx-auto h-screen flex justify-center items-center">
      <div className="max-w-md w-full shadow-md shadow-gray-800 rounded p-4 text-center">
        <div className="flex justify-center items-center mb-4">
          <Image src={logo} width={150} height={150} alt="logo" />
        </div>
        <h6 className="font-bold text-xl mb-4 text-gradient">Login</h6>

        <BDForm
          onSubmit={handleLogin}
          resolver={zodResolver(validationSchema)}
          defaultValues={{
            email: "",
            password: "",
          }}
        >
          <div className="grid grid-cols-1 gap-4 mb-4">
            <BDInput name="email" label="Email" type="email" fullWidth={true} />
            <BDInput
              name="password"
              label="Password"
              type="password"
              fullWidth={true}
            />
          </div>

          <Link href={"/forgot-password"} className="text-right block mb-4">
            <p className="text-sm underline">Forgot Password?</p>
          </Link>

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
          <p className="mt-4 text-sm">
            Do not have an account?
            <Link href="/register" className="text-red-500 underline">
              Create an account
            </Link>
          </p>
        </BDForm>
      </div>
    </div>
  );
};

export default LoginPage;
