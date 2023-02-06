import {useNavigate} from "react-router-dom";
import {
    getLocalStorageComplexData,
    saveLocalStorageSimpleComplexData, saveLocalStorageToComplexDataStack
} from "../Shared/Infrastructure/Persistence/localStorageComplexData";
import logoutHook from "../Auth/hooks/LogoutHook";
import {saveLocalStorage} from "../Shared/Infrastructure/Persistence/localStorage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Container } from "react-bootstrap";
import React, {useContext} from "react";
import IsAdmin from "../Shared/utils/isAdmin";
import {ThemeContext} from "../context/themeContext";

const NavbarComponent = () => {

    const navigate = useNavigate();
    const themeProvider = useContext(ThemeContext);
    const complex = getLocalStorageComplexData();

    const fontAwesomeIcons = {
        color: 'warning',
        icon: 'sun'
    }

    const changeTheme = () => {
        const newTheme = (complex.theme === 'black') ? 'light' : 'black';
        saveLocalStorageToComplexDataStack('theme', newTheme);
        themeProvider.setTheme(newTheme);
        determinateThemesIcons();
    }

    const determinateThemesIcons = () => {
        if (complex.theme === 'black') {
            return (
                <FontAwesomeIcon
                    className={'text-secondary'}
                    icon={icon({name: 'moon', style: 'regular'})}
                    onClick={() => changeTheme()}
                />
            );
        } else {
            return (
                <FontAwesomeIcon
                    className={'text-warning'}
                    icon={icon({name: 'sun', style: 'regular'})}
                    onClick={() => changeTheme()}
                />
            );
        }
    }

    const logout = () => {
        logoutHook().then(() => {
            saveLocalStorage('complexData', '');
            return navigate("/login");
        })
    }

    const userLink = (IsAdmin()) ? <Nav.Link href="/users">Users</Nav.Link> : null;

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
                        {userLink}
                        <Nav.Link href="/accounts">Accounts</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#">{complex.user.name}</Nav.Link>
                        <Nav.Link href="#">
                            {determinateThemesIcons()}
                        </Nav.Link>
                        <Nav.Link href="#" onClick={logout}><FontAwesomeIcon icon={icon({name: 'right-from-bracket'})}/></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default React.memo(NavbarComponent);
