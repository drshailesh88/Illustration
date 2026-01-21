/**
 * TextTool - Add and edit text on canvas
 * Click to add text, click on existing text to edit
 */
import { BaseTool } from './BaseTool.js';
import * as fabric from 'fabric';

export class TextTool extends BaseTool {
  constructor(editor) {
    super(editor);
    this.currentText = null;
    this.isEditing = false;
    this.defaultFontFamily = 'Arial';
    this.defaultFontSize = 24;
    this.defaultFill = '#000000';
  }

  get name() {
    return 'text';
  }

  get shortcut() {
    return 't';
  }

  getCursor() {
    return 'text';
  }

  onActivate() {
    if (this.canvas) {
      this.canvas.selection = false;
      this.canvas.forEachObject((obj) => {
        // Allow clicking on text objects to edit them
        obj.selectable = obj.type === 'i-text' || obj.type === 'textbox';
        obj.evented = obj.type === 'i-text' || obj.type === 'textbox';
      });
    }
    this.emit('tool:activated', { tool: this.name });
  }

  onDeactivate() {
    // Exit text editing mode if active
    if (this.currentText && this.isEditing) {
      this.currentText.exitEditing();
    }
    this.currentText = null;
    this.isEditing = false;
    this.emit('tool:deactivated', { tool: this.name });
  }

  onMouseDown(e) {
    super.onMouseDown(e);

    if (!this.canvas) return;

    const target = e.target;

    if (target && (target.type === 'i-text' || target.type === 'textbox')) {
      // Clicked on existing text - enter edit mode
      this.currentText = target;
      this.enterEditMode();
    } else if (!this.isEditing) {
      // Clicked on empty space - create new text
      this.createText(this.startPoint);
    }
  }

  onMouseMove(e) {
    super.onMouseMove(e);
    // No special behavior during mouse move for text tool
  }

  onMouseUp(e) {
    super.onMouseUp(e);
    // No special behavior during mouse up for text tool
  }

  onKeyDown(e) {
    // Escape to exit editing and deselect
    if (e.key === 'Escape') {
      if (this.currentText && this.isEditing) {
        this.exitEditMode();
        e.preventDefault();
      }
    }
  }

  /**
   * Create new text at position
   * @param {Object} position - {x, y}
   */
  createText(position) {
    if (!this.canvas) return;

    // Create an IText object (interactive text)
    this.currentText = new fabric.IText('Text', {
      left: position.x,
      top: position.y,
      fontFamily: this.defaultFontFamily,
      fontSize: this.defaultFontSize,
      fill: this.defaultFill,
      selectable: true,
      evented: true,
      editable: true
    });

    this.canvas.add(this.currentText);

    // Enter edit mode immediately
    this.enterEditMode();

    // Select all text for easy replacement
    this.currentText.selectAll();

    this.emit('text:created', { text: this.currentText });
  }

  /**
   * Enter text editing mode
   */
  enterEditMode() {
    if (!this.currentText || !this.canvas) return;

    this.isEditing = true;
    this.canvas.setActiveObject(this.currentText);
    this.currentText.enterEditing();

    this.emit('text:editing:start', { text: this.currentText });
  }

  /**
   * Exit text editing mode
   */
  exitEditMode() {
    if (!this.currentText) return;

    this.currentText.exitEditing();
    this.isEditing = false;

    // Remove empty text objects
    if (this.currentText.text.trim() === '') {
      this.canvas?.remove(this.currentText);
      this.emit('text:removed', { reason: 'empty' });
    } else {
      this.currentText.setCoords();
      this.emit('text:editing:end', { text: this.currentText });
    }

    this.canvas?.requestRenderAll();
  }

  /**
   * Set default font family
   * @param {string} fontFamily
   */
  setFontFamily(fontFamily) {
    this.defaultFontFamily = fontFamily;
    if (this.currentText && this.isEditing) {
      this.currentText.set('fontFamily', fontFamily);
      this.canvas?.requestRenderAll();
    }
  }

  /**
   * Set default font size
   * @param {number} fontSize
   */
  setFontSize(fontSize) {
    this.defaultFontSize = fontSize;
    if (this.currentText && this.isEditing) {
      this.currentText.set('fontSize', fontSize);
      this.canvas?.requestRenderAll();
    }
  }

  /**
   * Set text color
   * @param {string} color
   */
  setFill(color) {
    this.defaultFill = color;
    if (this.currentText && this.isEditing) {
      this.currentText.set('fill', color);
      this.canvas?.requestRenderAll();
    }
  }

  /**
   * Toggle bold
   */
  toggleBold() {
    if (!this.currentText) return;

    const isBold = this.currentText.fontWeight === 'bold';
    this.currentText.set('fontWeight', isBold ? 'normal' : 'bold');
    this.canvas?.requestRenderAll();

    this.emit('text:style:changed', { style: 'bold', value: !isBold });
  }

  /**
   * Toggle italic
   */
  toggleItalic() {
    if (!this.currentText) return;

    const isItalic = this.currentText.fontStyle === 'italic';
    this.currentText.set('fontStyle', isItalic ? 'normal' : 'italic');
    this.canvas?.requestRenderAll();

    this.emit('text:style:changed', { style: 'italic', value: !isItalic });
  }

  /**
   * Toggle underline
   */
  toggleUnderline() {
    if (!this.currentText) return;

    const isUnderline = this.currentText.underline;
    this.currentText.set('underline', !isUnderline);
    this.canvas?.requestRenderAll();

    this.emit('text:style:changed', { style: 'underline', value: !isUnderline });
  }

  /**
   * Set text alignment
   * @param {string} align - 'left', 'center', 'right', 'justify'
   */
  setTextAlign(align) {
    if (!this.currentText) return;

    this.currentText.set('textAlign', align);
    this.canvas?.requestRenderAll();

    this.emit('text:align:changed', { align });
  }

  /**
   * Create a text box with wrapping
   * @param {Object} position - {x, y}
   * @param {number} width - Box width
   * @param {Object} options - Additional options
   * @returns {fabric.Textbox}
   */
  createTextbox(position, width = 200, options = {}) {
    if (!this.canvas) return null;

    const textbox = new fabric.Textbox('Text', {
      left: position.x,
      top: position.y,
      width: width,
      fontFamily: this.defaultFontFamily,
      fontSize: this.defaultFontSize,
      fill: this.defaultFill,
      selectable: true,
      evented: true,
      editable: true,
      ...options
    });

    this.canvas.add(textbox);
    this.canvas.setActiveObject(textbox);
    textbox.enterEditing();
    textbox.selectAll();

    this.emit('textbox:created', { textbox });

    return textbox;
  }
}

export default TextTool;
