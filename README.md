# Code Blocks

Experimenting with a text field that allows embedded code blocks.

I experimented with an approach that used contenteditable attribute, but it was difficult to override the default native behaviors. For example when pressing enter when the cursor was inside a nested code block, the native behavior was poor, it would create a new code block instead of inserting a newline. But calling preventDefault and emulating other native behaviors was difficult.

I felt like a better approach to fighting with the native behaviors, was to build up our own textarea from scratch. The current approach does not use any input, textarea, or contenteditable elements.

The drawback to this approach is that it is a lot of work to build up the functionality of a textarea from scratch. However, once this basic set of foundational behaviors are built, it becomes very easy to modify and extend them with additional "rich text" behaviors.

This has basically devolved into just building a subset of a rich text editor.

### Todo:

- [ ] ArrowUp/Down horizontal drift
      The simple algo used is always relative to the cursor's current position, which can shift horizontally as the cursor moves between lines. A better approach would be to track an xAnchor position, which would initialized to the center of the cursor's curren position at the start of the up/down movement, and remains as long as movement is a sequence of up/down movements, and is reset if any other action is taken.
- [ ] Meta + ArrowLeft/Right support for wrapped lines
- [ ] Alt + ArrowLeft/Right to move between words
