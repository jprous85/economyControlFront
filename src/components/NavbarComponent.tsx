import {useNavigate, useLocation} from "react-router-dom";
import {
    getLocalStorageComplexData,
    saveLocalStorageToComplexDataStack
} from "../Shared/Infrastructure/Persistence/localStorageComplexData";
import logoutHook from "../Auth/hooks/LogoutHook";
import {saveLocalStorage} from "../Shared/Infrastructure/Persistence/localStorage";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {icon} from '@fortawesome/fontawesome-svg-core/import.macro';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Container} from "react-bootstrap";
import React, {useContext} from "react";
import IsAdmin from "../Shared/utils/isAdmin";
import {ThemeContext} from "../context/themeContext";

const NavbarComponent = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const themeContext = useContext(ThemeContext);
    const complex = getLocalStorageComplexData();

    const isDark = themeContext.theme === 'dark';

    const changeTheme = () => {
        const newTheme = isDark ? 'light' : 'dark';
        saveLocalStorageToComplexDataStack('theme', newTheme);
        themeContext.setTheme(newTheme);
    }

    const logout = () => {
        logoutHook().then(() => {
            saveLocalStorage('complexData', '');
            return navigate("/login");
        });
    }

    const isActive = (path: string) => location.pathname.startsWith(path);

    const initials = complex.user?.name
        ? complex.user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
        : '?';

    const navLinkStyle = (active: boolean): React.CSSProperties => ({
        fontSize: '0.875rem',
        fontWeight: active ? 600 : 400,
        color: isDark
            ? (active ? '#ffffff' : 'rgba(255,255,255,0.6)')
            : (active ? '#212228' : '#505050'),
        borderBottom: active ? '2px solid #4361ee' : '2px solid transparent',
        paddingBottom: 4,
        marginRight: 8,
    });

    return (
        <Navbar
            expand="lg"
            fixed="top"
            variant={isDark ? 'dark' : 'light'}
            className={`${themeContext.theme}-navbar`}
        >
            <Container fluid className="px-4">

                {/* Brand */}
                <Navbar.Brand
                    href="/accounts"
                    className="d-flex align-items-center gap-2 me-4"
                    style={{textDecoration: 'none'}}
                >
                    <div style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        background: 'linear-gradient(135deg, #4361ee, #7209b7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                    }}>
                        <FontAwesomeIcon icon={icon({name: 'wallet', style: 'solid'})} style={{color: '#fff', fontSize: 13}}/>
                    </div>
                    <span style={{
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        color: isDark ? '#ffffff' : '#212228'
                    }}>
                        Economy
                    </span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbarMain"/>

                <Navbar.Collapse id="navbarMain">
                    {/* Left links */}
                    <Nav className="me-auto align-items-lg-center gap-1">
                        {IsAdmin() && (
                            <Nav.Link
                                href="/users"
                                style={navLinkStyle(isActive('/users'))}
                            >
                                Users
                            </Nav.Link>
                        )}
                        <Nav.Link
                            href="/accounts"
                            style={navLinkStyle(isActive('/accounts') || isActive('/economy'))}
                        >
                            Accounts
                        </Nav.Link>
                    </Nav>

                    {/* Right: theme + user + logout */}
                    <Nav className="align-items-lg-center gap-2">

                        {/* Theme toggle */}
                        <button
                            onClick={changeTheme}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px 8px',
                                borderRadius: 6,
                                color: isDark ? 'rgba(255,255,255,0.7)' : '#505050',
                                fontSize: 15
                            }}
                            title={isDark ? 'Switch to light' : 'Switch to dark'}
                        >
                            <FontAwesomeIcon icon={isDark
                                ? icon({name: 'sun', style: 'solid'})
                                : icon({name: 'moon', style: 'solid'})
                            }/>
                        </button>

                        {/* User initials badge */}
                        <div
                            title={complex.user?.name ?? ''}
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #4361ee, #7209b7)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                fontSize: '0.65rem',
                                fontWeight: 700,
                                cursor: 'default',
                                flexShrink: 0
                            }}
                        >
                            {initials}
                        </div>

                        {/* Logout */}
                        <button
                            onClick={logout}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px 8px',
                                borderRadius: 6,
                                color: isDark ? 'rgba(255,255,255,0.7)' : '#505050',
                                fontSize: 15
                            }}
                            title="Logout"
                        >
                            <FontAwesomeIcon icon={icon({name: 'right-from-bracket', style: 'solid'})}/>
                        </button>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default React.memo(NavbarComponent);
