import PNG from 'png-ts'
import { setCodeHandlers, toUI, UImsgType } from './data/messaging'

// TODO find  .pagesPanel and set x to dock in top left of actual page
figma.showUI(__html__, { width: 400, height: 700 })

const baseImageFill = {
  blendMode: 'NORMAL',
  filters: {
    contrast: 0,
    exposure: 0,
    highlights: 0,
    saturation: 0,
    shadows: 0,
    temperature: 0,
    tint: 0,
  },
  imageHash: '',
  imageTransform: [[1, 0, 0], [0, 1, 0]],
  opacity: 1,
  rotation: 0,
  scaleMode: 'FILL',
  scalingFactor: 0.5,
  type: 'IMAGE',
  visible: true,
}

export const getExtents = () => {
  const nodes = figma.currentPage.children
  console.log('getExtents with', nodes)

  const extents = { x: 1000000, y: 1000000, width: 0, height: 0, right: 0, bot: 0 }
  for (const eachNode of nodes) {
    extents.x = Math.min(extents.x, eachNode.x)
    extents.y = Math.min(extents.y, eachNode.y)
    extents.right = Math.max(extents.right, eachNode.x + eachNode.width)
    extents.bot = Math.max(extents.bot, eachNode.y + eachNode.height)
  }
  extents.width = extents.right - extents.x
  extents.height = extents.bot - extents.y
  console.log(extents)
  return extents
}

let isInitialized = false
const handlers = {
  async init () {
    if (isInitialized) {
      return console.log('init called in code again')
    }
    toUI('setpageExtents', getExtents())
    isInitialized = true
  },
  async getExtents () {
    toUI('setpageExtents', getExtents())
  },
  async  fractal () {
    // @ts-expect-error
    const nodes: FrameNode[] = figma.currentPage.children.filter(node => node.type === 'FRAME')
    for (const N of nodes) {
      const eachN: FrameNode = N
      const newBytes = await eachN.exportAsync()

      const pngImage = PNG.load(newBytes)/* Uint8Array containing bytes of PNG image */
      const pixels = pngImage.decodePixels() // `pixels` is a 1D array (in rgba order) of decoded pixel data
      console.log(pixels, eachN.getPluginData('z'))

      const imageHash = figma.createImage(newBytes).hash
      for (const eachC of (eachN.children[0] as GroupNode).children) {
        const thisRect = (eachC as RectangleNode)
        console.log(thisRect, thisRect.fills)
        // @ts-expect-error
        thisRect.fills = [{ ...baseImageFill, imageHash }]
      }
    }
  },
  async createRectangles (params) {
    const nodes: SceneNode[] = []
    const howMany = params.count
    for (let i = 0; i < howMany; i++) {
      const rect = figma.createRectangle()
      rect.y = 150
      rect.rotation = i * (360 / howMany) - 180
      const b = (25.5 * howMany) / 255
      const tone = (i / 10)
      rect.fills = [{ type: 'SOLID', color: { r: tone, g: tone, b } }]
      rect.setPluginData('z', i.toString())
      figma.currentPage.appendChild(rect)
      nodes.push(rect)
    }

    const frame: FrameNode = figma.createFrame()
    frame.clipsContent = false
    const newGroup = figma.group(nodes, figma.currentPage)
    frame.resize(newGroup.width, newGroup.height)
    frame.x = newGroup.x
    frame.y = newGroup.y
    newGroup.x = newGroup.y = 0
    newGroup.name = `group of ${howMany}`
    frame.name = `frame_${howMany}`
    frame.setPluginData('z', howMany.toString())
    frame.appendChild(newGroup)
    frame.fills = []
    figma.currentPage.selection = [frame]
    figma.viewport.scrollAndZoomIntoView(nodes)

    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    figma.closePlugin()
  },
}

setCodeHandlers(handlers)
// figma.ui.onmessage = async (msg: UImsgType) => {
//   const validUIMsg = msg // new UImsg(msg) as UImsgType // ObjectModel breaks in figma
//   console.log(msg)
//   if (typeof handlers[validUIMsg?.cmd] === 'function') {
//     const { params } = validUIMsg
//     handlers[validUIMsg.cmd](params)
//   } else {
//     console.log(`closing plugin ${validUIMsg.cmd === 'cancel' || 'unknown cmd'}`, JSON.stringify(validUIMsg, null, 1))
//     figma.closePlugin()
//   }
// }
