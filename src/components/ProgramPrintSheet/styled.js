import styled from "styled-components";

export const ProgramPrintShell = styled.div`
  overflow: auto;
  padding: 18px;
  border-radius: 8px;
  background: #e7e9ec;
`;

export const ProgramPrintPage = styled.div`
  width: 1120px;
  min-height: 792px;
  margin: 0 auto;
  padding: 12px;
  background: #ffffff;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.13);
  color: #0b0b0b;
  font-family: Arial, Helvetica, sans-serif;
`;

export const ProgramPrintTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 12px;

  .col-time { width: 4.8%; }
  .col-program { width: 40.8%; }
  .col-speaker { width: 18%; }
  .col-congregation { width: 13.2%; }
  .col-scene { width: 4.3%; }
  .col-confirm { width: 4.1%; }
  .col-control { width: 4.3%; }
  .col-diff { width: 3.1%; }
  .col-class { width: 3.1%; }

  th,
  td {
    height: 22px;
    padding: 2px 4px;
    border-right: 1px solid #111111;
    border-left: 1px solid #111111;
    border-bottom: 1px dotted #555555;
    vertical-align: middle;
    overflow-wrap: anywhere;
  }

  tr > :first-child { border-left-style: solid; }
  tr > :last-child { border-right-style: solid; }

  .title-row th {
    height: 34px;
    border: 1px solid #111111;
    background: #dedcc8;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
  }

  .part-row th {
    height: 31px;
    border: 1px solid #111111;
    background: #dedcc8;
    font-size: 13px;
    text-align: center;
  }

  .part-row th:first-child {
    position: relative;
    font-size: 20px;
    text-align: left;
  }

  .part-row em {
    position: absolute;
    left: 35%;
    text-decoration: underline;
  }

  .part-row th.single-program {
    text-align: center;
  }

  .part-row .single-program em {
    position: static;
  }

  .column-row th,
  .session-header th {
    height: 24px;
    border: 1px solid #111111;
    background: #dedcc8;
    font-weight: 700;
    text-align: center;
  }

  .column-row th:nth-child(2),
  .session-header th:nth-child(2) {
    text-align: left;
  }

  .session-header th:nth-child(n + 3) {
    background: #ffffff;
  }

  .time-cell,
  .center-cell {
    text-align: center;
  }

  .program-cell {
    font-size: 12px;
  }

  .interval-row td:nth-child(2),
  .termination-row td:nth-child(2) {
    font-weight: 700;
  }

  .termination-row td {
    border-bottom-style: solid;
  }
`;

export const ProgramFooterTable = styled.table`
  width: 100%;
  margin-top: 54px;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 12px;

  th,
  td {
    padding: 6px 5px;
    border: 1px solid #111111;
    vertical-align: middle;
  }

  th {
    background: #dedcc8;
    font-size: 13px;
    text-align: left;
  }

  th:nth-child(1), td:nth-child(1) { width: 45%; }
  th:nth-child(2), td:nth-child(2) { width: 18%; text-align: center; }
  th:nth-child(3), td:nth-child(3) { width: 37%; }

  td {
    height: 42px;
  }
`;
