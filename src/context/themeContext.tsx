import React, {createContext, useState} from 'react';

export const themes = {
    light: 'light',
    dark: 'dark',
};

export const ThemeContext = createContext({});


export const ThemeProvider = (props: any) => {

    const [theme, setTheme] = useState(themes.light);

    const {children} = props;

    return <ThemeContext.Provider value={{theme, setTheme}}>{children}</ThemeContext.Provider>
}
