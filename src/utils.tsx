// import { h } from 'preact'

/** Ternary expressions in JSX look ugly */
// export const rIF = (condition: any, contentOrRender: React.ReactNode|(() => React.ReactNode)) => {
//   return condition
//     ? (typeof contentOrRender === 'function' ? contentOrRender() : contentOrRender)
//     : null
// }

/** Extend classes if given */
export const appendClassNames = (
  className: string,
  additional: string = '',
) => {
  return { className: `${className} ${additional}` }
}

export const hasScrollOverflowY = (elem: HTMLElement|undefined) => {
  console.debug('hasScrollOverflowY', elem?.scrollHeight, elem?.clientHeight)
  return !!elem && elem.scrollHeight > elem.clientHeight
}
