import {useContext} from 'react';
import {ThemeContext} from '../../context/themeContext';
import '../../Styles/light/baseCss.css';
import '../../Styles/dark/baseCss.css';

const BaseLayoutLogin = (props: any) => {
    const {children} = props;
    const themeContext = useContext(ThemeContext);

    return (
        <div className={`${themeContext.theme}-login-bg`}>
            {children}
        </div>
    );
}

export default BaseLayoutLogin;
