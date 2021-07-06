// import { ObjectModel } from 'objectmodel'
// // declare const ObjectModel: any
// // const { Model, BasicModel, ObjectModel, ArrayModel, FunctionModel, MapModel, SetModel, Any } = require('https://umd.cdn.pika.dev/objectmodel/v4')

// export const UImsg = new ObjectModel({
//   cmd: String,
//   params: [Object],
// })

export interface UImsgType {
  cmd: string
  params: any
}

export const toCode = (msg = { cmd: 'init' }) => parent.postMessage({ pluginMessage: msg }, '*')
export const toUI = (cmd, params?) => figma.ui.postMessage({ cmd, params })

export const setCodeHandlers = (handlersRef = {}) => {
  figma.ui.onmessage = async (msg: UImsgType) => {
    const validUIMsg = msg // new UImsg(msg) as UImsgType // ObjectModel breaks in figma
    console.log(msg)
    if (typeof handlersRef[validUIMsg?.cmd] === 'function') {
      const { params } = validUIMsg
      handlersRef[validUIMsg.cmd](params)
    } else {
      console.log(`closing plugin ${validUIMsg.cmd === 'cancel' || 'unknown cmd'}`, JSON.stringify(validUIMsg, null, 1))
      figma.closePlugin()
    }
  }
}
export const setUiHandlers = (handlersRef = {}) => {
  onmessage = function handleOnMessage (event) {
    console.log('got this from the plugin code', event.data.pluginMessage)
    const { cmd, params } = event.data.pluginMessage
    if (typeof handlersRef[cmd] === 'function') {
      handlersRef[cmd](params)
    } else {
      console.log(`unknown cmd ${cmd} called with ${params} `)
    }
    // setpageExtents(event.data.pluginMessage)
  }
}
