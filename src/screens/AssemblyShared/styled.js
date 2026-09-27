import styled from "styled-components";

const systemFont = `Arial, Helvetica, sans-serif`;

export const ScreenTitle = styled.h1`
  margin: 0 0 8px;
  color: #172033;
  font-family: ${systemFont};
  font-size: 24px;
  font-weight: 750;
  letter-spacing: -0.025em;

  @media (max-width: 640px) {
    font-size: 20px;
    line-height: 1.25;
  }
`;

export const ScreenText = styled.div`
  color: #475569;
  font-family: ${systemFont};
  font-size: 14px;
  line-height: 1.55;
`;

export const ScreenCard = styled.section`
  min-width: 0;
  margin-bottom: 20px;
  padding: 18px 20px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 8px 28px rgba(15, 23, 42, 0.045);

  @media (max-width: 640px) {
    margin-bottom: 12px;
    padding: 14px;
    border-radius: 8px;
  }
`;

export const StickyActions = styled.div.attrs({
  'data-layout': 'sticky-actions',
})`
  position: sticky;
  z-index: 5;
  bottom: 0;
  margin: 20px -24px -24px;
  padding: 12px 24px;
  border-top: 1px solid #dbe2ea;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 -8px 28px rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(12px);

  > div {
    flex-wrap: wrap;
  }

  @media (max-width: 900px) {
    margin-right: -18px;
    margin-left: -18px;
    padding-right: 18px;
    padding-left: 18px;
  }

  @media (max-width: 640px) {
    margin: 14px -12px -12px;
    padding: 10px 12px calc(10px + env(safe-area-inset-bottom));

    > div {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }

    button {
      width: 100%;
      min-width: 0;
      min-height: 42px;
      padding-right: 10px;
      padding-left: 10px;
      font-size: 14px;
    }
  }

  @media print {
    display: none;
  }
`;

export const PreviewCard = styled(ScreenCard)`
  min-width: 0;
  overflow: auto;
  padding: 16px;
  background: #e9edf2;

  @media (max-width: 640px) {
    padding: 8px;
  }
`;

export const PreviewContent = styled.article`
  width: min(210mm, 100%);
  min-height: min(297mm, calc((100vw - 760px) * 1.414));
  margin: 0 auto;
  padding: clamp(24px, 5vw, 60px);
  border: 1px solid #d6dce4;
  background: #ffffff;
  box-shadow: 0 12px 36px rgba(15, 23, 42, 0.12);
  color: #172033;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12.5px;
  line-height: 1.46;

  h1,
  h2,
  h3 {
    margin: 0 0 10px;
    break-after: avoid;
  }

  h2 {
    margin-top: 18px;
    font-size: 13.5px;
    text-decoration: underline;
  }

  p {
    margin: 0 0 10px;
  }

  ol,
  ul {
    margin: 8px 0 12px;
    padding-left: 22px;
  }

  li {
    margin-bottom: 5px;
  }

  .document-letterhead {
    margin-bottom: 18px;
    font-size: 10px;
  }

  .document-date {
    text-align: right;
  }

  .document-facts {
    margin: 18px 0;
  }

  .document-facts > div {
    display: grid;
    grid-template-columns: minmax(120px, 1fr) minmax(0, 2fr);
    gap: 12px;
    margin-bottom: 4px;
  }

  .document-facts dt {
    color: #155eaa;
    font-weight: 700;
  }

  .document-facts dd {
    margin: 0;
  }

  .document-outline-note {
    text-align: center;
  }

  .document-rehearsal-details {
    margin: 10px 0;
    text-align: center;
    font-weight: 700;
  }

  .document-rehearsal-details p {
    margin-bottom: 2px;
  }

  .document-section {
    break-inside: auto;
  }

  .document-signature {
    width: 44%;
    margin: 26px 0 0 auto;
    text-align: center;
  }

  .pioneer-assignment {
    font-size: 11px;
    line-height: 1.32;
  }

  .pioneer-assignment p {
    margin-bottom: 7px;
  }

  .pioneer-assignment .document-facts {
    margin: 12px 0;
  }

  .pioneer-assignment .document-facts > div {
    grid-template-columns: 190px minmax(0, 1fr);
    margin-bottom: 2px;
  }

  .pioneer-assignment .document-facts dt {
    color: #172033;
  }

  .pioneer-assignment h2 {
    margin-top: 12px;
    font-size: 11.5px;
  }

  .ql-align-center { text-align: center; }
  .ql-align-right { text-align: right; }
  .ql-align-justify { text-align: justify; }
  .text-size-small { font-size: 0.85em; }
  .text-size-normal { font-size: 1em; }
  .text-size-large { font-size: 1.2em; }
  .text-size-huge { font-size: 1.5em; }
  .ql-size-small { font-size: 0.85em; }
  .ql-size-large { font-size: 1.2em; }
  .ql-size-huge { font-size: 1.5em; }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 9px;
  }

  @media (max-width: 640px) {
    min-height: 0;
    padding: 20px 16px;
    font-size: 12px;

    .document-facts > div,
    .pioneer-assignment .document-facts > div {
      grid-template-columns: 1fr;
      gap: 2px;
      margin-bottom: 8px;
    }

    .document-signature {
      width: 62%;
    }
  }

  th,
  td {
    padding: 4px 5px;
    border: 1px solid #cbd5e1;
    vertical-align: top;
  }

  th {
    background: #eef2f6;
    font-weight: 700;
  }

  @media print {
    width: auto;
    min-height: auto;
    margin: 0;
    padding: 0;
    border: 0;
    box-shadow: none;
  }
`;

