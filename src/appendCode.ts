export function appendCode(element: Element) {
  const preElement = document.createElement('pre')
  const codeElement = document.createElement('code')
  preElement.appendChild(codeElement)
  codeElement.appendChild(document.createElement('br'))
  element.appendChild(preElement)
}
