export interface AccountInterface {
    "id": number | null,
    "uuid": string | null,
    "name": string,
    "description": string | null,
    "users": string,
    "ownersAccount": string,
    "active": number,
    "created_at": string,
    "updated_at": string | null
}
