import styled from "styled-components";

import { ScreenCard, SectionTabs } from "screens/AssemblyShared/styled";

export const LetterModelCard = styled(ScreenCard)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;

  > :first-child {
    min-width: 0;
    flex: 1;
  }

  @media (max-width: 760px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const LetterModelTabs = styled(SectionTabs)`
  flex: 0 0 auto;
  margin-bottom: 0;
`;
