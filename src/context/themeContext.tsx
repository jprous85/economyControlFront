import React, {createContext, useCallback, useMemo, useState} from 'react';
import {getLocalStorageComplexData} from "../Shared/Infrastructure/Persistence/localStorageComplexData";

export const themes = {
    light: 'light',
    dark: 'dark',
};

export const ThemeContext = createContext({
    theme: "light",
    setTheme: (theme: string) => {}
});


export const ThemeProvider = (props: any) => {

    const {children} = props;

    const themeSavedInLocalStorage = getLocalStorageComplexData();

    const changeTheme = (newTheme: string) => {
        setState({...state, theme: newTheme})
    }

    console.log(themeSavedInLocalStorage);

    const initState = {
        theme: (themeSavedInLocalStorage) ? themeSavedInLocalStorage['theme'] : 'light',
        setTheme: changeTheme
    }

    const [state, setState] = useState(initState)

    return <ThemeContext.Provider value={state}>{children}</ThemeContext.Provider>
}
