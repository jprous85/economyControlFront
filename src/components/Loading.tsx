import {Col, Row} from "react-bootstrap";

const Loading = () => {
    return (
        <Row>
            <Col className={'text-center mt-5'}>
                <div className="spinner-border text-primary text-center" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </Col>
        </Row>
    );
}

export default Loading;
