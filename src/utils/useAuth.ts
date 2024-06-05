import { AuthContext, AuthContextType } from "../contexts";
import { useContext } from "react";

export const useAuth = () => {
    const {auth, setAuth} = <AuthContextType>useContext(AuthContext);

    return {auth, setAuth};
}