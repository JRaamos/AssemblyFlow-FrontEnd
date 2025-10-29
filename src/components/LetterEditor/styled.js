import styled from "styled-components";

export const EditorContainer = styled.div.attrs({
})`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  max-width: 740px;
  height: 136px;
  min-width: 500px;
  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

export const PreviewContainer = styled.div.attrs({
})`
`;