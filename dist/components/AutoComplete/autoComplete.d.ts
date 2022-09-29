import { InputProps } from '../Input/input';
import { FC, ReactElement } from 'react';
interface DataSourceObject {
    value: string;
}
export declare type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: string) => void;
    renderOption?: (item: DataSourceType) => ReactElement;
}
/**
 * AutoComplete 下拉输入框 通过鼠标或键盘输入内容。
 *
 * ~~~js
 * // 这样引用
 * import { AutoComplete } from 'silkworm'
 * ~~~
 */
export declare const AutoComplete: FC<AutoCompleteProps>;
export default AutoComplete;
