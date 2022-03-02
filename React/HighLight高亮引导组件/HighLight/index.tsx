import React, { useEffect, useState } from 'react';
import Mask from './Mask';
import Modal from './Modal';
import { getAnchorEl } from './entries';
import { BorderPadding, ModalOpts } from './entries';
import './index.less';

interface HighLightProps {
    onClose?: Function;
    onBefore?: Function;
    highLightSelector: string;
    modalOpts: ModalOpts;
    content?: React.ReactNode;
    maskBorderPading?: BorderPadding;
}

const HighLight = (props: HighLightProps) => {
    const { maskBorderPading, highLightSelector, modalOpts, onClose, onBefore } = props;
    const [anchorEl, setAnchorEl] = useState<Element | null>();

    const handleClose = (): void => {
        // 移除 Mask 和 Modal 组件卸载
        onClose?.();
        setAnchorEl(null);
    };

    // 组件挂载前钩子
    useEffect(() => {
        onBefore?.();
    }, []);

    // 获取需要高亮的元素
    useEffect(() => {
        setAnchorEl(getAnchorEl(highLightSelector));
    });

    return anchorEl ? (
        <>
            <Mask anchorEl={anchorEl} maskBorderPading={maskBorderPading} />
            <Modal anchorEl={anchorEl} modalOpts={modalOpts} onClose={handleClose} />
        </>
    ) : null;
};

export default HighLight;
