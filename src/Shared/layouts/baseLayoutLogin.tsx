import {ThemeContext} from '../../context/themeContext';


const BaseLayout = (props: any) => {

    const {cssStyle, children} = props;

    return (
        <ThemeContext.Consumer>
            {(theme) => {
                return (
                    <div className={'container'}>
                        <div className="row mt-4">
                            {children}
                        </div>
                    </div>
                );
            }}
        </ThemeContext.Consumer>
    );
}

export default BaseLayout;
