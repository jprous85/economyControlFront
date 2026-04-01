import {Toast, ToastContainer} from "react-bootstrap";

interface props {
    show: boolean,
    setShow: Function,
    title: string | null,
    message: string | null
}

const ToastComponent = ({show, setShow, title, message}: props) => {

    return (
        <ToastContainer position="bottom-end" className="mb-4 me-4">
            <Toast
                onClose={() => setShow(false)}
                show={show}
                delay={3000}
                autohide
                bg="dark"
                style={{minWidth: 240}}
            >
                <Toast.Header closeButton={false} style={{backgroundColor: '#1e2235', borderBottom: '1px solid rgba(255,255,255,0.08)'}}>
                    <div style={{
                        width: 8, height: 8, borderRadius: '50%',
                        backgroundColor: '#06d6a0',
                        marginRight: 8, flexShrink: 0
                    }}/>
                    <strong className="me-auto text-white" style={{fontSize: '0.8rem'}}>{title}</strong>
                </Toast.Header>
                <Toast.Body style={{backgroundColor: '#161929', color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem'}}>
                    {message}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default ToastComponent;
