import BaseLayout from '../../../Shared/layouts/baseLayoutLogin';
import React, {useContext} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";
import {ThemeContext} from "../../../context/themeContext";

interface props {
    submitLogin: Function,
    changeCredentials: Function,
    error: string
}

const LoginView = ({submitLogin, changeCredentials, error}: props) => {

    const themeContext = useContext(ThemeContext);
    const isDark = themeContext.theme === 'dark';

    const handleSubmit = (event: React.FormEvent<EventTarget>) => {
        submitLogin();
        event.preventDefault();
    }

    const cardBg = isDark ? '#1e2235' : '#ffffff';
    const textColor = isDark ? '#f5f6f7' : '#212228';
    const mutedColor = isDark ? 'rgba(255,255,255,0.5)' : '#6c757d';
    const inputBg = isDark ? '#292D3E' : '#f8f9fa';
    const inputBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.12)';
    const inputColor = isDark ? '#f5f6f7' : '#212228';

    return (
        <BaseLayout>
            <div style={{width: '100%', maxWidth: 400, padding: '0 16px'}}>

                {/* Logo + brand */}
                <div className="text-center mb-4">
                    <div style={{
                        width: 48,
                        height: 48,
                        borderRadius: 14,
                        background: 'linear-gradient(135deg, #4361ee, #7209b7)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 12
                    }}>
                        <FontAwesomeIcon icon={icon({name: 'wallet', style: 'solid'})} style={{color: '#fff', fontSize: 22}}/>
                    </div>
                    <h1 style={{fontSize: '1.4rem', fontWeight: 700, color: textColor, marginBottom: 4}}>
                        Economy Control
                    </h1>
                    <p style={{fontSize: '0.875rem', color: mutedColor, margin: 0}}>
                        Inicia sesión para continuar
                    </p>
                </div>

                {/* Form card */}
                <div style={{
                    backgroundColor: cardBg,
                    borderRadius: 12,
                    padding: '28px 28px 24px',
                    boxShadow: isDark
                        ? '0 4px 24px rgba(0,0,0,0.4)'
                        : '0 4px 24px rgba(0,0,0,0.08)',
                    border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)'
                }}>
                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label style={{fontSize: '0.8rem', fontWeight: 600, color: textColor, marginBottom: 6, display: 'block'}}>
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="tu@email.com"
                                autoComplete="email"
                                style={{
                                    width: '100%',
                                    padding: '9px 12px',
                                    borderRadius: 8,
                                    border: `1px solid ${inputBorder}`,
                                    backgroundColor: inputBg,
                                    color: inputColor,
                                    fontSize: '0.9rem',
                                    outline: 'none'
                                }}
                                onChange={(e: any) => changeCredentials('email', e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label style={{fontSize: '0.8rem', fontWeight: 600, color: textColor, marginBottom: 6, display: 'block'}}>
                                Contraseña
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                autoComplete="current-password"
                                style={{
                                    width: '100%',
                                    padding: '9px 12px',
                                    borderRadius: 8,
                                    border: `1px solid ${inputBorder}`,
                                    backgroundColor: inputBg,
                                    color: inputColor,
                                    fontSize: '0.9rem',
                                    outline: 'none'
                                }}
                                onChange={(e: any) => changeCredentials('password', e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: 8,
                                border: 'none',
                                background: 'linear-gradient(135deg, #4361ee, #7209b7)',
                                color: '#ffffff',
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 8
                            }}
                        >
                            Iniciar sesión
                            <FontAwesomeIcon icon={icon({name: 'arrow-right', style: 'solid'})} style={{fontSize: 12}}/>
                        </button>

                    </form>
                </div>

                {/* Error */}
                {error && (
                    <div style={{
                        marginTop: 12,
                        padding: '10px 14px',
                        borderRadius: 8,
                        backgroundColor: isDark ? 'rgba(220,53,69,0.15)' : '#fff5f5',
                        border: '1px solid rgba(220,53,69,0.3)',
                        color: '#dc3545',
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8
                    }}>
                        <FontAwesomeIcon icon={icon({name: 'circle-exclamation', style: 'solid'})} style={{flexShrink: 0}}/>
                        {error}
                    </div>
                )}

            </div>
        </BaseLayout>
    );
};

export default LoginView;
