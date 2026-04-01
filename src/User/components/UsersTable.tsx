import {UserInterface} from "../interfaces/UserInterface";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ROLES_NAME_BY_ID} from "../../Shared/Constants/RolesConstants";
import {useContext} from "react";
import {ThemeContext} from "../../context/themeContext";
import formatDate from "../../Shared/utils/formatDate";

interface props {
    users: Array<UserInterface>,
    setUser: Function,
    updateUserFunction: Function,
    deleteUserFunction: Function
}

const AVATAR_COLORS = ['#4361ee', '#7209b7', '#f72585', '#06d6a0', '#ffd166', '#ef476f', '#4cc9f0', '#3a0ca3'];

const getAvatarColor = (name: string) => {
    if (!name) return '#6c757d';
    return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}

const getInitials = (name: string) =>
    name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';

const UsersTable = ({users, setUser, updateUserFunction, deleteUserFunction}: props) => {

    const themeContext = useContext(ThemeContext);
    const isDark = themeContext.theme === 'dark';

    const assignUser = (user: UserInterface) => {
        updateUserFunction();
        setUser(user);
    }

    const deleteUser = (user: UserInterface) => {
        deleteUserFunction();
        setUser(user);
    }

    const borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
    const headerColor = isDark ? 'rgba(255,255,255,0.4)' : '#6c757d';
    const rowBg = isDark ? '#1e2235' : '#ffffff';
    const textColor = isDark ? '#f5f6f7' : '#212228';

    if (users.length === 0) {
        return (
            <div className="text-center py-5">
                <FontAwesomeIcon icon={icon({name: 'users', style: 'solid'})} size="2x" className="text-muted mb-3"/>
                <p className={`${themeContext.theme}-text`}>No hay usuarios registrados</p>
            </div>
        );
    }

    return (
        <div style={{borderRadius: 10, overflow: 'hidden', border: `1px solid ${borderColor}`}}>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                    <tr style={{borderBottom: `1px solid ${borderColor}`}}>
                        {['Usuario', 'Email', 'Rol', 'Estado', 'Último acceso', 'Creado', ''].map(h => (
                            <th key={h} style={{
                                padding: '10px 16px',
                                fontSize: '0.7rem',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.06em',
                                color: headerColor,
                                backgroundColor: isDark ? '#161929' : '#f8f9fa',
                                whiteSpace: 'nowrap'
                            }}>
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: UserInterface) => {
                        // @ts-ignore
                        const roleName: string = ROLES_NAME_BY_ID[user.roleId] ?? 'unknown';
                        const isAdmin = roleName === 'admin';
                        const isActive = user.active === 1;

                        return (
                            <tr
                                key={user.id}
                                className={`${themeContext.theme}-table-row`}
                                style={{
                                    borderBottom: `1px solid ${borderColor}`,
                                    backgroundColor: rowBg,
                                    transition: 'background 0.12s'
                                }}
                            >
                                {/* Avatar + name */}
                                <td style={{padding: '12px 16px'}}>
                                    <div className="d-flex align-items-center gap-2">
                                        <div style={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: '50%',
                                            backgroundColor: getAvatarColor(user.name),
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#fff',
                                            fontSize: '0.65rem',
                                            fontWeight: 700,
                                            flexShrink: 0
                                        }}>
                                            {getInitials(user.name)}
                                        </div>
                                        <div>
                                            <div style={{fontWeight: 600, fontSize: '0.875rem', color: textColor}}>
                                                {user.name}
                                            </div>
                                            {user.firstSurname && (
                                                <div style={{fontSize: '0.75rem', color: isDark ? 'rgba(255,255,255,0.4)' : '#6c757d'}}>
                                                    {[user.firstSurname, user.secondSurname].filter(Boolean).join(' ')}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </td>

                                {/* Email */}
                                <td style={{padding: '12px 16px', fontSize: '0.85rem', color: isDark ? 'rgba(255,255,255,0.7)' : '#505050'}}>
                                    {user.email}
                                </td>

                                {/* Role badge */}
                                <td style={{padding: '12px 16px'}}>
                                    <span style={{
                                        padding: '2px 8px',
                                        borderRadius: 20,
                                        fontSize: '0.7rem',
                                        fontWeight: 600,
                                        backgroundColor: isAdmin ? 'rgba(220,53,69,0.12)' : 'rgba(108,117,125,0.12)',
                                        color: isAdmin ? '#dc3545' : '#6c757d',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.04em'
                                    }}>
                                        {roleName}
                                    </span>
                                </td>

                                {/* Active badge */}
                                <td style={{padding: '12px 16px'}}>
                                    <div className="d-flex align-items-center gap-1">
                                        <div style={{
                                            width: 7, height: 7, borderRadius: '50%',
                                            backgroundColor: isActive ? '#198754' : '#6c757d',
                                            flexShrink: 0
                                        }}/>
                                        <span style={{fontSize: '0.78rem', color: isActive ? '#198754' : '#6c757d', fontWeight: 500}}>
                                            {isActive ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </div>
                                </td>

                                {/* Last login */}
                                <td style={{padding: '12px 16px', fontSize: '0.8rem', color: isDark ? 'rgba(255,255,255,0.4)' : '#6c757d', whiteSpace: 'nowrap'}}>
                                    {formatDate(user.lastLogin)}
                                </td>

                                {/* Created */}
                                <td style={{padding: '12px 16px', fontSize: '0.8rem', color: isDark ? 'rgba(255,255,255,0.4)' : '#6c757d', whiteSpace: 'nowrap'}}>
                                    {formatDate(user.createdAt)}
                                </td>

                                {/* Actions */}
                                <td style={{padding: '12px 16px', whiteSpace: 'nowrap'}}>
                                    <div className="d-flex gap-1">
                                        <button
                                            className="btn btn-sm btn-warning"
                                            title="Editar"
                                            onClick={() => assignUser(user)}
                                        >
                                            <FontAwesomeIcon icon={icon({name: 'pencil', style: 'solid'})}/>
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            title="Eliminar"
                                            onClick={() => deleteUser(user)}
                                        >
                                            <FontAwesomeIcon icon={icon({name: 'trash', style: 'solid'})}/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default UsersTable;
