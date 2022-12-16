import {UserInterface} from "../../User/interfaces/UserInterface";

export interface AuthComplex {
    accessToken: string,
    scope: string[],
    userId: number,
    user: UserInterface
}
