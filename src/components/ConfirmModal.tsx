import SimpleModalDialog from "./SimpleModalDialog";
import {useContext} from "react";
import {ThemeContext} from "../context/themeContext";

interface props {
    title: string,
    message: string,
    show: boolean,
    setShow: Function,
    callback: Function
}

const ConfirmModal = ({show, setShow, title, message, callback}: props) => {

    const themeContext = useContext(ThemeContext);

    return (
        <SimpleModalDialog
            title={title}
            show={show}
            setShow={setShow}
            callback={callback}
            closeBtn={'Cancel'}
            saveBtn={'Delete'}
        >
            <div className="row">
                <div className="col-md-12">
                    <span className={`${themeContext.theme}-text`}>
                        {message}
                    </span>
                </div>
            </div>
        </SimpleModalDialog>
    )
}

export default ConfirmModal;
