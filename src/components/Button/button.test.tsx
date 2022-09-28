import { fireEvent, render } from '@testing-library/react'
import Button from './button'

test('react button test case', () => {
  const wrapper = render(<Button>Nice</Button>)
  const element = wrapper.getByText('Nice') as HTMLButtonElement
  expect(element).toBeInTheDocument()
  expect(element.tagName).toEqual('BUTTON')
  expect(element).toHaveClass('btn btn-default')
  expect(element.disabled).toBeFalsy()
  fireEvent.click(element)
})
