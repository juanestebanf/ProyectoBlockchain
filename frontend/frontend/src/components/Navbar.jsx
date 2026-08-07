import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { usuario, logout } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const cerrarSesion = () => {
        logout();
        navigate("/login");
    };

    const esAdmin = usuario?.rol === "ADMIN";

    // Efecto para cambiar el navbar al hacer scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Cerrar mobile menu al cambiar de ruta
    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    // Función para determinar si un link está activo
    const isActive = (path) => {
        if (path === "/dashboard" && location.pathname === "/dashboard") return true;
        if (path === "/admin/dashboard" && location.pathname === "/admin/dashboard") return true;
        if (path !== "/dashboard" && path !== "/admin/dashboard" && location.pathname.startsWith(path)) return true;
        return false;
    };

    const navLinks = esAdmin ? [
        { path: "/admin/dashboard", label: "Dashboard", icon: "bi-grid-3x3-gap-fill" },
        { path: "/admin/usuarios", label: "Usuarios", icon: "bi-people-fill" },
        { path: "/admin/solicitudes", label: "Solicitudes", icon: "bi-inbox-fill" },
        { path: "/admin/validar-inmuebles", label: "Inmuebles", icon: "bi-building-fill" },
        { path: "/admin/contratos", label: "Contratos", icon: "bi-file-earmark-text-fill" },
        { path: "/admin/auditoria", label: "Blockchain", icon: "bi-link-45deg" }
    ] : [
        { path: "/dashboard", label: "Dashboard", icon: "bi-grid-3x3-gap-fill" },
        { path: "/explorar", label: "Explorar", icon: "bi-compass-fill" },
        { path: "/mis-inmuebles", label: "Mis Inmuebles", icon: "bi-building-fill" },
        { path: "/mis-contratos", label: "Contratos", icon: "bi-file-earmark-text-fill" },
        { path: "/mis-pagos", label: "Pagos", icon: "bi-cash-coin" },
        { path: "/blockchain", label: "Blockchain", icon: "bi-link-45deg" }
    ];

    return (
        <>
            <nav 
                className="navbar navbar-expand-lg fixed-top"
                style={{
                    background: scrolled 
                        ? 'rgba(26, 42, 58, 0.95)' 
                        : '#1A2A3A',
                    backdropFilter: scrolled ? 'blur(20px)' : 'none',
                    boxShadow: scrolled 
                        ? '0 4px 30px rgba(26, 42, 58, 0.15)' 
                        : 'none',
                    padding: scrolled ? '10px 0' : '16px 0',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    borderBottom: '1px solid rgba(249, 246, 240, 0.06)'
                }}
            >
                <div className="container">
                    {/* Logo */}
                    <Link
                        className="navbar-brand d-flex align-items-center"
                        to={esAdmin ? "/admin/dashboard" : "/dashboard"}
                        style={{
                            color: '#F9F6F0',
                            fontSize: '1.4rem',
                            fontWeight: '700',
                            letterSpacing: '-0.5px',
                            textDecoration: 'none',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                        <div 
                            className="d-flex align-items-center justify-content-center rounded-2 me-2"
                            style={{
                                width: '36px',
                                height: '36px',
                                background: 'rgba(198, 161, 91, 0.15)',
                                border: '1px solid rgba(198, 161, 91, 0.2)',
                                color: '#C6A15B'
                            }}
                        >
                            <i className="bi bi-houses-fill" style={{ fontSize: '1.2rem' }}></i>
                        </div>
                        <span style={{ fontFamily: 'Playfair Display, serif' }}>
                            SmartRent
                        </span>
                        <span 
                            className="ms-2"
                            style={{
                                fontSize: '0.65rem',
                                color: '#C6A15B',
                                fontWeight: '400',
                                letterSpacing: '1px',
                                textTransform: 'uppercase',
                                opacity: '0.7'
                            }}
                        >
                            {esAdmin ? 'Admin' : ''}
                        </span>
                    </Link>

                    {/* Mobile Toggle Button */}
                    <button
                        className="navbar-toggler border-0"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        style={{
                            color: '#F9F6F0',
                            padding: '8px',
                            transition: 'all 0.3s ease'
                        }}
                        aria-label="Toggle navigation"
                    >
                        {mobileOpen ? (
                            <i className="bi bi-x-lg" style={{ fontSize: '1.5rem' }}></i>
                        ) : (
                            <i className="bi bi-list" style={{ fontSize: '1.5rem' }}></i>
                        )}
                    </button>

                    {/* Navigation Menu */}
                    <div 
                        className={`collapse navbar-collapse ${mobileOpen ? 'show' : ''}`}
                        id="navbarNav"
                        style={{
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <ul className="navbar-nav ms-auto align-items-lg-center">
                            {navLinks.map((link) => (
                                <li className="nav-item" key={link.path}>
                                    <Link
                                        className={`nav-link d-flex align-items-center ${
                                            isActive(link.path) ? 'active' : ''
                                        }`}
                                        to={link.path}
                                        style={{
                                            color: isActive(link.path) ? '#F9F6F0' : 'rgba(249, 246, 240, 0.6)',
                                            fontWeight: isActive(link.path) ? '600' : '400',
                                            padding: '8px 16px',
                                            margin: '0 4px',
                                            borderRadius: '8px',
                                            transition: 'all 0.2s ease',
                                            position: 'relative',
                                            fontSize: '0.95rem'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isActive(link.path)) {
                                                e.currentTarget.style.color = '#F9F6F0';
                                                e.currentTarget.style.background = 'rgba(249, 246, 240, 0.06)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isActive(link.path)) {
                                                e.currentTarget.style.color = 'rgba(249, 246, 240, 0.6)';
                                                e.currentTarget.style.background = 'transparent';
                                            }
                                        }}
                                    >
                                        <i 
                                            className={`${link.icon} me-2`} 
                                            style={{ 
                                                fontSize: '0.9rem',
                                                color: isActive(link.path) ? '#C6A15B' : 'rgba(249, 246, 240, 0.4)'
                                            }}
                                        ></i>
                                        {link.label}
                                        
                                        {/* Indicador de actividad */}
                                        {isActive(link.path) && (
                                            <span 
                                                style={{
                                                    position: 'absolute',
                                                    bottom: '2px',
                                                    left: '50%',
                                                    transform: 'translateX(-50%)',
                                                    width: '20px',
                                                    height: '2px',
                                                    background: '#C6A15B',
                                                    borderRadius: '2px'
                                                }}
                                            />
                                        )}
                                    </Link>
                                </li>
                            ))}

                            {/* Separador visual */}
                            <li className="nav-item d-none d-lg-block">
                                <div 
                                    style={{
                                        width: '1px',
                                        height: '30px',
                                        background: 'rgba(249, 246, 240, 0.1)',
                                        margin: '0 12px'
                                    }}
                                />
                            </li>

                            {/* Usuario y Logout */}
                            <li className="nav-item">
                                <div className="d-flex align-items-center gap-3" style={{ padding: '8px 0' }}>
                                    <div className="d-flex align-items-center gap-2">
                                        <div 
                                            className="d-flex align-items-center justify-content-center rounded-circle"
                                            style={{
                                                width: '32px',
                                                height: '32px',
                                                background: 'rgba(198, 161, 91, 0.15)',
                                                border: '1px solid rgba(198, 161, 91, 0.2)',
                                                color: '#C6A15B',
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            <i className="bi bi-person-fill"></i>
                                        </div>
                                        <span 
                                            className="text-white small d-none d-md-inline"
                                            style={{
                                                fontWeight: '500',
                                                opacity: '0.8',
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            {usuario?.nombre}
                                        </span>
                                    </div>

                                    <button
                                        className="btn"
                                        onClick={cerrarSesion}
                                        style={{
                                            background: 'rgba(249, 246, 240, 0.06)',
                                            color: 'rgba(249, 246, 240, 0.7)',
                                            border: '1px solid rgba(249, 246, 240, 0.1)',
                                            padding: '6px 16px',
                                            fontSize: '0.85rem',
                                            borderRadius: '8px',
                                            fontWeight: '500',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'rgba(198, 161, 91, 0.15)';
                                            e.currentTarget.style.color = '#F9F6F0';
                                            e.currentTarget.style.borderColor = 'rgba(198, 161, 91, 0.3)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'rgba(249, 246, 240, 0.06)';
                                            e.currentTarget.style.color = 'rgba(249, 246, 240, 0.7)';
                                            e.currentTarget.style.borderColor = 'rgba(249, 246, 240, 0.1)';
                                        }}
                                    >
                                        <i className="bi bi-box-arrow-right me-1"></i>
                                        Salir
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Espacio para evitar que el contenido quede debajo del navbar fijo */}
            <div style={{ height: '80px' }} />

            {/* Estilos globales adicionales */}
            <style jsx>{`
                .navbar-toggler:focus {
                    box-shadow: none;
                }
                
                .nav-link {
                    position: relative;
                }

                @media (max-width: 992px) {
                    .navbar-collapse {
                        background: rgba(26, 42, 58, 0.98);
                        backdrop-filter: blur(20px);
                        padding: 16px;
                        border-radius: 12px;
                        margin-top: 12px;
                        border: 1px solid rgba(249, 246, 240, 0.06);
                    }
                    
                    .nav-link {
                        padding: 12px 16px !important;
                        border-radius: 8px;
                    }
                    
                    .nav-link:hover {
                        background: rgba(249, 246, 240, 0.06) !important;
                    }
                }
            `}</style>
        </>
    );
}