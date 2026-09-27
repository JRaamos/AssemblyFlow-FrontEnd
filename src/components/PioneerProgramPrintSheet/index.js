import React from "react";

import {
  PioneerInfoTable,
  PioneerPrintPage,
  PioneerPrintShell,
  PioneerProgramTable,
} from "./styled";

export default function PioneerProgramPrintSheet({ program, event = {} }) {
  const finalTime = (program?.rows || []).at(-1)?.end || "";

  return (
    <PioneerPrintShell>
      <PioneerPrintPage>
        <div className="pioneer-document-meta">
          <strong>{program?.meta?.code}</strong>
          <span>{program?.meta?.date}</span>
        </div>
        <h1>{program?.meta?.title}</h1>
        <div className="pioneer-theme">
          <strong>TEMA:</strong> {program?.meta?.theme}
        </div>

        <PioneerProgramTable>
          <colgroup>
            <col className="col-time" />
            <col className="col-program" />
            <col className="col-duration" />
            <col className="col-speaker" />
            <col className="col-congregation" />
          </colgroup>
          <thead>
            <tr>
              <th>Hora</th>
              <th>PROGRAMA ESPIRITUAL</th>
              <th>Tempo</th>
              <th>Nome</th>
              <th>Congregação</th>
            </tr>
          </thead>
          <tbody>
            {(program?.rows || []).map((row) => (
              <tr key={row.id} className={row.type === "interval" ? "interval-row" : ""}>
                <td className="center-cell">{row.type === "interval" ? "" : row.time}</td>
                <td>{row.title}</td>
                <td className="center-cell">{row.durationMin || ""}</td>
                <td>{row.speaker}</td>
                <td>{row.congregation}</td>
              </tr>
            ))}
            <tr className="termination-row">
              <td className="center-cell">{finalTime}</td>
              <td>TÉRMINO</td>
              <td />
              <td />
              <td />
            </tr>
          </tbody>
        </PioneerProgramTable>

        <PioneerInfoTable>
          <tbody>
            <tr>
              <th>LOCAL</th>
              <td>{event.venue}</td>
            </tr>
            <tr>
              <th>ENSAIO DE CENAS / ENTREVISTAS</th>
              <td>
                {[event.rehearsalVenue, event.rehearsalAddress, event.rehearsalDateTime]
                  .filter(Boolean)
                  .join(" — ")}
              </td>
            </tr>
          </tbody>
        </PioneerInfoTable>
      </PioneerPrintPage>
    </PioneerPrintShell>
  );
}
