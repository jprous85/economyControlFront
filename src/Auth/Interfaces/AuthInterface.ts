import {User} from "../../../User/Domain/interfaces/UserInterface";

export interface AuthComplex {
    accessToken: string,
    scope: string[],
    userId: number,
    user: User
}
