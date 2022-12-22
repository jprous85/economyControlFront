import SimpleModalDialog from "./SimpleModalDialog";

interface props {
    title: string,
    message: string,
    show: boolean,
    setShow: Function,
    callback: Function
}

const ConfirmModal = ({show, setShow, title, message, callback}: props) => {

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
                    {message}
                </div>
            </div>
        </SimpleModalDialog>
    )
}

export default ConfirmModal;
