import React, { useMemo, useEffect } from 'react'
import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'
import styled from 'styled-components'

// 🎨 Estilos do container principal
const EditorContainer = styled.div`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  .ql-toolbar {
    background: #f9fafb;
    border: none;
    border-bottom: 1px solid #e5e7eb;
    border-radius: 12px 12px 0 0;
    padding: 8px 12px;
  }

  .ql-container {
    border: none !important;
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    line-height: 1.6;
    color: #111827;
    min-height: 220px;
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
`

export default function LetterEditor({
  value,
  onChange,
  placeholder = 'Escreva aqui...'
}) {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        ['link', 'blockquote', 'code-block'],
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
    'strike',
    'list',
    'bullet',
    'align',
    'link',
    'blockquote',
    'code-block'
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
      quill.root.innerHTML = value || ''
    }
  }, [value, quill])

  // sincroniza editor → valor externo
  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        onChange?.(quill.root.innerHTML)
      })
    }
  }, [quill, onChange])

  return (
    <EditorContainer>
      <div ref={quillRef} />
    </EditorContainer>
  )
}
