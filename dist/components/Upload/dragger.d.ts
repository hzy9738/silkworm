import React, { FC } from 'react';
interface DraggerProps {
    onFile: (file: FileList) => void;
    children: React.ReactNode;
}
export declare const Dragger: FC<DraggerProps>;
export default Dragger;