export const TwoColumns = styled.div.attrs({
  'data-layout': 'two-columns',
})`
  display: grid;
  grid-template-columns: minmax(360px, 0.9fr) minmax(460px, 1.1fr);
  align-items: start;
  gap: 20px;

  > * {
    min-width: 0;
  }

  @media (max-width: 1120px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 640px) {
    gap: 12px;
  }
`;

export const SmallLabel = styled.div`
  margin-bottom: 9px;
  color: #64748b;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.045em;
  text-transform: uppercase;
`;

export const TableWrap = styled(ScreenCard)`
  width: 100%;
  max-width: 100%;
  overflow: auto;
  overscroll-behavior-inline: contain;
`;

export const SimpleTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
  font-size: 13px;

  td,
  th {
    padding: 8px;
    border-right: 1px solid #e2e8f0;
    border-bottom: 1px solid #e2e8f0;
    vertical-align: top;
  }

  td:first-child,
  th:first-child {
    border-left: 1px solid #e2e8f0;
  }

  thead tr:first-child th {
    border-top: 1px solid #e2e8f0;
  }

  th {
    background: #f3f6f9;
    color: #334155;
    font-weight: 700;
  }

  input,
  textarea {
    width: 100%;
    padding: 8px 9px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    background: #fff;
    color: #172033;
    font-size: 13px;
  }

  textarea {
    min-height: 80px;
    resize: vertical;
  }

  tbody tr.active {
    background: #eff6ff;
  }
`;

export const SectionTabs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  overflow-x: auto;
  overscroll-behavior-inline: contain;
`;

export const SectionTab = styled.button`
  padding: 9px 14px;
  border: 1px solid ${(props) => (props.active ? "#2563eb" : "#cbd5e1")};
  border-radius: 7px;
  background: ${(props) => (props.active ? "#eff6ff" : "#ffffff")};
  color: ${(props) => (props.active ? "#1d4ed8" : "#475569")};
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: border-color 140ms ease, background 140ms ease, color 140ms ease;

  &:hover {
    border-color: #2563eb;
  }
`;

export const BlockList = styled.div`
  display: grid;
  gap: 14px;
`;

export const BlockCard = styled(ScreenCard)`
  margin-bottom: 0;
`;

export const StatusText = styled.span`
  align-self: center;
  margin-right: auto;
  color: ${(props) => (props.error ? "#b91c1c" : "#047857")};
  font-size: 13px;
  font-weight: 650;

  @media (max-width: 640px) {
    grid-column: 1 / -1;
    margin: 0 0 2px;
    text-align: center;
  }
`;
