import React, {ReactNode} from 'react';

export type ViewProps = {
    children: ReactNode,
    className?: string
}

export type ScrollingViewProps = {
    children: ReactNode,
    className?: string,
    showsVerticalScrollIndicator?: boolean,
    showsHorizontalScrollIndicator?: boolean
}