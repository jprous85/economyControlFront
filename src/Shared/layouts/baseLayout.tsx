import NavbarComponent from "../../components/NavbarComponent";
import {Container, Row} from "react-bootstrap";

interface props {
    children: JSX.Element | JSX.Element[]
}

const BaseLayout = ({children}: props) => {

    return (
        <Container fluid>
            <NavbarComponent />
            <Row className={'mb-5'}>
                {children}
            </Row>
        </Container>
    );
}

export default BaseLayout;
