import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import { getArrowStyle, getModalStyle, ModalOpts } from '../entries';

interface ModalProps {
    onClose: Function;
    modalOpts: ModalOpts;
    anchorEl: Element | null;
}

const PREFIX = 'YSHighLightModal';

const Modal = ({ modalOpts, onClose, anchorEl }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const timerRef = useRef<number>(0);
    const { title, content, desc } = modalOpts;
    const [modalStyle, setModalStyle] = useState({});
    const [arrowStyle, setArrowStyle] = useState({});
    const calculateStyle = () => {
        const { placement, offsetModal, offsetArrow } = modalOpts;
        const modalEl = modalRef?.current;
        if (modalEl) {
            const modalStyle = getModalStyle(modalEl, anchorEl, placement, offsetModal);
            const arrowStyle = getArrowStyle(modalEl, placement, offsetArrow);
            setModalStyle(modalStyle);
            setArrowStyle(arrowStyle);
        }
    };

    const handleResize = () => {
        if (timerRef.current) window.cancelAnimationFrame(timerRef.current);
        timerRef.current = window.requestAnimationFrame(() => {
            calculateStyle();
        });
    };

    useEffect(() => {
        calculateStyle();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [anchorEl]);

    return anchorEl
        ? ReactDOM.createPortal(
            <div ref={modalRef} className={`${PREFIX}`} style={modalStyle}>
                {title && <div className={`${PREFIX}-title`}>{title}</div>}
                {desc && <div className={`${PREFIX}-desc`}>{desc}</div>}
                {<span className={`${PREFIX}-arrow`} style={arrowStyle} />}
                {content && <div className={`${PREFIX}-content`}>{content}</div>}
                <div className={`${PREFIX}-footer`}>
                    <Button onClick={onClose}>
                        OK
                    </Button>
                </div>
            </div>,
            document.body
        )
        : null;
};

export default Modal;
