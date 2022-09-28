import { DataSourceType } from './autoComplete'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import AutoComplete from './index'

import React from '_@types_react@18.0.20@@types/react'

interface FakerPlayerProps {
    value: string;
    number: number;
}

const SimpleComplete = () => {
  const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins', 'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']
  const handleFetch1 = (query: string) => {
    return lakers.filter(name => name.includes(query)).map(name => ({ value: name }))
  }

  return (
    <AutoComplete
      fetchSuggestions={handleFetch1}
      onSelect={action('selected')}
    />
  )
}

const renderOptionComplete = () => {
  const lakersWithNumber = [
    { value: 'bradley', number: 11 },
    { value: 'pope', number: 1 },
    { value: 'caruso', number: 4 },
    { value: 'cook', number: 2 },
    { value: 'cousins', number: 15 },
    { value: 'james', number: 23 },
    { value: 'AD', number: 3 },
    { value: 'green', number: 14 },
    { value: 'howard', number: 39 },
    { value: 'kuzma', number: 0 }
  ]
  const handleFetch2 = (query: string) => {
    return lakersWithNumber.filter(item => item.value.includes(query))
  }
  const renderOption = (item: DataSourceType) => {
    const renderItem = item as DataSourceType<FakerPlayerProps>
    return (
      <>
        <h2>Value: {renderItem.value}</h2>
        <p>Number: {renderItem.number}</p>
      </>
    )
  }
  return (
    <AutoComplete
      fetchSuggestions={handleFetch2}
      onSelect={action('selected')}
      renderOption={renderOption}
    />
  )
}

const AsyncComplete = () => {
  const handleFetch3 = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        // console.log(items)
        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
      })
  }
  return (
    <AutoComplete
      fetchSuggestions={handleFetch3}
      onSelect={action('selected')}
    />
  )
}

storiesOf('AutoComplete Component', module)
  .add('AutoComplete', SimpleComplete)
  .add('自定义选项的 AutoComplete', renderOptionComplete)
  .add('异步的 AutoComplete', AsyncComplete)
