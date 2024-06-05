"use server";

export const register = async (formData: any) => {
  console.log(formData);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      cache: "no-store",
    }
  );

  const result = await res.json();
  console.log(result);
  return result;
};
export const userLogin = async ({password,email}:{password:string,email:string})=>{
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({password,email}),
      cache: "no-store",
    }
  );
  const result = await res.json();
 
  return result;
}