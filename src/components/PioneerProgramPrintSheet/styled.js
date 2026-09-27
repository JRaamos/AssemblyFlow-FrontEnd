import styled from "styled-components";

export const PioneerPrintShell = styled.div`
  overflow: auto;
  padding: 18px;
  border-radius: 8px;
  background: #e7e9ec;

  @media (max-width: 640px) {
    padding: 8px;
  }
`;

export const PioneerPrintPage = styled.div`
  width: 794px;
  min-height: 1123px;
  margin: 0 auto;
  padding: 32px;
  background: #ffffff;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.13);
  color: #0b0b0b;
  font-family: Arial, Helvetica, sans-serif;

  .pioneer-document-meta {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding: 6px 8px;
    border: 1px solid #111111;
    border-bottom: 0;
    font-size: 12px;
  }

  h1 {
    margin: 0;
    padding: 10px 8px;
    border: 1px solid #111111;
    background: #dedcc8;
    font-size: 18px;
    line-height: 1.2;
    text-align: center;
  }

  .pioneer-theme {
    padding: 8px;
    border: 1px solid #111111;
    border-top: 0;
    font-size: 13px;
    text-align: center;
  }
`;

export const PioneerProgramTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 12px;

  .col-time { width: 11%; }
  .col-program { width: 44%; }
  .col-duration { width: 9%; }
  .col-speaker { width: 20%; }
  .col-congregation { width: 16%; }

  th,
  td {
    min-height: 26px;
    padding: 5px 6px;
    border: 1px solid #111111;
    vertical-align: middle;
    overflow-wrap: anywhere;
  }

  th {
    background: #dedcc8;
    font-size: 11px;
    text-align: center;
  }

  .center-cell {
    text-align: center;
  }

  .interval-row td:nth-child(2),
  .termination-row td:nth-child(2) {
    font-weight: 700;
  }
`;

export const PioneerInfoTable = styled.table`
  width: 100%;
  margin-top: 42px;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 12px;

  th,
  td {
    padding: 8px;
    border: 1px solid #111111;
    vertical-align: top;
  }

  th {
    width: 34%;
    background: #dedcc8;
    text-align: left;
  }
`;
