import PNG from 'png-ts'

figma.showUI(__html__)

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
// Finds all  frame nodes
async function fractalize () {
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
}

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = async msg => {
  if (msg.type === 'fractal') fractalize()

  // Move the letter so that the center of its baseline is on the origin.
  // (estimate the baseline as being 70% down from the top of the box).
  //
  // We accomplish this by moving the letter so its top left is at (0, 0),
  // then moving the letter to the left and up by the appopriate amount.
  // letterNode.x = 0
  // letterNode.y = 0
  // letterNode.relativeTransform = multiply(move(-width/2, -0.7 * height), letterNode.relativeTransform)

  // Rotate the letter. Because we want to have the rotation angle be 0 at the top of the circle,
  // we need to subtract pi/2 before applying the rotation to the text.
  // letterNode.relativeTransform = multiply(rotate(angle - pi / 2), letterNode.relativeTransform)

  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'create-rectangles') {
    const nodes: SceneNode[] = []
    const howMany = msg.count
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
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin()
}
