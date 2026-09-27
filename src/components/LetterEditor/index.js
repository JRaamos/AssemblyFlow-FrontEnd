import React, { useMemo, useEffect, useRef } from 'react'
import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'
import styled from 'styled-components'
import { sanitizeDocumentHtml } from 'services/assembly/sanitize'

// 🎨 Estilos do container principal
const EditorContainer = styled.div`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  max-height: 600px;
  min-width: 0;

  .ql-toolbar {
    background: #f9fafb;
    border: none;
    border-bottom: 1px solid #e5e7eb;
    border-radius: 12px 12px 0 0;
    padding: 8px 12px;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .ql-container {
    border: none !important;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    line-height: 1.6;
    color: #111827;
    flex: 1;
    overflow-y: auto;
    padding: 16px;
  }

  .ql-editor {
    min-height: 180px;
  }

  .ql-editor.ql-blank::before {
    color: #9ca3af;
    font-style: italic;
  }

  .ql-toolbar button:hover,
  .ql-toolbar .ql-picker:hover {
    background: #f3f4f6;
  }

  .ql-toolbar .ql-active {
    background: #e0e7ff;
  }

  .structured-editor {
    min-height: 260px;
    padding: 18px;
    overflow-y: auto;
    color: #111827;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    line-height: 1.55;
    outline: none;
  }

  .structured-toolbar {
    display: flex;
    position: sticky;
    z-index: 10;
    top: 0;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
    padding: 8px 10px;
    border-bottom: 1px solid #e5e7eb;
    background: #f9fafb;
  }

  .structured-toolbar button,
  .structured-toolbar select {
    min-width: 34px;
    height: 32px;
    padding: 0 9px;
    border: 1px solid transparent;
    border-radius: 6px;
    background: transparent;
    color: #334155;
    font: inherit;
    cursor: pointer;
  }

  .structured-toolbar button:hover,
  .structured-toolbar select:hover {
    border-color: #cbd5e1;
    background: #ffffff;
  }

  .structured-toolbar select {
    min-width: 128px;
    border-color: #d7dee8;
    background: #ffffff;
  }

  .toolbar-divider {
    width: 1px;
    height: 22px;
    margin: 0 2px;
    background: #d7dee8;
  }

  .structured-editor p {
    margin: 0 0 10px;
  }

  .structured-editor .document-facts > div {
    display: grid;
    grid-template-columns: minmax(170px, 0.8fr) minmax(0, 1.2fr);
    gap: 12px;
  }

  .structured-editor .document-facts dt {
    color: #155eaa;
    font-weight: 700;
  }

  .structured-editor .document-facts dd {
    margin: 0;
  }

  .text-size-small { font-size: 0.85em; }
  .text-size-normal { font-size: 1em; }
  .text-size-large { font-size: 1.2em; }
  .text-size-huge { font-size: 1.5em; }

  @media (max-width: 640px) {
    border-radius: 8px;

    .ql-toolbar,
    .structured-toolbar {
      position: static;
      padding: 7px;
    }

    .ql-container,
    .structured-editor {
      padding: 12px;
      font-size: 14px;
    }

    .structured-toolbar select {
      min-width: 112px;
      max-width: 100%;
    }

    .structured-editor .document-facts > div {
      grid-template-columns: 1fr;
      gap: 2px;
      margin-bottom: 8px;
    }
  }
`

function QuillLetterEditor({
  value,
  onChange,
  placeholder = 'Escreva aqui...'
}) {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        [{ size: ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        ['link', 'blockquote'],
        ['clean']
      ]
    }),
    []
  )

  const formats = [
    'header',
    'size',
    'bold',
    'italic',
    'underline',
    'list',
    'bullet',
    'align',
    'link',
    'blockquote',
  ]

  const { quill, quillRef } = useQuill({
    theme: 'snow',
    modules,
    formats,
    placeholder
  })

  // sincroniza valor externo → editor
  useEffect(() => {
    if (quill && value !== quill.root.innerHTML) {
      quill.root.innerHTML = sanitizeDocumentHtml(value || '')
    }
  }, [value, quill])

  // sincroniza editor → valor externo
  useEffect(() => {
    if (quill) {
      const handleTextChange = () => {
        onChange?.(sanitizeDocumentHtml(quill.root.innerHTML))
      }
      quill.on('text-change', handleTextChange)
      return () => quill.off('text-change', handleTextChange)
    }
  }, [quill, onChange])

  return (
    <EditorContainer>
      <div ref={quillRef} />
    </EditorContainer>
  )
}

