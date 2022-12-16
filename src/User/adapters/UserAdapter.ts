import {User} from "../../Domain/interfaces/UserInterface";

const userAdapter = (response: any): User | null => {
    if (response) {
        return <User>{
            id: response.data.id,
            uuid: response.data.uuid,
            role: response.data.role,
            name: response.data.name,
            firstSurname: response.data.first_surname,
            secondSurname: response.data.second_surname,
            email: response.data.email,
            age: response.data.age,
            gender: response.data.gender,
            password: response.data.password,
            lang: response.data.lang,
            apiKey: response.data.api_key,
            emailVerifiedAt: response.data.email_verified_at,
            rememberToken: response.data.remember_token,
            lastLogin: response.data.last_login,
            active: response.data.active,
            verified: response.data.verified,
            createdAt: response.data.created_at,
            updatedAt: response.data.updated_at
        }
    }
    return null;
}

export default userAdapter;
