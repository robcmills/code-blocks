export function appendCode(element: Element) {
  const codeElement = document.createElement('code')
  codeElement.appendChild(document.createElement('br'))
  codeElement.setAttribute('contentEditable', 'true')
  element.appendChild(codeElement)
  codeElement.focus()
}
