import NavbarComponent from "../../components/NavbarComponent";
import {Container, Row} from "react-bootstrap";

interface props {
    children: JSX.Element | JSX.Element[]
}

const BaseLayout = ({children}: props) => {

    return (
        <Container fluid>
            <NavbarComponent />
            <Row>
                {children}
            </Row>
        </Container>
    );
}

export default BaseLayout;
