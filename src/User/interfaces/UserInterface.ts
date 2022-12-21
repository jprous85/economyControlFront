export interface UserInterface {
    id: number | null,
    uuid: string,
    roleId: number,
    name: string,
    firstSurname: string | null,
    secondSurname:string  | null,
    email: string,
    age: number | null,
    gender: string | null,
    lang: string,
    lastLogin: string,
    active: number,
    verified: number,
    createdAt: string,
    updatedAt: string | null
}
