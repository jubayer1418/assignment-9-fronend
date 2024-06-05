
import { AuthContext } from "@/contexts";
import { getFromLocalStorage } from "@/utils/local-storage";
import { ReactNode, useEffect, useState } from "react";


interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProviderComponent({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState<any>(null);

  useEffect(() => {
    const token = getFromLocalStorage("accessToken");
    setAuth(token);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
