import { h, render } from 'preact'
import { useRef, useEffect } from 'preact/hooks'
import 'tailwindcss/tailwind.css'
import 'figma-plugin-ds/dist/figma-plugin-ds.css'

import { Buttons } from './Buttons'

export const Ui = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => inputRef?.current?.focus(), [inputRef])
  return (
    <div className="flex p-3 h-full flex-col justify-around">
      <h2 className="text-center">Fractal Rectangle Creator
        <div className="onboarding-tip">
          <div className="icon icon--styles" />
          <div className="onboarding-tip__msg">Create stars from rotated rectangles and fractalize them using pixel magic</div>
        </div>
      </h2>
      <div className="flex p-3 h-full flex-row justify-between">
        <div className="p-1 w-1/6">Amount:</div>
        <div className="input w-4/6" >
          <input ref={inputRef} id="amount" type="input" className="input__field" value="5" />
        </div>
      </div>
      <Buttons />
    </div>
  )
}

render(<Ui />, document.getElementById('preact') ?? document.body)
