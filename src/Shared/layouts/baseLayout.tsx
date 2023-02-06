import NavbarComponent from "../../components/NavbarComponent";
import {Container, Row} from "react-bootstrap";
import {useContext} from "react";
import {ThemeContext} from "../../context/themeContext";

import './../../Styles/light/baseCss.css';
import './../../Styles/black/baseCss.css';

interface props {
    children: JSX.Element | JSX.Element[]
}

const BaseLayout = ({children}: props) => {

    const themeContext = useContext(ThemeContext);

    return (
        <Container fluid>
            <NavbarComponent />
            <Row className={`${themeContext.theme}-container`}>
                {children}
            </Row>
        </Container>
    );
}

export default BaseLayout;
