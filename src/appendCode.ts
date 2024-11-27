export function appendCode(element: Element) {
  const codeElement = document.createElement('code')
  codeElement.appendChild(document.createElement('br'))
  element.appendChild(codeElement)
}
