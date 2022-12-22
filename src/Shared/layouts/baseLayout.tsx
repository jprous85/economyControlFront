import Navbar from "../../components/Navbar";
import {Container, Row} from "react-bootstrap";

interface props {
    children: JSX.Element | JSX.Element[]
}

const BaseLayout = ({children}: props) => {

    return (
        <Container fluid>
            <Navbar />
            <Row>
                {children}
            </Row>
        </Container>
    );
}

export default BaseLayout;
