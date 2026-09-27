import React from "react";

import {
  ProgramFooterTable,
  ProgramPrintPage,
  ProgramPrintShell,
  ProgramPrintTable,
} from "./styled";

const splitSessions = (rows = []) => {
  const intervalIndex = rows.findIndex((row) => row.type === "interval");
  if (intervalIndex < 0) return { morning: rows, afternoon: [] };

  return {
    morning: rows.slice(0, intervalIndex + 1),
    afternoon: rows.slice(intervalIndex + 1),
  };
};

const ProgramRow = ({ row }) => (
  <tr className={row.type === "interval" ? "interval-row" : ""}>
    <td className="time-cell">{row.type === "interval" ? "" : row.time}</td>
    <td className="program-cell">{row.title}</td>
    <td>{row.speaker}</td>
    <td className="center-cell">{row.congregation}</td>
    <td />
    <td className="center-cell">{row.confirmation ? "x" : ""}</td>
    <td className="center-cell">{row.durationMin || ""}</td>
    <td />
    <td />
    <td />
  </tr>
);

const SessionHeader = ({ title }) => (
  <tr className="session-header">
    <th>Hora</th>
    <th>{title}</th>
    <th />
    <th />
    <th />
    <th />
    <th />
    <th />
    <th />
    <th />
  </tr>
);

export default function ProgramPrintSheet({
  program,
  partLabel,
  variantLabel,
  footerVariantLabel,
  singleProgram = false,
  rehearsalDateTime,
  rehearsalVenue,
}) {
  const { morning, afternoon } = splitSessions(program?.rows || []);
  const finalTime = (program?.rows || []).at(-1)?.end || "";

  return (
    <ProgramPrintShell>
      <ProgramPrintPage>
        <ProgramPrintTable>
          <colgroup>
            <col className="col-time" />
            <col className="col-program" />
            <col className="col-speaker" />
            <col className="col-congregation" />
            <col className="col-scene" />
            <col className="col-confirm" />
            <col className="col-control" />
            <col className="col-control" />
            <col className="col-diff" />
            <col className="col-class" />
          </colgroup>
          <thead>
            <tr className="title-row">
              <th colSpan="10">PROGRAMA ESPIRITUAL DA ASSEMBLEIA DE CIRCUITO</th>
            </tr>
            <tr className="part-row">
              <th colSpan="6" className={singleProgram ? "single-program" : ""}>
                {partLabel ? <span>{partLabel}</span> : null}
                <em>{variantLabel}</em>
              </th>
              <th colSpan="3">CONTR. TEMPO</th>
              <th>Clas</th>
            </tr>
            <tr className="column-row">
              <th>Hora</th>
              <th>PROGRAMA DA MANHÃ</th>
              <th>DESIGNADO</th>
              <th>CONGREGAÇÃO</th>
              <th>Cena</th>
              <th>Conf</th>
              <th>PREV</th>
              <th>REAL</th>
              <th>DIF</th>
              <th>A...C</th>
            </tr>
          </thead>
          <tbody>
            {morning.map((row) => <ProgramRow key={row.id} row={row} />)}
            {afternoon.length ? <SessionHeader title="PROGRAMA DA TARDE" /> : null}
            {afternoon.map((row) => <ProgramRow key={row.id} row={row} />)}
            <tr className="termination-row">
              <td>{finalTime}</td>
              <td>TÉRMINO</td>
              <td />
              <td />
              <td />
              <td />
              <td className="center-cell">{program?.meta?.terminationControl || ""}</td>
              <td />
              <td />
              <td />
            </tr>
          </tbody>
        </ProgramPrintTable>

        <ProgramFooterTable>
          <thead>
            <tr>
              <th>ASSEMBLEIA DE CIRCUITO - {footerVariantLabel || variantLabel}</th>
              <th>DATA / HORA</th>
              <th>S. REINO - Endereço</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {singleProgram
                  ? "ENSAIO DO PROGRAMA DA ASSEMBLEIA"
                  : "ENSAIO DE TODAS AS PARTES DA ASSEMBLEIA"}
              </td>
              <td>{rehearsalDateTime}</td>
              <td>{rehearsalVenue}</td>
            </tr>
          </tbody>
        </ProgramFooterTable>
      </ProgramPrintPage>
    </ProgramPrintShell>
  );
}
