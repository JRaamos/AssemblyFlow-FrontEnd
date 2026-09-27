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

  useEffect(() => {
    const editor = editorRef.current
    const sanitizedValue = sanitizeDocumentHtml(value || '')
    if (editor && editor.innerHTML !== sanitizedValue) editor.innerHTML = sanitizedValue
  }, [value])

  return (
    <EditorContainer>
      <div
        ref={editorRef}
        className="structured-editor"
        contentEditable
        suppressContentEditableWarning
        onInput={(event) => onChange?.(sanitizeDocumentHtml(event.currentTarget.innerHTML))}
      />
    </EditorContainer>
  )
}

export default function LetterEditor({ preserveStructure = false, ...props }) {
  return preserveStructure
    ? <StructuredLetterEditor {...props} />
    : <QuillLetterEditor {...props} />
}
