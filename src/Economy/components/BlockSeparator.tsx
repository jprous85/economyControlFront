import {useContext} from "react";
import {ThemeContext} from "../../context/themeContext";

interface props {
    title: string;
}

const BlockSeparator = ({title}: props) => {

    const themeContext = useContext(ThemeContext);

    return (
        <div className="row">
            <div className="col-md-1">
                <hr className={`${themeContext.theme}-text`}/>
            </div>
            <div className={`col-md-3 text-center ${themeContext.theme}-text`}>{title}</div>
            <div className="col-md-8">
                <hr className={`${themeContext.theme}-text`}/>
            </div>
        </div>
    );
}

export default BlockSeparator;
