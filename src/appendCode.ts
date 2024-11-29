export function appendCode(element: Element) {
  const codeElement = document.createElement('code')
  codeElement.appendChild(document.createElement('br'))
  codeElement.onkeydown = (event) => {
    console.log('codeElement', { event, key: event.key })
  }
  element.appendChild(codeElement)
}
