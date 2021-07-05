import { h } from 'preact'
import { appendClassNames } from './utils'

const onCreate = (/* ev: MouseEvent */) => {
  const textbox = document.getElementById('amount')
  const count = parseInt((textbox as HTMLInputElement).value, 10)
  parent.postMessage({ pluginMessage: { type: 'create-rectangles', count } }, '*')
}
const onFractal = () => {
  parent.postMessage({ pluginMessage: { type: 'fractal' } }, '*')
}

const onCancel = () => {
  parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
}

export const Button = ({ children = '', className = '', ...restProps }) => {
  return (
    <button {...appendClassNames('button', className)} {...restProps}>{children}</button>
  )
}
export const Buttons = () => {
  return (
    <div className="flex flex-row justify-around">
      <Button className="button--primary" onclick={onCreate} id="create">Create</Button>
      <Button className="button--secondary" onclick={onFractal} id="fractal">Fractal</Button>
      <Button className="button--secondary" onclick={onCancel} id="cancel">Cancel</Button>
    </div>
  )
}
