import {createContext} from "react";
import { Auth } from "../../interfaces/AuthInterface";

export type AuthContextProps = {
    complexData: Auth,
    setAuth: (complexData: string) => void
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
