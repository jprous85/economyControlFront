import React, {createContext, useCallback, useMemo, useState} from 'react';

export const themes = {
    light: 'light',
    dark: 'dark',
};

export const ThemeContext = createContext({});


export const ThemeProvider = (props: any) => {

    const [theme, setTheme] = useState(themes.light);


    const changeStyle = useCallback((style: string) => {
        setTheme(style);
    }, []);

    const value = useMemo(() => (
        () => ({
            theme,
            changeStyle
        })
    ), [theme, changeStyle]);


    const {children} = props;

    return <ThemeContext.Provider value={{value, changeStyle}}>{children}</ThemeContext.Provider>
}
