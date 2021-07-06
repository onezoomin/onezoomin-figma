import { h, render } from 'preact'
import { useRef, useEffect, useState } from 'preact/hooks'
import 'tailwindcss/tailwind.css'
import 'figma-plugin-ds/dist/figma-plugin-ds.css'

import { Buttons } from './components/Buttons'
import { setUiHandlers, toCode } from './data/messaging'

toCode({ cmd: 'init' })

export const Ui = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => inputRef?.current?.focus(), [inputRef])
  const [pageExtents, setpageExtents] = useState({})

  const handlers = {
    async setpageExtents (extents) {
      console.log('setpageExtents')
      setpageExtents(extents)
    },
  }
  setUiHandlers(handlers)
  // onmessage = (event) => {
  //   console.log('got this from the plugin code', event.data.pluginMessage)
  //   setpageExtents(event.data.pluginMessage)
  // }

  return (
    <div className="flex p-3 h-full flex-col justify-around">
      <div className="onboarding-tip">
        <div onClick={() => toCode({ cmd: 'getExtents' })} className="icon icon--swap" />
        <div className="onboarding-tip__msg"><pre>{JSON.stringify(pageExtents, null, 1)}</pre></div>
      </div>
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
