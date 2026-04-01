import {Button, Modal} from "react-bootstrap";
import {useContext} from "react";
import {ThemeContext} from "../context/themeContext";


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

    const themeContext = useContext(ThemeContext);

    const successResponse = () => {
        handleClose();
        callback();
    }
    const handleClose = () => setShow(false);

    return (
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header className={`${themeContext.theme}-modal-card`} closeButton>
                <Modal.Title className={`${themeContext.theme}-text`} style={{fontSize: '1rem', fontWeight: 600}}>
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={`${themeContext.theme}-modal-card`}>
                {children}
            </Modal.Body>
            <Modal.Footer className={`${themeContext.theme}-modal-card`} style={{gap: 8}}>
                <Button variant="secondary" size="sm" onClick={handleClose}>
                    {closeBtn ?? 'Cancelar'}
                </Button>
                <Button variant="primary" size="sm" onClick={() => successResponse()}>
                    {saveBtn ?? 'Guardar'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SimpleModalDialog;
