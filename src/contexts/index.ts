import { createContext } from "react";


export interface AuthContextType {
  auth: any;
  setAuth: React.Dispatch<React.SetStateAction<any>>;
}

// Create the context with a default value
export const AuthContext = createContext<AuthContextType | null>(null);