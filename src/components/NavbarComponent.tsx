import {useNavigate} from "react-router-dom";
import {getLocalStorageComplexData} from "../Shared/Infrastructure/Persistence/localStorageComplexData";
import logoutHook from "../Auth/hooks/LogoutHook";
import {saveLocalStorage} from "../Shared/Infrastructure/Persistence/localStorage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Container } from "react-bootstrap";
import React from "react";

const NavbarComponent = () => {

    const navigate = useNavigate();

    const complex = getLocalStorageComplexData();

    const logout = () => {
        logoutHook().then(() => {
            saveLocalStorage('complexData', '');
            return navigate("/login");
        })
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/users">Users</Nav.Link>
                        <Nav.Link href="/accounts">Accounts</Nav.Link>

                        <Nav.Link href="#" disabled>
                            Link
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#">{complex.user.name}</Nav.Link>
                        <Nav.Link href="#"><FontAwesomeIcon icon={icon({name: 'sun', style: 'regular'})} /></Nav.Link>
                        <Nav.Link href="#" onClick={logout}><FontAwesomeIcon icon={icon({name: 'right-from-bracket'})}/></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default React.memo(NavbarComponent);
