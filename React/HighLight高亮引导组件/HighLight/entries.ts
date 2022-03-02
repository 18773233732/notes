import React from 'react';

type SinglePlacement = 'top' | 'bottom' | 'left' | 'right';

export type Placement = 'top' | 'left' | 'bottom' | 'right';

interface ModalStyle {
    position?: 'absolute' | 'fixed';
    top?: number;
    left?: number;
    width?: string;
    height?: string;

}
export interface BorderPadding {
    topPad?: number;
    leftPad?: number;
    rightPad?: number;
    bottomPad?: number;
}

export interface ModalOpts {
    title?: string;
    selector?: string;
    placement?: Placement;
    desc?: React.ReactNode;
    content?: string | React.ReactNode;
    offsetModal?: Record<'x' | 'y', number>;
    offsetArrow?: Record<'x' | 'y', number>;
}

export const getComputedStyle = (node: Element): CSSStyleDeclaration => window.getComputedStyle(node);

export const getAnchorEl = (selector: string): Element | null => {
    const type = typeof selector;

    if (type === 'string') {
        return document.querySelector(selector);
    }
    return null;
};


export const getReversePosition = (position: SinglePlacement): SinglePlacement => {
    const map: Record<SinglePlacement, SinglePlacement> = {
        bottom: 'top',
        top: 'bottom',
        left: 'right',
        right: 'left',
    };
    return map[position];
};

export const getArrowStyle = (
    modalEl: Element,
    placement: Placement = 'bottom',
    customOffset = { x: 0, y: 0 },
    custStyle = { width: 0, height: 0 }
): Record<string, string | number> => {
    const modalPos = modalEl.getBoundingClientRect();
    const diagonalWidth = 10;
    const extraStyle = {
        [getReversePosition(placement)]: -diagonalWidth / 2,
    };
    const offset = {
        x: customOffset.x || 0,
        y: customOffset.y || 0,
    };

    const style: { [key: string]: any } = {};
    if (['bottom', 'top'].includes(placement)) {
        style['right'] = ((custStyle.width ? custStyle.width : modalPos.width) - diagonalWidth) / 2 + offset.x;
    }
    if (['left', 'right'].includes(placement)) {
        style['top'] = ((custStyle.height ? custStyle.height : modalPos.height) - diagonalWidth) / 2 + offset.y;
    }

    return {
        ...style,
        ...extraStyle,
    };
};

export const getMaskStyle = (anchorEl: Element | null, maskBorderPading: BorderPadding): Record<string, number> => {
    const { scrollWidth, scrollHeight, scrollTop } = document.documentElement;
    document.documentElement.style.overflow = 'hidden';
    if (!anchorEl) return {};
    const anchorPos = anchorEl.getBoundingClientRect();
    const { height, width, left } = anchorPos;
    const top = anchorPos.top + scrollTop;
    const { topPad = 0, rightPad = 0, bottomPad = 0, leftPad = 0 } = maskBorderPading;

    return {
        width: scrollWidth,
        height: scrollHeight,
        borderTopWidth: Math.max(top - topPad, 0),
        borderBottomWidth: Math.max(scrollHeight - height - top - bottomPad, 0),
        borderRightWidth: Math.max(scrollWidth - width - left - rightPad, 0),
        borderLeftWidth: Math.max(left - leftPad, 0),
    };
};

export const getModalStyle = (
    modalEl: Element,
    anchorEl: Element | null,
    placement = 'right',
    customOffset = { x: 0, y: 0 },
): ModalStyle => {
    if (!anchorEl) return {};
    const MARGIN = 12;
    const modalPos = modalEl.getBoundingClientRect();
    const anchorPos = anchorEl.getBoundingClientRect();
    const parentPos = document.body.getBoundingClientRect();
    const top = anchorPos.top;
    const bottom = anchorPos.height + anchorPos.top;
    const left = anchorPos.left - parentPos.left;
    const { width, height } = anchorPos;
    const transform: Record<string, Record<string, number>> = {
        top: {
            top: top - modalPos.height - MARGIN,
            left: left + width / 2 - modalPos.width / 2,
        },
        bottom: {
            top: bottom + MARGIN,
            left: left + width / 2 - modalPos.width / 2,
        },
        left: {
            top: top + height / 2 - modalPos.height / 2,
            left: left - modalPos.width  - MARGIN,
        },
        right: {
            top: top + height / 2 - modalPos.height / 2,
            left: left + width + MARGIN,
        },
    };

    const offset = {
        x: customOffset.x || 0,
        y: customOffset.y || 0,
    };

    const position = transform[placement];
    return {
        position: 'absolute',
        top: position.top + offset.y,
        left: position.left + offset.x,
    };
};
