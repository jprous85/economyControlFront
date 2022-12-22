import {Toast, ToastContainer} from "react-bootstrap";

interface props {
    show: boolean,
    setShow: Function,
    title: string | null,
    message: string | null
}

const ToastComponent = ({show, setShow, title, message}: props) => {

    return (
        <ToastContainer position="bottom-center" className={'mb-5'}>
            <Toast
                onClose={() => setShow(false)}
                show={show}
                delay={3000}
                autohide
                bg={'warning'}
            >
                <Toast.Header>
                    <strong className="me-auto">{title}</strong>
                    <small>just now</small>
                </Toast.Header>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default ToastComponent;
