import {useContext} from "react";
import {ThemeContext} from "../../context/themeContext";

interface props {
    title: string;
    subtotal?: number;
}

const BlockSeparator = ({title, subtotal}: props) => {

    const themeContext = useContext(ThemeContext);

    return (
        <div className="d-flex align-items-center gap-2 mb-3">
            <div style={{
                width: 3,
                height: 14,
                backgroundColor: '#6c757d',
                borderRadius: 2,
                flexShrink: 0
            }}/>
            <span className={`${themeContext.theme}-text`}
                  style={{fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap'}}>
                {title}
            </span>
            <div style={{flex: 1, height: 1, backgroundColor: 'rgba(128,128,128,0.15)'}}/>
            {subtotal !== undefined && (
                <span className="text-muted fw-semibold" style={{fontSize: '0.78rem', whiteSpace: 'nowrap'}}>
                    {subtotal.toFixed(2)} €
                </span>
            )}
        </div>
    );
}

export default BlockSeparator;
