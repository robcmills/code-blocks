// if the editable element is a code element, prevent the default behavior
// (which is to append a new code element)
// and manaually emulate (best attempt) the behavior 
// when code element has editablecontent attribute
// (which is to append new child text nodes)
export function insertNewlineAtCursor(element: HTMLElement) {
    const selection = window.getSelection();
    if (!selection) {
        console.warn('No selection found')
        return
    }
    const range = selection.getRangeAt(0);
    
    // Check if selection is within the target element
    if (!element.contains(range?.commonAncestorContainer)) {
        console.warn('Cursor is not inside the target element');
        return;
    }

    // Create and insert the newline
    const newline = document.createTextNode('\n');
    range.deleteContents();
    range.insertNode(newline);
    
    // Move cursor after the newline
    range.setStartAfter(newline);
    range.setEndAfter(newline);
    selection.removeAllRanges();
    selection.addRange(range);
    
    // Prevent default behavior
    element.dispatchEvent(new Event('input', { bubbles: true }));
}