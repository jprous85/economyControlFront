
export const saveLocalStorage = (key: string, data: string) => {
    localStorage.setItem(key, data);
}

export const getLocalStorage = (key: string): any => {
    return localStorage.getItem(key);
}
