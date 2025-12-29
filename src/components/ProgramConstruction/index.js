import Button from 'components/Form/Button'
import React from 'react'
import { ButtonContainer, FormSpacer } from 'ui/styled'
import { EditableCell, ProgramTable, ProgramWrap } from './styled'

export default function ProgramConstruction({
  program,
  activeRow = null,
  attachRowRef = () => { },
  sanitize = (s) => String(s || '').replace(/<[^>]*>?/gm, '').trim(),
}) {
  return (
    <>

      <ProgramWrap>
        <ProgramTable id="program-table">
          <thead>
            <tr>
              <th style={{ width: 40 }}>⇅</th>
              <th style={{ width: 90 }}>Hora</th>
              <th>Discurso / Tema</th>
              <th style={{ width: 90 }}>Tempo (min)</th>
              <th style={{ width: 90 }}>Termina</th>
              <th style={{ width: 220 }}>Nome</th>
              <th style={{ width: 200 }}>Congregação</th>
              <th style={{ width: 100 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {program.rows.map((row, idx) => (
              <tr
                key={String(row.id)}
                ref={(el) => attachRowRef(el, idx)}
                className={activeRow === idx ? "active-row" : ""}
                style={
                  activeRow === idx
                    ? { background: "rgba(0,0,0,0.04)" }
                    : undefined
                }
              >
                <td>
                  <div
                    role="button"
                    aria-label={`Mover linha ${idx + 1}`}
                    tabIndex={0}
                    title="Clique e arraste para mover (ou use ↑/↓)"
                    onMouseDown={(e) => onHandleMouseDown(idx, e)}
                    onDragStart={(e) => e.preventDefault()}
                    style={{
                      cursor: "grab",
                      textAlign: "center",
                      userSelect: "none",
                    }}
                  >
                    ☰
                  </div>
                </td>
                <EditableCell>
                  <div>{row.time || ""}</div>
                </EditableCell>
                <EditableCell>
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      setCell(idx, "title", sanitize(e.currentTarget.textContent || ""))
                    }
                  >
                    {row.title || ""}
                  </div>
                </EditableCell>
                <EditableCell>
                  <input
                    type="number"
                    min={0}
                    value={row.durationMin ?? ""}
                    onChange={(e) => setCell(idx, "durationMin", e.target.value)}
                    style={{ width: "80px" }}
                    aria-label={`Tempo da parte ${idx + 1} em minutos`}
                  />
                </EditableCell>
                <EditableCell>
                  <div>{row.end || ""}</div>
                </EditableCell>
                <EditableCell>
                  <div
                    contentEditable={row.type !== "interval"}
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      setCell(
                        idx,
                        "speaker",
                        sanitize(e.currentTarget.textContent || "")
                      )
                    }
                  >
                    {row.speaker || ""}
                  </div>
                </EditableCell>
                <EditableCell>
                  <div
                    contentEditable={row.type !== "interval"}
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      setCell(
                        idx,
                        "congregation",
                        sanitize(e.currentTarget.textContent || "")
                      )
                    }
                  >
                    {row.congregation || ""}
                  </div>
                </EditableCell>
                <td>
                  <ButtonContainer center space>
                    <button
                      type="button"
                      onClick={() => addRow(idx)}
                      style={{ cursor: "pointer" }}
                      aria-label={`Adicionar parte após a linha ${idx + 1}`}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => removeRow(idx)}
                      disabled={program.rows.length <= 1}
                      style={{
                        cursor:
                          program.rows.length <= 1 ? "not-allowed" : "pointer",
                      }}
                      aria-label={`Remover linha ${idx + 1}`}
                    >
                      -
                    </button>
                  </ButtonContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </ProgramTable>
      </ProgramWrap>
    </>
  )
}
