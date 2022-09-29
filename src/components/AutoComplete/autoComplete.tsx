import { Input, InputProps } from '../Input/input'
import { ChangeEvent, KeyboardEvent, FC, ReactElement, useEffect, useState, useRef } from 'react'
import Icon from '../Icon/icon'
import classNames from 'classnames'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'

interface DataSourceObject {
    value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: string) => void;
    renderOption?: (item: DataSourceType) => ReactElement
}

/**
 * AutoComplete 下拉输入框 通过鼠标或键盘输入内容。
 *
 * ~~~js
 * // 这样引用
 * import { AutoComplete } from 'xxui'
 * ~~~
 */
export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, renderOption, value, ...restProps } = props
  const [inputValue, setInputValue] = useState(value as string)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  // console.log(suggestions)
  const componentRef = useRef<HTMLDivElement>(null)
  const triggerSearch = useRef(false)

  const debouncedValue = useDebounce(inputValue, 500)

  useClickOutside(componentRef, () => { setSuggestions([]) })
  console.log(componentRef)
  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      const results = fetchSuggestions(debouncedValue)
      if (results instanceof Promise) {
        setLoading(true)
        results.then(data => {
          setLoading(false)
          setSuggestions(data)
        })
      } else {
        setSuggestions(results)
      }
    } else {
      setSuggestions([])
    }
    setHighlightIndex(-1)
  }, [debouncedValue])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggestions([])
    if (onSelect) {
      onSelect(item.value)
    }
    triggerSearch.current = false
  }

  const highlight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighlightIndex(index)
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13: // enter
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break
      case 38: // 上移
        highlight(highlightIndex - 1)
        break
      case 40: // 下移
        highlight(highlightIndex + 1)
        break
      case 27: // esc
        setSuggestions([])
        break
      default :
        break
    }
  }
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }
  const generateDropdown = () => {
    return (
      <ul className='silkworm-suggestion-list'>
        {loading &&
                  <div className='suggstions-loading-icon'>
                    <Icon icon='spinner' spin/>
                  </div>
        }
        {suggestions.map((item, index) => {
          const cnames = classNames('suggestion-item', {
            'is-active': index === highlightIndex
          })
          return (
            <li className={cnames} key={index} onClick={() => handleSelect(item)}>
              {renderTemplate(item)}
            </li>
          )
        })}
      </ul>
    )
  }
  return (
    <div className='silkworm-auto-complete' ref={componentRef}>
      <Input value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps} >
      </Input>
      {generateDropdown()}
    </div>
  )
}

export default AutoComplete