function StructuredLetterEditor({ value, onChange }) {
  const editorRef = useRef(null)
  const selectionRef = useRef(null)

  const rememberSelection = () => {
    const selection = window.getSelection()
    if (!selection?.rangeCount || !editorRef.current?.contains(selection.anchorNode)) return
    selectionRef.current = selection.getRangeAt(0).cloneRange()
  }

  const restoreSelection = () => {
    const selection = window.getSelection()
    if (!selection || !selectionRef.current) return
    selection.removeAllRanges()
    selection.addRange(selectionRef.current)
  }

  const normalizeMarkup = () => {
    const editor = editorRef.current
    if (!editor) return

    editor.querySelectorAll('font[size]').forEach((font) => {
      const sizeMap = {
        1: 'small',
        2: 'small',
        3: 'normal',
        4: 'large',
        5: 'huge',
        6: 'huge',
        7: 'huge',
      }
      const replacement = document.createElement('span')
      replacement.className = `text-size-${sizeMap[font.getAttribute('size')] || 'normal'}`
      replacement.append(...font.childNodes)
      font.replaceWith(replacement)
    })

    editor.querySelectorAll('[style]').forEach((element) => {
      const alignment = element.style.textAlign
      element.removeAttribute('style')
      element.classList.remove('ql-align-center', 'ql-align-right', 'ql-align-justify')
      if (['center', 'right', 'justify'].includes(alignment)) {
        element.classList.add(`ql-align-${alignment}`)
      }
    })
  }

  const emitChange = () => {
    normalizeMarkup()
    const editor = editorRef.current
    if (!editor) return
    const sanitizedValue = sanitizeDocumentHtml(editor.innerHTML)
    if (editor.innerHTML !== sanitizedValue) editor.innerHTML = sanitizedValue
    onChange?.(sanitizedValue)
    rememberSelection()
  }

  const runCommand = (command, commandValue = null) => {
    editorRef.current?.focus()
    restoreSelection()
    document.execCommand(command, false, commandValue)
    emitChange()
  }

  const preventToolbarBlur = (event) => event.preventDefault()

  useEffect(() => {
    const editor = editorRef.current
    const sanitizedValue = sanitizeDocumentHtml(value || '')
    if (editor && editor.innerHTML !== sanitizedValue) editor.innerHTML = sanitizedValue
  }, [value])

  return (
    <EditorContainer>
      <div className="structured-toolbar" aria-label="Formatação do modelo base">
        <select
          aria-label="Tamanho da letra"
          defaultValue="3"
          onMouseDown={rememberSelection}
          onChange={(event) => runCommand('fontSize', event.target.value)}
        >
          <option value="2">Pequena</option>
          <option value="3">Normal</option>
          <option value="4">Grande</option>
          <option value="5">Muito grande</option>
        </select>
        <span className="toolbar-divider" />
        <button type="button" aria-label="Negrito" title="Negrito" onMouseDown={preventToolbarBlur} onClick={() => runCommand('bold')}><strong>B</strong></button>
        <button type="button" aria-label="Itálico" title="Itálico" onMouseDown={preventToolbarBlur} onClick={() => runCommand('italic')}><em>I</em></button>
        <button type="button" aria-label="Sublinhado" title="Sublinhado" onMouseDown={preventToolbarBlur} onClick={() => runCommand('underline')}><u>U</u></button>
        <span className="toolbar-divider" />
        <button type="button" aria-label="Alinhar à esquerda" title="Alinhar à esquerda" onMouseDown={preventToolbarBlur} onClick={() => runCommand('justifyLeft')}>≡</button>
        <button type="button" aria-label="Centralizar" title="Centralizar" onMouseDown={preventToolbarBlur} onClick={() => runCommand('justifyCenter')}>≣</button>
        <button type="button" aria-label="Alinhar à direita" title="Alinhar à direita" onMouseDown={preventToolbarBlur} onClick={() => runCommand('justifyRight')}>≡</button>
        <button type="button" aria-label="Justificar" title="Justificar" onMouseDown={preventToolbarBlur} onClick={() => runCommand('justifyFull')}>☰</button>
        <span className="toolbar-divider" />
        <button type="button" aria-label="Lista com marcadores" title="Lista com marcadores" onMouseDown={preventToolbarBlur} onClick={() => runCommand('insertUnorderedList')}>• Lista</button>
        <button type="button" aria-label="Limpar formatação" title="Limpar formatação" onMouseDown={preventToolbarBlur} onClick={() => runCommand('removeFormat')}>Limpar</button>
      </div>
      <div
        ref={editorRef}
        className="structured-editor"
        contentEditable
        suppressContentEditableWarning
        onInput={emitChange}
        onKeyUp={rememberSelection}
        onMouseUp={rememberSelection}
      />
    </EditorContainer>
  )
}

export default function LetterEditor({ preserveStructure = false, ...props }) {
  return preserveStructure
    ? <StructuredLetterEditor {...props} />
    : <QuillLetterEditor {...props} />
}
