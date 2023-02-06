import {useContext} from "react";
import {ThemeContext} from "../../context/themeContext";

interface props {
    title: string;
}

const BlockSeparator = ({title}: props) => {

    const themeContext = useContext(ThemeContext);

    return (
        <div className="row mt-3 mb-3">
            <div className="col-md-2">
                <hr className={`${themeContext.theme}-text`}/>
            </div>
            <div className={`col-md-1 text-center ${themeContext.theme}-text`}>{title}</div>
            <div className="col-md-9">
                <hr className={`${themeContext.theme}-text`}/>
            </div>
        </div>
    );
}

export default BlockSeparator;
