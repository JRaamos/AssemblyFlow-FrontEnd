import styled from 'styled-components'

import {
  Animation
} from 'ui/styled'

export const DashboardTitle = styled.div.attrs({
})`            
    font-size: 24px;
    font-weight: bold;
    font-family: Kumbh Sans;
    color: ${props => props.theme.palette.colors.black};
    margin-bottom: 12px;
    ${props => props.centred ? `
            text-align: center;
        ` : ``
  }
`;

export const DashboardText = styled.div.attrs({
})`            
    font-family: Kumbh Sans;
    font-size: 16px;
    line-height: 26px;
    color: ${props => props.theme.palette.colors.black};
    ${props => props.centred ? `
            text-align: center;
        ` : ``
  }
`;

export const DashboardAnimation = styled(Animation).attrs({
  width: '100%',
  height: 420
})`             
`;

export const DashboardContainer = styled.div.attrs({
})`            
    padding: 16px 24px;
    box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
    background: ${props => props.theme.palette.colors.white};
    border-radius: 8px;
    margin-bottom: 24px;
`;

export const DashboardContent = styled.div.attrs({
})`            
    padding: 8px 24px;
    box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
    background: ${props => props.theme.palette.colors.white};
    position: fixed;
    bottom: 0;
    right: 0;
    left: 225px;
`;

export const ProgramWrap = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: rgba(0,0,0,0.04) 0 3px 5px;
  overflow: hidden;
`;

export const ProgramHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px 16px;
  padding: 16px 16px 0 16px;
`;

export const Meta = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px 16px;
  padding: 0 16px 12px 16px;
`;

export const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  label { font-size: 12px; color: #6b7280; }
  input { border: 1px solid #e5e7eb; border-radius: 6px; padding: 8px 10px; font-size: 14px; }
`;

export const ProgramTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 14px;
  td, th { border: 1px solid #e5e7eb; padding: 8px; vertical-align: top; }
  th { background: #f3f4f6; font-weight: 600; }
  tbody tr:nth-child(even) { background: #fafafa; }
`;

export const SectionRow = styled.tr`
  td { background: #f3f4f6; font-weight: 700; letter-spacing: .02em; }
`;

export const EditableCell = styled.td`
  cursor: text;
  &:focus-within { outline: 2px solid #60a5fa; outline-offset: -2px; }
  div[contenteditable="true"] { min-height: 24px; }
`;

export const IntervalBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 12px;
  border-radius: 4px;

  font-weight: 700;
  text-transform: uppercase;
  color: #1f2937;

  .interval-right {
    letter-spacing: normal;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .interval-input {
    letter-spacing: normal;
    width: 70px;
    padding: 4px 6px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    font-weight: 600;
    text-transform: none;
  }
`;