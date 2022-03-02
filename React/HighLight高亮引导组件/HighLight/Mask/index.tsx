import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { getMaskStyle, BorderPadding } from '../entries';

interface MaskProps {
    anchorEl: Element | null;
    maskBorderPading?: BorderPadding;
}

const PREFIX = 'YSHighLightMask';

const Mask = ({ anchorEl, maskBorderPading = {} }: MaskProps) => {
    const [style, setStyle] = useState<Record<string, number>>({});
    const timerRef = useRef<number>(0);
    const calculateStyle = () => {
        const style = getMaskStyle(anchorEl, maskBorderPading);
        setStyle(style);
    };
    const handleResize = (): void => {
        if (timerRef.current) window.cancelAnimationFrame(timerRef.current);
        timerRef.current = window.requestAnimationFrame(() => {
            calculateStyle();
        });
    };

    // 计算遮罩层
    useEffect(() => {
        calculateStyle();
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [anchorEl]);

    return anchorEl ? ReactDOM.createPortal(<div className={`${PREFIX}`} style={style} />, document.body) : null;
};

export default Mask;
