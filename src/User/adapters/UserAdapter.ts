import {UserInterface} from "../interfaces/UserInterface";

const userAdapter = (response: any): UserInterface | [] => {
    if (response) {
        return <UserInterface>{
            id: response.id,
            uuid: response.uuid,
            roleId: response.role,
            name: response.name,
            firstSurname: response.first_surname,
            secondSurname: response.second_surname,
            email: response.email,
            age: response.age,
            gender: response.gender,
            lang: response.lang,
            lastLogin: response.last_login,
            active: response.active,
            verified: response.verified,
            createdAt: response.created_at,
            updatedAt: response.updated_at
        }
    }
    return [];
}

export default userAdapter;
