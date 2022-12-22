import {Button, Modal} from "react-bootstrap";


interface customProps {
    title: string;
    children: any;
    show: boolean,
    setShow: Function,
    callback: Function;
    saveBtn: string | null;
    closeBtn: string | null;
}


const SimpleModalDialog = ({show, setShow, title, children, callback, saveBtn, closeBtn}: customProps) => {

    const successResponse = () => {
        handleClose();
        callback();
    }
    const handleClose = () => setShow(false);

    return (
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {closeBtn ?? 'closeBtn'}
                </Button>
                <Button variant="primary" onClick={() => successResponse()}>
                    {saveBtn ?? 'saveBtn'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SimpleModalDialog;
