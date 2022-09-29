import React from 'react';
export interface SubMenuProps {
    index?: string;
    title: string;
    children?: React.ReactNode;
    className?: string;
}
export declare const SubMenu: React.FC<SubMenuProps>;
export default SubMenu;
